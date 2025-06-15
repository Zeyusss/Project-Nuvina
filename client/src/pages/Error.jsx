import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { data } from '../assets/data'

const Error = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className='text-center p-8'>
                <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Oops! Page not found</h2>
                <p className='text-gray-600 mb-8'>The page you're looking for doesn't exist or has been moved.</p>
                <Button 
                    onClick={() => navigate('/')} 
                    variant="contained" 
                    sx={{
                        gap: '0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '0.525rem 2.5rem',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'var(--btn-hover)',
                        },
                    }}
                >
                    Back to Home
                    <img src={data.arrow} alt="arrow" className='w-3' />
                </Button>
            </div>
        </div>
    )
}

export default Error 