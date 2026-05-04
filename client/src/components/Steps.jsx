import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from "framer-motion"

const Steps = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col justify-center items-center my-24'>

            <h1 className='text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent'>How it Works</h1>
            <p className='text-base text-gray-600 mb-10'>Transform Words Into Stunning Images</p>

            <div className='space-y-4 w-full max-w-3xl text-sm'>
                {stepsData.map((item, index) => (
                    <div key={index}
                        className='flex items-center gap-4 p-5 px-8 bg-gradient-to-r from-orange-50/50 to-teal-50/50 shadow-sm border border-orange-100 cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all duration-300 rounded-xl'>
                        <img width={40} src={item.icon} alt="" />
                        <div>
                            <h2 className='text-lg font-semibold text-gray-800'>{item.title}</h2>
                            <p className='text-gray-600 text-sm'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Steps
