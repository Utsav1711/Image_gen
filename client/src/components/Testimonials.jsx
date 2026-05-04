import React from 'react'
import { testimonialsData } from '../assets/assets'
import { assets } from '../assets/assets'
import { motion } from "framer-motion" 

const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-20 p-12'>

            <h1 className='text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent'>
                Customer Testimonials
            </h1>
            <p className='text-gray-500 mb-12 text-base'>
                What Our Users Are Saying
            </p>

            <div className='flex flex-wrap gap-6 justify-center'>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index}
                        className='bg-gradient-to-br from-orange-50/50 to-teal-50/50 p-8 rounded-xl shadow-sm border border-orange-100 w-80 cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all duration-300'>
                        <div className='flex flex-col items-center'>
                            <img
                                src={testimonial.image}
                                alt=""
                                className='rounded-full w-14 border-2 border-orange-200'
                            />
                            <h2 className='text-lg font-semibold mt-3 text-gray-800'>{testimonial.name}</h2>
                            <p className='text-gray-500 mb-3 text-sm'>{testimonial.role}</p>

                            <div className='flex mb-3'>
                                {Array(testimonial.stars).fill().map((item, index) => (
                                    <img
                                        key={index}
                                        src={assets.rating_star}
                                        alt=""
                                        className='w-4'
                                    />
                                ))}
                            </div>

                            <p className='text-center text-sm text-gray-600 leading-relaxed'>{testimonial.text}</p>
                        </div>
                    </div>

                ))}

            </div>
        </motion.div>
    )
}

export default Testimonials
