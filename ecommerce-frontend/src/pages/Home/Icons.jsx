import React from 'react'
import shipping from '../Home/assets/express-delivery.png'
import customerservice from '../Home/assets/customer-service.png'
import giftcard from '../Home/assets/gift-card.png'
import money from '../Home/assets/money.png'
import './Icons.css'

const Icons = () => {
  return (
    <div>
      <div className="all">
        <div className="icon">
        <img src={shipping} alt="" />
        <span>FAST SHIPPING</span>
        </div>

        <div className="icon"><img src={giftcard} alt="" />
        <span>FREQUENT SALES</span>
        </div>

      <div className="icon">
      <img src={money} alt="" />
        <span>QUICK PAYMENT</span>
      </div>

       <div className="icon">
       <img src={customerservice} alt="" />
        <span>24/7 SUPPORT</span>
       </div>
      </div>
    </div>
  )
}

export default Icons
