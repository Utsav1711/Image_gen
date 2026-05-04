import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if(state === 'Login'){
                const {data} = await axios.post(backendUrl+'/api/user/login',{
                    email,password 
                })

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem("token",data.token)    
                    setShowLogin(false)
                    toast.success("Welcome back!")
                }else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendUrl+'/api/user/register',{
                    name,email,password 
                })

                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem("token",data.token)    
                    setShowLogin(false)
                    toast.success("Account created successfully!")
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='relative bg-white p-7 rounded-2xl shadow-xl w-full max-w-md border border-orange-100'
            >
                {/* Close Button */}
                <button
                    type='button'
                    onClick={() => setShowLogin(false)}
                    className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
                >
                    <img src={assets.cross_icon} alt="Close" className='w-3.5 h-3.5' />
                </button>

                {/* Header */}
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent mb-1'>
                        {state === 'Login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className='text-sm text-gray-500'>
                        {state === 'Login' 
                            ? "Sign in to continue creating" 
                            : "Join us and start generating images"}
                    </p>
                </div>

                {/* Name Input (Sign Up only) */}
                {state !== 'Login' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className='mb-3'
                    >
                        <div className='flex items-center gap-3 px-4 py-2.5 border-2 border-orange-200 rounded-lg focus-within:border-orange-400 transition-colors bg-orange-50/30'>
                            <img src={assets.profile_icon} alt="" className="w-4 h-4 opacity-60" />
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                type="text"
                                className='outline-none text-sm flex-1 bg-transparent'
                                placeholder='Full Name'
                                required
                            />
                        </div>
                    </motion.div>
                )}

                {/* Email Input */}
                <div className='mb-3'>
                    <div className='flex items-center gap-3 px-4 py-2.5 border-2 border-orange-200 rounded-lg focus-within:border-orange-400 transition-colors bg-orange-50/30'>
                        <img src={assets.email_icon} alt="" className="w-4 h-4 opacity-60" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className='outline-none text-sm flex-1 bg-transparent'
                            placeholder='Email Address'
                            required
                        />
                    </div>
                </div>

                {/* Password Input with Toggle */}
                <div className='mb-3'>
                    <div className='flex items-center gap-3 px-4 py-2.5 border-2 border-orange-200 rounded-lg focus-within:border-orange-400 transition-colors bg-orange-50/30'>
                        <img src={assets.lock_icon} alt="" className="w-4 h-4 opacity-60" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type={showPassword ? "text" : "password"}
                            className='outline-none text-sm flex-1 bg-transparent'
                            placeholder='Password'
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='focus:outline-none hover:opacity-70 transition-opacity'
                        >
                            {showPassword ? (
                                // Eye Slash Icon (Hide)
                                <svg className='w-4 h-4 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                                </svg>
                            ) : (
                                // Eye Icon (Show)
                                <svg className='w-4 h-4 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                {state === 'Login' && (
                    <div className='text-right mb-4'>
                        <button type='button' className='text-xs text-orange-500 hover:text-orange-600 font-medium'>
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type='submit'
                    className='w-full bg-gradient-to-r from-orange-400 to-teal-400 text-white py-2.5 rounded-lg font-semibold hover:shadow-md hover:scale-[1.02] transition-all duration-300 mt-2 text-sm'
                >
                    {state === 'Login' ? 'Sign In' : "Create Account"}
                </button>

                {/* Toggle State */}
                <div className='mt-5 text-center'>
                    {state === 'Login' ? (
                        <p className='text-sm text-gray-600'>
                            Don't have an account?{" "}
                            <button 
                                type='button'
                                className='text-orange-500 font-semibold hover:text-orange-600' 
                                onClick={() => setState("Sign Up")}
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p className='text-sm text-gray-600'>
                            Already have an account?{" "}
                            <button 
                                type='button'
                                className='text-orange-500 font-semibold hover:text-orange-600' 
                                onClick={() => setState("Login")}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </motion.form>
        </div>
    )
}

export default Login
