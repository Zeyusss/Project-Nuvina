import React from 'react'
import { data } from '../../assets/data'
import { Outlet, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    const { user, logout, navigate } = useAppContext();
    if (!user) {
        return <Navigate to="/admin/login" />;
    }

    return (
        <>
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white'>
                <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 sm:gap-4">
                    <img
                        src={data.logo}
                        alt="logo"
                        className="w-10 h-10 sm:w-14 sm:h-14"
                    />
                    <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-wide">Nuvina</h1>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-gray-600 text-sm sm:text-base hidden sm:inline-block">
                        Hey, {user.email.split('@')[0]}
                    </span>
                    <Button onClick={logout} variant="contained" sx={{
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
                    >Logout
                        <img src={data.arrow} alt="arrow" className='w-3' />
                    </Button>
                </div>
            </div>
            <div className='flex h-[calc(100vh-70px)]'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout
