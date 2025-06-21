import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check credentials
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ state: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign(
            { email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            state: true,
            token,
            user: {
                email,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.json({ state: false, message: error.message });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const { role, id } = req.user;
        
        // Get total blogs count
        const totalBlogs = await Blog.countDocuments(role === 'admin' ? {} : { author: id });
        
        // Get total comments count 
        const totalComments = role === 'admin' 
            ? await Comment.countDocuments({ isApproved: true })
            : await Comment.countDocuments({ 
                blog: { $in: await Blog.find({ author: id }).select('_id') },
                isApproved: true 
            });
        
        const drafts = await Blog.countDocuments(role === 'admin' ? { isPublished: false } : { author: id, isPublished: false });
        
        const recentBlogs = await Blog.find(role === 'admin' ? {} : { author: id })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('author', 'name email');

        const blogsWithComments = await Promise.all(recentBlogs.map(async (blog) => {
            const commentCount = await Comment.countDocuments({ 
                blog: blog._id,
                isApproved: true 
            });
            return {
                ...blog.toObject(),
                commentCount
            };
        }));

        res.json({
            state: true,
            dashboard: {
                totalBlogs,
                totalComments,
                drafts,
                recentBlogs: blogsWithComments
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.json({ state: false, message: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const { role, id } = req.user;
        const blogs = await Blog.find(role === 'admin' ? {} : { author: id })
            .sort({ createdAt: -1 })
            .populate('author', 'name email');

        const blogsWithComments = await Promise.all(blogs.map(async (blog) => {
            const commentCount = await Comment.countDocuments({ blog: blog._id });
            return {
                ...blog.toObject(),
                commentCount
            };
        }));

        res.json({ state: true, blogs: blogsWithComments });
    } catch (error) {
        console.error('Error in getAllBlogsAdmin:', error);
        res.json({ state: false, message: error.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .sort({ createdAt: -1 })
            .populate('blog', 'title')
            .lean(); 


        const formattedComments = comments.map(comment => ({
            ...comment,
            blogTitle: comment.blog?.title || 'Deleted Blog',
            userName: comment.name || 'Anonymous'
        }));

        res.json({ state: true, comments: formattedComments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.json({ state: false, message: error.message });
    }
}

export const deletCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ state: false, message: "Comment ID is required" });
        }

        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.json({ state: false, message: "Comment not found" });
        }

        res.json({ state: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.json({ state: false, message: error.message });
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ state: false, message: "Comment ID is required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { isApproved: true },
            { new: true }
        );
        
        if (!updatedComment) {
            return res.json({ state: false, message: "Comment not found" });
        }
        
        res.json({ 
            state: true, 
            message: "Comment approved successfully",
            comment: updatedComment
        });
    } catch (error) {
        console.error('Error approving comment:', error);
        res.json({ state: false, message: error.message });
    }
}
