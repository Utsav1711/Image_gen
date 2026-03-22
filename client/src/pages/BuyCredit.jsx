import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const BuyCredit = () => {

  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)

  const initPay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Credits Payments",
      description: "Credits Payments",
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/payment/verify",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          if (data.success) {
            toast.success(data.message || "Payment successful")
            loadCreditsData()
          } else {
            toast.error(data.message || "Payment verification failed")
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message)
        }
      },
      modal: {
        ondismiss: () => toast.info("Payment popup closed"),
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!token) {
        setShowLogin(true)
        return
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/payment/razorpay",
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // if this is true than payment is initiated and we will get the order details from backend
      if (data.success) {
        initPay(data.order) // order details from backend
      } else {
        toast.error(data.message || "Unable to create payment order")
      }

    } catch (error) {
      toast.error(error.response?.data?.message || ("Payment failed: " + error.message));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 150 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>
        Choose the plan
      </h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6 '>
              <span className='text-3xl font-medium'>${item.price} </span> / {item.credits} credits
            </p>

            <button onClick={() => paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-full py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Starred'}</button>
          </div>
        ))}
      </div>

    </motion.div>


  )
}

export default BuyCredit



