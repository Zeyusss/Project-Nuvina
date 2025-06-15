import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const { axios, setToken, setUser, navigate } = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true)
        
        try {
            const response = await axios.post('/api/user/login', values);
            
            if (response.data.state) {
                setToken(response.data.token)
                setUser(response.data.user)
                localStorage.setItem('token', response.data.token)
                axios.defaults.headers.common['Authorization'] = response.data.token;
                navigate('/admin');
            } else {
                toast.error(response.data.message || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Login failed');
            } else if (error.request) {
                toast.error('No response from server. Please try again.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false)
            setSubmitting(false)
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'><span className='text-primary'>Login</span> Page</h1>
                        <p className='font-light'>Enter Your Credentials to access the blog panel.</p>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className='mt-6 w-full sm:max-w-md text-gray-600'>
                                <div className='flex flex-col'>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder='Enter Your Email'
                                        className='border-b-2 border-gray-300 p-2 outline-none mb-1'
                                        disabled={isLoading}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-4" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder='Enter Your Password'
                                        className='border-b-2 border-gray-300 p-2 outline-none mb-1'
                                        disabled={isLoading}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-4" />
                                </div>
                                <button 
                                    type='submit' 
                                    className={`w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isLoading || isSubmitting}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p className='mt-4 text-gray-600'>
                        Wanna create an account?{' '}
                        <Link to="/admin/register" className='text-primary hover:underline'>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
