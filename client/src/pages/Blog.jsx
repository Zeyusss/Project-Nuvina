import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data, comments_data } from '../assets/data'
import Navbar from '../components/Navbar'
import {data} from '../assets/data'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Dialog } from '@mui/material';

const Blog = () => {
  const {id} = useParams()
  const {axios, user, token} = useAppContext();

  const [data,setData] = useState(null)
  const [comments,setComments] = useState([])

  const [name,setName] = useState("")
  const [content,setContent] = useState("")

  const [likeList, setLikeList] = useState([]);
  const [showAllLikes, setShowAllLikes] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const MAX_LIKES_PREVIEW = 4;

  const fetchBlogdata = async ()=> {
   try {
    const {data} = await axios.get(`/api/blog/${id}`)
    data.state ? setData(data.blog) : toast.error(data.message)
    setLikeList(data.blog.likes || []);
   } catch (error) {
    toast.error(error.message)
   }
  }

  const fetchComments = async ()=> {
    try {
      const {data} = await axios.post('/api/blog/comments',{blogId : id})
      if(data.state){
        setComments(data.comments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async(e)=> {
e.preventDefault();
try {
  const {data} = await axios.post('/api/blog/add-comment',{blog: id , name , content})
  if(data.state){
    toast.success(data.message)
    setName('')
    setContent('')
  }else{
    toast.error(data.message)
  }
} catch (error) {
      toast.error(error.message)

}
  }

  const handleLike = async () => {
    if (!token) return;
    setLikeAnimating(true);
    setLikeLoading(true);
    try {
      const { data: likeData } = await axios.post(`/api/blog/${id}/like`);
      if (likeData.state) {
        setLikeList(likeData.likes);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLikeLoading(false);
    setTimeout(() => setLikeAnimating(false), 300);
  };

  const isLiked = user && likeList.some(likeUser => likeUser._id === user._id);
  const previewNames = likeList.slice(0, MAX_LIKES_PREVIEW).map(u => u.name).join(', ');
  const extraCount = likeList.length - MAX_LIKES_PREVIEW;

  useEffect(()=>{
fetchBlogdata()
fetchComments()
  },[])
  return data ? (
    <div className='relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-white'>
      <div className='absolute inset-0 -z-10'>
        <img src={data.gradientBackground} alt="" className='w-full h-96 object-cover opacity-40'/>
        <div className='absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent'></div>
      </div>
      <Navbar/>
      <div className='max-w-4xl mx-auto mt-24 px-4 sm:px-8'>
        <div className='bg-white/90 rounded-2xl shadow-lg p-8 mb-8 relative'>
          <div className='flex flex-col items-center text-center'>
            <p className='text-primary font-medium mb-2'>Published on {Moment(data.createdAt).format('MMM Do YYYY')}</p>
            <h1 className='text-3xl sm:text-5xl font-bold text-gray-800 mb-2 drop-shadow'>{data.title}</h1>
            <h2 className='text-lg sm:text-2xl text-gray-500 font-light mb-3'>{data.subTitle}</h2>
            <div className='flex items-center gap-2 mb-4'>
              <span className='inline-block py-1 px-4 rounded-full border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>{data.author?.name || 'Anonymous'}</span>
            </div>
          </div>
          <div className='mt-2'>
            <img src={data.image} alt="" className='rounded-2xl mb-6 w-full max-h-96 object-cover shadow'/>
            <div className='custom-text prose prose-lg max-w-none mx-auto text-gray-800 leading-relaxed' style={{fontSize: '1.18rem'}} dangerouslySetInnerHTML={{__html: data.description}}></div>
          </div>
          <h3 className='text-xl font-semibold text-primary mt-10 mb-2 text-left w-full border-b border-primary/10 pb-2'>Likes</h3>
          <div className='flex items-center  mt-4 mb-2'>
            <div className='flex items-center gap-2 mb-2'>
              <button
                className={`focus:outline-none hover:scale-110 transition-transform ${likeAnimating ? 'scale-125' : ''}`}
                onClick={handleLike}
                disabled={!token || likeLoading}
                title={isLiked ? 'Unlike' : 'Like'}
                aria-label='Like this article'
              >
                <FavoriteIcon className= {'text-red-500 mt-3' } fontSize='medium'/>
              </button>
              <span className=' pe-4 mt-3 text-sm text-gray-700 font-semibold'>{likeList.length}</span>
            </div>
            {likeList.length > 0 && (
              <div className='flex flex-wrap justify-center gap-2 mt-1 max-w-full'>
                {likeList.map(u => (
                  <span key={u._id} className='inline-flex items-center px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium border border-primary/10'>
                    {u.name}
                  </span>
                ))}
                <span className='flex items-center text-xs text-gray-500 ml-2 gap-1'>
                  <FavoriteIcon className='text-red-400' fontSize='inherit'/> {likeList.length === 1 ? 'like this article' : 'likes this article'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='border-t border-primary/10 my-8'></div>
        <h3 className='text-xl font-semibold text-primary mb-4 text-left w-full border-b border-primary/10 pb-2'>Comments</h3>
        <div className='bg-white/90 rounded-2xl shadow p-6 mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
              {comments.length}
            </span>
            <span className='font-semibold text-primary'>Comments</span>
          </div>
          <div className='flex flex-col gap-4'>
            {comments.map((item,index)=>(
              <div key={index} className='relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded-xl text-gray-700 shadow-sm'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-base'>
                    {item.name?.[0]?.toUpperCase() || '?'}
                  </span>
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-10'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-400'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='border-t border-primary/10 my-8'></div>
        <h3 className='text-xl font-semibold text-primary mb-4 text-left w-full border-b border-primary/10 pb-2'>Add a Comment</h3>
        <div className='bg-white/90 rounded-2xl shadow p-6 mb-16'>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg w-full'>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required  className='w-full p-2 border border-gray-300 rounded outline-none'/>
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} required className='w-full p-2 border border-gray-300 rounded outline-none h-32' placeholder='Comment'></textarea>
            <button className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer text-base font-semibold shadow' type='submit'>Submit</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog
