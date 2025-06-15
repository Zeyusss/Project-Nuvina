import React, { useEffect, useState } from 'react'
import { dashboard_data, data } from '../../assets/data'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { 
    Article as ArticleIcon,
    Comment as CommentIcon,
    Drafts as DraftsIcon,
    History as HistoryIcon
} from '@mui/icons-material'

const Dashboard = () => {
    const { axios } = useAppContext();
    const [dashboardData, setDashboardData] = useState({
        totalBlogs: 0,
        totalComments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            if (data.state) {
                setDashboardData(data.dashboard)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
            <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <div className='p-2 bg-blue-100 rounded-full'>
                        <ArticleIcon className='text-primary text-2xl' />
                    </div>
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalBlogs}</p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <div className='p-2 bg-green-100 rounded-full'>
                        <CommentIcon className='text-green-600 text-2xl' />
                    </div>
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalComments}</p>
                        <p className='text-gray-400 font-light'>Comments</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <div className='p-2 bg-yellow-100 rounded-full'>
                        <DraftsIcon className='text-yellow-600 text-2xl' />
                    </div>
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                        <p className='text-gray-400 font-light'>Drafts</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                    <div className='p-2 bg-gray-100 rounded-full'>
                        <HistoryIcon className='text-gray-600 text-xl' />
                    </div>
                    <p>Latest Blogs</p>
                </div>
                <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left uppercase'>
                            <tr>
                                <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                                <th scope='col' className='px-2 py-4'> Blog Title </th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'> Date </th>
                                <th scope='col' className='px-2 py-4 max-sm:hidden'> Status </th>
                                <th scope='col' className='px-2 py-4'> Comments </th>
                                <th scope='col' className='px-2 py-4'> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs?.map((blog, index) => {
                                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
