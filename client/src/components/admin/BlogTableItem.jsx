import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Edit as EditIcon, 
    Delete as DeleteIcon,
    Publish as PublishIcon,
    Unpublished as UnpublishedIcon,
    Comment as CommentIcon
} from '@mui/icons-material'
import { data } from '../../assets/data';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';

const BlogTableItem = ({blog, fetchBlogs, index}) => {
    const {title, createdAt, commentCount} = blog;
    const BlogDate = new Date(createdAt)
    const {axios, user} = useAppContext();
    const navigate = useNavigate();

    const deletBlog = async ()=>{
        const confirm = window.confirm('Are you sure you want to delete this blog?')
        if(!confirm) return;
        try {
            const {data} = await axios.post('/api/blog/delete',{id:blog._id})
            if(data.state){
                toast.success(data.message)
                await fetchBlogs()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const togglePublish = async ()=>{
        try {
            const {data} = await axios.post('/api/blog/toggle-publish',{id:blog._id})
            if(data.state){
                toast.success(data.message)
                await fetchBlogs()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEdit = () => {
        navigate(`/admin/addBlog?edit=${blog._id}`);
    }

    return (
        <tr className='border-b border-gray-200 hover:bg-gray-50'>
            <td className='px-2 py-4 xl:px-6'>{index}</td>
            <td className='px-2 py-4'>
                <div className='flex items-center gap-2'>
                    {blog.thumbnail ? (
                        <img 
                            src={blog.thumbnail} 
                            alt={blog.title} 
                            className='w-10 h-10 rounded object-cover'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40';
                            }}
                        />
                    ) : (
                        <div className='w-10 h-10 rounded bg-gray-100 flex items-center justify-center'>
                            <EditIcon className='text-gray-400' />
                        </div>
                    )}
                    <p className='text-gray-800 font-medium'>{blog.title}</p>
                </div>
            </td>
            <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <span className={`px-2 py-1 rounded-full text-xs ${
                    blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {blog.isPublished ? 'Published' : 'OnReview'}
                </span>
            </td>
            <td className='px-2 py-4'>
                <div className='flex items-center gap-1'>
                    <CommentIcon className='text-gray-500' fontSize='small' />
                    <span>{commentCount || 0}</span>
                </div>
            </td>
            <td className='px-2 py-4'>
                <div className='flex items-center gap-2'>
                    <Tooltip title="Edit Blog">
                        <IconButton 
                            onClick={handleEdit}
                            size="small"
                            className='text-primary hover:text-primary/80'
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    
                    {user.role === 'admin' && (
                        <Tooltip title={blog.isPublished ? "Unpublish Blog" : "Publish Blog"}>
                            <IconButton 
                                onClick={togglePublish}
                                size="small"
                                className='text-blue-600 hover:text-blue-900'
                            >
                                {blog.isPublished ? <UnpublishedIcon /> : <PublishIcon />}
                            </IconButton>
                        </Tooltip>
                    )}
                    
                    <Tooltip title="Delete Blog">
                        <IconButton 
                            onClick={deletBlog}
                            size="small"
                            className='text-red-600 hover:text-red-900'
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </td>
        </tr>
    )
}

export default BlogTableItem

