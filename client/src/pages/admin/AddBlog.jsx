import React, { useEffect, useRef, useState } from 'react'
import { blogCategories, data } from '../../assets/data'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked';
import { useLocation } from 'react-router-dom';

const AddBlog = () => {
  const {axios, user} = useAppContext();
  const location = useLocation();
  const [isAdding,setIsAdding] = useState(false)
  const [loading,setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(blogCategories);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image,setImage] = useState(false)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [category,setCategory] = useState('Startup')
  const [isPublished,setIsPublished] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    if (editId) {
      setIsEditing(true);
      setBlogId(editId);
      fetchBlogData(editId);
    }
  }, [location]);

  const fetchBlogData = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.state) {
        const blog = data.blog;
        setTitle(blog.title);
        setSubTitle(blog.subTitle || '');
        setCategory(blog.category);
        setIsPublished(blog.isPublished);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = blog.description;
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async ()=>{
    if(!title) return toast.error('Please enter a title')
    try {
      setLoading(true)
      const {data} = await axios.post('/api/blog/generate',{prompt:title})
      if(data.state) {
        quillRef.current.root.innerHTML = parse(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e)=>{
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title, subTitle , description: quillRef.current.root.innerHTML , category , isPublished: user.role === 'admin' ? isPublished : false
      }
      const formData = new FormData();
      formData.append('blog',JSON.stringify(blog))
      if (image) {
        formData.append('image',image)
      }

      let response;
      if (isEditing) {
        response = await axios.put(`/api/blog/${blogId}`, formData);
      } else {
        response = await axios.post('/api/blog/add', formData);
      }

      const {data} = response;
      if(data.state){
        toast.success(data.message);
        if (!isEditing) {
          setImage(false)
          setTitle('')
          quillRef.current.root.innerHTML = ''
          setCategory('Startup')
          setSubTitle('')
        }
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  }

  useEffect(()=> {
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current , {theme:'snow'})
    }
  },[])

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      toast.error('This category already exists');
      return;
    }
    setCategories(prev => [...prev, newCategory.trim()]);
    setCategory(newCategory.trim());
    setNewCategory('');
    setShowNewCategoryInput(false);
    toast.success('New category added successfully');
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? data.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input 
            onChange={(e)=> setImage(e.target.files[0])}  
            type="file" 
            name="image" 
            id="image" 
            hidden 
            required={!isEditing} 
            accept="image/*"
          />
        </label>
        <p className='mt-4'>Title</p>
        <input type="text" placeholder="Subject Title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e)=>{setTitle(e.target.value)}} value={title} />
        <p className='mt-4'>SubTitle</p>
        <input type="text" placeholder="Subject Title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e)=>{setSubTitle(e.target.value)}} value={subTitle} />
        <p className='mt-4'>Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {loading && (<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
            <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'> </div>
          </div>)}
          <button disabled={loading} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
        </div>

        <div className='mt-4'>
          <div className='flex items-center gap-2'>
            <p>Category</p>
            <button
              type='button'
              onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
              className='text-xs text-primary hover:text-primary/80 transition-colors'
            >
              {showNewCategoryInput ? 'Cancel' : '+ Add New'}
            </button>
          </div>

          {showNewCategoryInput ? (
            <div className='flex gap-2 mt-2'>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className='flex-1 p-2 border border-gray-300 outline-none rounded'
              />
              <button
                type='button'
                onClick={handleAddCategory}
                className='px-4 py-2 bg-primary text-white rounded transition-colors hover:bg-primary/90'
              >
                Add
              </button>
            </div>
          ) : (
            <select 
              onChange={(e)=>setCategory(e.target.value)} 
              value={category} 
              name="category" 
              className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
            >
              <option value="">Select Category</option>
              {categories.map((item,index)=>{
                return <option key={index} value={item}>{item}</option>
              })}
            </select>
          )}
        </div>

        {user.role === 'admin' && (
          <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e)=> setIsPublished(e.target.checked)} />
          </div>
        )}
        <button disabled={isAdding} className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm' type='submit'>{isAdding ? 'Publishing...' : isEditing ? 'Update Blog' : 'Publish' }</button>
      </div>
    </form>
  )
}

export default AddBlog
