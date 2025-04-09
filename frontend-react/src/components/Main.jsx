import React from 'react'
import Button from './Button'
import Footer from './Footer'
import Header from './Header'
import { Link } from 'react-router-dom'

const main = () => {
  return (
    <>
      <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded-3'>
            <h1 className='text-light'>Stock Prediction Portal</h1>
            <p className='text-light lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto perferendis, alias nam, adipisci unde minima architecto ut asperiores optio est consequatur cupiditate distinctio eligendi dolore eum corrupti consectetur tempore totam!</p>
            < Button text="Login" class='btn-outline-light' url = "/login" />
        </div>
      </div>
    </>
  )
}

export default main
