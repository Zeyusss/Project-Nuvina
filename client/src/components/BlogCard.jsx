import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Dialog } from '@mui/material';
import toast from 'react-hot-toast';

const MAX_LIKES_PREVIEW = 4;

const BlogCard = ({blog}) => {
    const {title,description,category,image, _id, likes = [], commentCount = 0, author} = blog;
    const navigate = useNavigate();
    const { user, axios, token } = useAppContext();
    const [likeList, setLikeList] = useState(likes);
    const [showAllLikes, setShowAllLikes] = useState(false);
    const [loading, setLoading] = useState(false);

    const isLiked = user && likeList.some(likeUser => likeUser._id === user._id);

    const handleLike = async (e) => {
      e.stopPropagation();
      if (!token) return;
      setLoading(true);
      try {
        const { data } = await axios.post(`/api/blog/${_id}/like`);
        if (data.state) {
          setLikeList(data.likes);
        }
      } catch (error) {
        toast.error(error.message);}
      setLoading(false);
    };

    const previewNames = likeList.slice(0, MAX_LIKES_PREVIEW).map(u => u.name).join(', ');
    const extraCount = likeList.length - MAX_LIKES_PREVIEW;

    return (
      <div className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer relative' onClick={()=> navigate(`/blog/${_id}`)}>
        <img src={image} alt="" className='aspect-video'/>
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5 flex flex-col justify-between h-48'>
          <div>
            <h5 className='mb-2 font-medium text-gray-900 line-clamp-2'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center gap-2'>
              <button
                className='focus:outline-none'
                onClick={handleLike}
                disabled={!token || loading}
                title={isLiked ? 'Unlike' : 'Like'}
              >
                {isLiked ? <FavoriteIcon className='text-red-500' fontSize='small'/> : <FavoriteBorderIcon className='text-gray-400' fontSize='small'/>}
              </button>
              <span className='text-xs text-gray-700'>{likeList.length}</span>
              {likeList.length > 0 && (
                <span className='text-xs text-gray-500 ml-2'>
                  {previewNames}
                  {extraCount > 0 && (
                    <button className='text-primary ml-1 underline' onClick={e => {e.stopPropagation(); setShowAllLikes(true);}}>+{extraCount}</button>
                  )}
                </span>
              )}
              <Dialog open={showAllLikes} onClose={() => setShowAllLikes(false)}>
                <div className='p-4 min-w-[200px]'>
                  <h4 className='font-semibold mb-2'>Liked by</h4>
                  <ul>
                    {likeList.map(u => <li key={u._id}>{u.name}</li>)}
                  </ul>
                </div>
              </Dialog>
            </div>
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                {commentCount} comments
              </span>
            </div>
          </div>
        </div>
        {author && author.name && (
          <div className='absolute top-2 right-2 bg-white/90 px-3 py-1 rounded shadow text-sm font-bold text-black border border-gray-200' style={{letterSpacing: '0.01em'}}>
            By <span className='ml-1'>{author.name}</span>
          </div>
        )}
      </div>
    )
}

export default BlogCard
