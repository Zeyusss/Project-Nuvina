import React from 'react'
import { data } from '../assets/data'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const { navigate, token, user } = useAppContext()

    return (
        <div className='flex justify-between items-center py-5 px-4 sm:px-12 xl:px-32 bg-white'>
            <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 sm:gap-4">
                <img
                    src={data.logo}
                    alt="logo"
                    className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-wide">Nuvina</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                {user && (
                    <span className="text-gray-600 text-sm sm:text-base hidden sm:inline-block">
                        Hey, {user.email.split('@')[0]}
                    </span>
                )}
                <Button onClick={() => navigate(token ? '/admin' : '/admin/login')} variant="contained" sx={{
                    gap: '0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '0.525rem 1.5rem sm:0.525rem 2.5rem',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'var(--btn-hover)',
                    },
                }}
                >{token ? 'Dashboard' : 'Login'}
                    <img src={data.arrow} alt="arrow" className='w-3' />
                </Button>
            </div>
        </div>
    )
}

export default Navbar
