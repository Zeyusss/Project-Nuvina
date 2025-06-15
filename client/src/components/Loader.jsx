import React from 'react';
import { Typography } from '@mui/material';
import { data } from '../assets/data';
import '../LoaderStyles.css';

const Loader = () => {
  return (
    <div
      className="flex justify-center items-center h-screen flex-col gap-6"
      style={{
        backgroundImage: `url(${data.gradientBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative">
        <img
          src={data.logo}
          alt="Nuvina Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-float transition-transform hover:scale-110 hover:shadow-glow"
        />
        <div className="absolute inset-0 rounded-full animate-wave bg-purple-500/20"></div>
      </div>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
          fontWeight: 700,
          color: '#1F2D5A',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          animation: 'fadeIn 1s ease-in, pulse 2s ease-in-out infinite',
        }}
      >
        Nuvina
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
          fontWeight: 400,
          color: '#1F2D5A',
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: 1.5,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          animation: 'fadeInSlide 1.5s ease-out 0.2s forwards',
        }}
      >
        Crafting vibrant stories for you...
      </Typography>
    </div>
  );
};

export default Loader;