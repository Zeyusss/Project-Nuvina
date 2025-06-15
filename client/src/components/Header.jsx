import React, { useRef } from 'react'
import { data } from '../assets/data'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const {setInput, input} = useAppContext();
  const inputRef = useRef()

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  }

  const handleTopicClick = (topic) => {
    setInput(topic);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className='relative min-h-[80vh] bg-gradient-to-br from-white via-blue-50 to-purple-50'>
      <div className='absolute inset-0 bg-[url("/src/assets/gradientBackground.png")] bg-cover bg-center opacity-20 mix-blend-multiply -z-10'></div>
      
      <div className='mx-8 sm:mx-16 xl:mx-24 relative z-10'>
        <div className='text-center pt-20 pb-8'>
          <div className='mb-6'>
            <h1 className='text-primary text-3xl font-bold tracking-tight'>Nuvina</h1>
          </div>

          <h1 className='text-4xl sm:text-6xl font-bold sm:leading-tight text-gray-800 mb-6'>
            Where Innovation Meets <br /> 
            <span className='text-primary relative'>
              Inspiration
              <span className='absolute -bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full'></span>
            </span>
          </h1>


          <p className='my-6 sm:my-8 max-w-2xl mx-auto text-gray-600 leading-relaxed'>
            This is your space to think out loud, to share what matters, and to write without filters. 
            Whether it's one word or a thousand, your story starts right here.
          </p>


          <div className='flex justify-center gap-8 my-8 text-gray-600'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-primary'>100+</p>
              <p className='text-sm'>Active Writers</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-primary'>500+</p>
              <p className='text-sm'>Published Stories</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-primary'>10k+</p>
              <p className='text-sm'>Monthly Readers</p>
            </div>
          </div>


          <div className='flex flex-wrap justify-center gap-3 my-6'>
            <span 
              onClick={() => handleTopicClick('Anime')}
              className='px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors'
            >
              Anime
            </span>
            <span 
              onClick={() => handleTopicClick('Business')}
              className='px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors'
            >
              Business
            </span>
            <span 
              onClick={() => handleTopicClick('Lifestyle')}
              className='px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors'
            >
              Lifestyle
            </span>
            <span 
              onClick={() => handleTopicClick('Health')}
              className='px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-600 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors'
            >
              Health
            </span>
          </div>


          <form className='flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative z-20'>
            <input 
              ref={inputRef} 
              onChange={onChangeHandler} 
              value={input} 
              type="text" 
              placeholder='Search for Blogs' 
              required 
              className='w-full pl-4 outline-none px-8 py-3 m-1.5 rounded-2xl focus:ring-2 focus:ring-primary/20' 
            />
          </form>


          <p className='text-sm text-gray-500 mt-4'>
            Popular searches: 
            <span 
              onClick={() => handleTopicClick('AI')}
              className='text-primary cursor-pointer hover:underline ml-2'
            >
              AI
            </span>, 
            <span 
              onClick={() => handleTopicClick('Startup')}
              className='text-primary cursor-pointer hover:underline ml-2'
            >
              Startup
            </span>, 
            <span 
              onClick={() => handleTopicClick('Innovation')}
              className='text-primary cursor-pointer hover:underline ml-2'
            >
              Innovation
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
