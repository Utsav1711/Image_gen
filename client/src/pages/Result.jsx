// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { motion } from "framer-motion"
// import { useContext } from 'react'
// import { AppContext } from '../context/AppContext'
// import { useNavigatete } from 'react-router-dom'

// const Result = () => {

//   const navigate = useNavigatete()
//   const [image, setImage] = useState(assets.sample_img_1)
//   const [isImageLoaded, setIsImageLoaded] = useState(false)
//   const [Loading, setLoading] = useState(false)
//   const [input, setInput] = useState('')

//   const { generateImage } = useContext(AppContext)

//   // const onSubmitHandeler = async (e) => {
//   //   e.preventDefault()

//   //   if(input){
//   //     const image = await generateImage(input)
//   //     if(image){
//   //       setIsImageLoaded(true)
//   //       setImage(image) 
//   //     }
//   //   }
//   //   setLoading(false)
//   // } 

//   const onSubmitHandeler = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       if (input) {
//         const result = await generateImage(input)

//         if (result?.image) {
//           setIsImageLoaded(true)
//           setImage(result.image)
//         } else if (result?.creditBalance === 0) {
//           navigate('/buy')   // ✅ here you can safely use useNavigate
//         }
//       }
//     } finally {
//       setLoading(false)
//     }
//   }



//   return (
//     <motion.form
//       initial={{ opacity: 0.2, y: 150 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       onSubmit={onSubmitHandeler} className='flex flex-col justify-center items-center min-h-[90vh]'>
//       <div>
//         <div className='relative'>
//           <img
//             src={image}
//             alt=""
//             className='max-w-sm rounded'
//           />

//           <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${Loading ? 'w-full transition-all duration-[10s]' : 'w-0'} `} />
//         </div>

//         <p className={!Loading ? "hidden" : ""}>Loading.....</p>
//       </div>

//       {!isImageLoaded &&
//         <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
//           <input
//             onChange={e => setInput(e.target.value)} value={input}
//             type="text"
//             placeholder='Describe what you want to generate'
//             className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
//           />
//           <button
//             type='submit'
//             className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
//           >
//             Generate
//           </button>
//         </div>
//       }

//       {isImageLoaded &&
//         <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
//           <p onClick={() => { setIsImageLoaded(false) }}
//             className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
//             Generate Another
//           </p>
//           <a
//             href={image}
//             download
//             className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
//           >
//             Download
//           </a>
//         </div>
//       }

//     </motion.form>
//   )
// }

// export default Result

import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')

  const { generateImage } = useContext(AppContext)

  const aspectRatios = [
    { label: 'Square', value: '1:1', width: 'w-[450px]', height: 'h-[450px]' },
    { label: 'Portrait', value: '3:4', width: 'w-[450px]', height: 'h-[600px]' },
    { label: 'Landscape', value: '16:9', width: 'w-[600px]', height: 'h-[338px]' },
    { label: 'Wide', value: '21:9', width: 'w-[600px]', height: 'h-[257px]' },
  ]

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (input) {
        const promptWithRatio = `${input} (aspect ratio: ${aspectRatio})`
        const result = await generateImage(promptWithRatio)

        if (result?.image) {
          setIsImageLoaded(true)
          setImage(result.image)
        } else if (result?.creditBalance === 0) {
          navigate('/buy')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const getImageDimensions = () => {
    const ratio = aspectRatios.find(r => r.value === aspectRatio)
    return ratio ? `${ratio.width} ${ratio.height}` : 'w-[450px] h-[450px]'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col justify-center items-center min-h-[85vh] py-8'
    >
      {/* Image Display Area - Fixed Size */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='relative mb-6'
      >
        <div className={`relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-orange-50 to-teal-50 border-2 border-orange-200/50 ${getImageDimensions()} max-w-[90vw] max-h-[60vh]`}>
          <img
            src={image}
            alt="Generated"
            className='w-full h-full object-cover'
          />
          
          {loading && (
            <div className='absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm'>
              <div className='w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-3'></div>
              <p className='text-white font-medium text-sm'>Creating your image...</p>
            </div>
          )}

          {loading && (
            <div className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 via-teal-400 to-orange-400 w-full animate-pulse'></div>
          )}
        </div>
      </motion.div>

      {/* Aspect Ratio Selector */}
      {!isImageLoaded && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mb-5'
        >
          <p className='text-center text-sm text-gray-600 mb-3 font-medium'>Select Image Ratio</p>
          <div className='flex gap-2 flex-wrap justify-center'>
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                type='button'
                onClick={() => setAspectRatio(ratio.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  aspectRatio === ratio.value
                    ? 'bg-gradient-to-r from-orange-400 to-teal-400 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border-2 border-orange-200 hover:border-orange-400 hover:scale-105'
                }`}
              >
                {ratio.label}
                <span className='ml-1.5 text-xs opacity-75'>({ratio.value})</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Form */}
      {!isImageLoaded && (
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='w-full max-w-3xl px-4'
        >
          <div className='flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-xl shadow-md border-2 border-orange-200/50'>
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Describe what you want to create...'
              className='flex-1 bg-transparent outline-none px-5 py-3 text-gray-700 placeholder-gray-400 text-sm'
              required
            />
            <button
              type='submit'
              disabled={loading}
              className='bg-gradient-to-r from-orange-400 to-teal-400 text-white px-7 py-3 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm'
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </motion.form>
      )}

      {/* Action Buttons After Generation */}
      {isImageLoaded && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='flex gap-3 flex-wrap justify-center'
        >
          <button
            onClick={() => {
              setIsImageLoaded(false)
              setInput('')
            }}
            className='bg-white border-2 border-orange-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-orange-400 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
            </svg>
            Generate Another
          </button>
          <a
            href={image}
            download='imagify-creation.png'
            className='bg-gradient-to-r from-orange-400 to-teal-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
            </svg>
            Download
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Result

