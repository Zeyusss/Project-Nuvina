import React from 'react'
import { NavLink } from 'react-router-dom'
import { data } from '../../assets/data'
import { useAppContext } from '../../context/AppContext'

const Sidebar = () => {
  const { user } = useAppContext();

  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>

      <NavLink end={true} to="/admin" className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }> 
        <img src={data.home_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      <NavLink  to="/admin/addBlog" className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }> 
        <img src={data.add_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>

      <NavLink  to="/admin/listBlog" className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }> 
        <img src={data.list_icon} alt="" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Blog List</p>
      </NavLink>

      {user?.role === 'admin' && (
        <NavLink  to="/admin/comments" className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }> 
          <img src={data.comment_icon} alt="" className='min-w-4 w-5' />
          <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
      )}

    </div>
  )
}

export default Sidebar
