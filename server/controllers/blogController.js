import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req,res)=>{
try {
    const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if fields not empty
    if(!title || !description || !category || !imageFile){
        return res.json({state: false, message: "Missing required fields"})
    }

    const fileBuffer = fs.readFileSync(imageFile.path)
    // Upload Image
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname, 
        folder: "/blogs"
    });

    // Optimize Image
    const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation:[
            {quality:'auto'},
            {format:'webp'},
            {width:'1280'}
        ]
    });
    const image = optimizedImageUrl;

    await Blog.create({
        title,
        subTitle,
        description,
        category,
        image,
        isPublished,
        author: req.user.id 
    })
    res.json({state:true, message: "Blog Added Successfully"})
} catch (error) {
    res.json({state:false, message: error.message})
}
}

export const getAllBlogs = async (req,res)=>{
try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments({isPublished: true});
    const blogs = await Blog.find({isPublished: true})
        .populate('author', 'name email')
        .populate('likes', 'name')
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

    // Get comment counts for each blog
    const blogsWithComments = await Promise.all(blogs.map(async (blog) => {
        const commentCount = await Comment.countDocuments({ blog: blog._id, isApproved: true });
        return {
            ...blog.toObject(),
            commentCount
        };
    }));

    res.json({
        state: true,
        blogs: blogsWithComments,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs
    })
} catch (error) {
    console.error('Error in getAllBlogs:', error);
    res.json({state:false, message: error.message})
}
}

export const getBlogById = async (req,res)=>{
try {
    const {blogId} = req.params;
    const blog = await Blog.findById(blogId)
        .populate('author', 'name email')
        .populate('likes', 'name');
    if(!blog){
        return res.json({state:false, message: "Blog Not Found"})
    }
    res.json({state:true, blog})
} catch (error) {
    res.json({state:false, message: error.message})
}
}

export const deleteBlogById = async (req,res)=>{
try {
const {id} = req.body;
await Blog.findByIdAndDelete(id);

// Delet comments with the blog
await Comment.deleteMany({blog: id});
    res.json({state:true,message :"Blog Deleted Succesfully"})

} catch (error) {
    res.json({state:false,message : error.message})
}
}


export const togglePublish = async (req,res)=>{
try {
const {id} = req.body;
const blog = await Blog.findById(id);
blog.isPublished = !blog.isPublished;
await blog.save();
    res.json({state:true,message :"Blog Status Updated"})

} catch (error) {
    res.json({state:false,message : error.message})
}
}

export const addComment = async (req,res)=>{
try {
    const {blog,name,content} = req.body;
    await Comment.create({blog,name,content});
    res.json({state:true,message : "Comment Added For Review"})
} catch (error) {
    res.json({state:false,message : error.message})
}
}

export const getBlogComments = async (req,res)=>{
try {
    const {blogId} = req.body;
    const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt: -1});

    res.json({state:true,comments : comments})
} catch (error) {
    res.json({state:false,message : error.message})
}
}

export const generateContent = async (req ,res)=>{
try {
    const {prompt} = req.body;
    const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
    res.json({state:true , content})
} catch (error) {
        res.json({state:false , message : error.message})
}
}

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if blog exists
        const existingBlog = await Blog.findById(blogId);
        if (!existingBlog) {
            return res.json({ state: false, message: "Blog not found" });
        }

        // Prepare update data
        const updateData = {
            title,
            subTitle,
            description,
            category,
            isPublished
        };

        // If new image is provided
        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs"
            });

            const optimizedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });

            updateData.image = optimizedImageUrl;
        }

        // Update the blog
        await Blog.findByIdAndUpdate(blogId, updateData);
        res.json({ state: true, message: "Blog updated successfully" });
    } catch (error) {
        res.json({ state: false, message: error.message });
    }
}

// like/unlike a blog post
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ state: false, message: 'Blog not found' });
    }
    const index = blog.likes.findIndex((id) => id.toString() === userId);
    if (index === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(index, 1);
    }
    await blog.save();
    const updatedBlog = await Blog.findById(blogId).populate('likes', 'name');
    res.json({ state: true, likes: updatedBlog.likes });
  } catch (error) {
    res.json({ state: false, message: error.message });
  }
};

// Get likes for a blog post
export const getBlogLikes = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId).populate('likes', 'name');
    if (!blog) {
      return res.json({ state: false, message: 'Blog not found' });
    }
    res.json({ state: true, likes: blog.likes });
  } catch (error) {
    res.json({ state: false, message: error.message });
  }
};