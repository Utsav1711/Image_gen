import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"

const Description = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-20 p-6 md:px-28'
        >
            <h1 className='text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent'>
                Create AI Images
            </h1>
            <p className='text-gray-500 mb-10 text-base'>
                Turn your imagination into visuals with custom aspect ratios
            </p>

            <div className='flex flex-col gap-6 md:gap-12 md:flex-row items-center'>
                <motion.img
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    src={assets.sample_img_1}
                    alt="AI Generated Sample"
                    className='w-72 xl:w-80 rounded-xl shadow-lg border-2 border-orange-100'
                />

                <div className='max-w-xl'>
                    <h2 className='text-2xl font-bold mb-5 text-gray-800'>
                        AI-Powered Image Generation with Flexible Ratios
                    </h2>

                    <div className='space-y-3'>
                        <div className='flex items-start gap-2.5'>
                            <div className='w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-orange-500 font-bold text-sm'>✓</span>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                <strong className='text-gray-800'>Multiple Aspect Ratios:</strong> Choose from Square (1:1), Portrait (3:4), Landscape (16:9), or Wide (21:9) formats
                            </p>
                        </div>

                        <div className='flex items-start gap-2.5'>
                            <div className='w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-teal-500 font-bold text-sm'>✓</span>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                <strong className='text-gray-800'>Instant Generation:</strong> Transform your text prompts into stunning visuals in seconds with advanced AI
                            </p>
                        </div>

                        <div className='flex items-start gap-2.5'>
                            <div className='w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <span className='text-orange-500 font-bold text-sm'>✓</span>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                <strong className='text-gray-800'>Unlimited Creativity:</strong> From product visuals to character designs, portraits, and abstract concepts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Description
