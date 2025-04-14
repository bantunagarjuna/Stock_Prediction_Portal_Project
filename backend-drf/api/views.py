from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score

# Create your views here.

class StockPredictionView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({"error": "Invalid ticker symbol"}, status=status.HTTP_400_BAD_REQUEST)
            print(df)
            df = df.reset_index()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label="Closing Price")
            plt.title(f"{ticker} Closing Price")
            plt.xlabel("Days")
            plt.ylabel("Closing Price")
            plt.legend()
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)

            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, 'r', label="MA100")
            plt.title(f"{ticker} Closing Price")
            plt.xlabel("Days")
            plt.ylabel("Closing Price")
            plt.legend()
            plot_img_path = f'{ticker}_100_dma.png'
            plot_img_100dma = save_plot(plot_img_path)

            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, 'r', label="MA100")
            plt.plot(ma200, 'g', label="MA200")
            plt.title(f"{ticker} Closing Price")
            plt.xlabel("Days")
            plt.ylabel("Closing Price")
            plt.legend()
            plot_img_path = f'{ticker}_200_dma.png'
            plot_img_200dma = save_plot(plot_img_path)

            data_tranning = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])

            scaler = MinMaxScaler(feature_range=(0, 1))

            model = load_model('stock_prediction_model.keras')
            past_100_days = data_tranning.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)


            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            
            x_test, y_test = np.array(x_test), np.array(y_test)

            y_predict = model.predict(x_test)

            y_predict = scaler.inverse_transform(y_predict.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(y_test, 'b', label="Original Price")
            plt.plot(y_predict, 'r', label="Predicted Price")
            plt.title(f"Final Prediction for {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Closing Price")
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = save_plot(plot_img_path)


            mse = mean_squared_error(y_test, y_predict)

            rmse = np.sqrt(mse)

            r2 = r2_score(y_test, y_predict)


            return Response({
                'status': 'success',
                'plot_img': plot_img,
                'plot_img_100dma': plot_img_100dma,
                'plot_img_200dma': plot_img_200dma,
                'plot_prediction': plot_prediction,
                'mse': mse,
                'rmse': rmse,
                'r2': r2,
            })