import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='pb-16 text-center'
        >
            <div className='bg-gradient-to-r from-orange-50 via-teal-50 to-orange-50 rounded-2xl p-10 mx-4 md:mx-20 shadow-md border border-orange-100'>
                <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent mb-3'>
                    Ready to Create Magic?
                </h1>
                <p className='text-gray-600 mb-7 text-base max-w-2xl mx-auto'>
                    Join thousands of creators using AI to bring their imagination to life. Start generating stunning images today!
                </p>

                <motion.button
                    onClick={onClickHandler}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-400 to-teal-400 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300'
                >
                    <span>Start Creating Now</span>
                    <img
                        src={assets.star_group}
                        alt="Stars"
                        className='h-5'
                    />
                </motion.button>
            </div>
        </motion.div>
    )
}

export default GenerateBtn
