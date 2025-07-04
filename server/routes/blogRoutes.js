import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish, updateBlog, toggleLike, getBlogLikes } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add",upload.single('image'),auth, addBlog);
blogRouter.get("/all",getAllBlogs);
blogRouter.get("/:blogId",getBlogById);
blogRouter.put("/:blogId", upload.single('image'), auth, updateBlog);
blogRouter.post("/comments",getBlogComments);
blogRouter.post("/delete",auth,deleteBlogById);
blogRouter.post("/toggle-publish",auth,togglePublish);
blogRouter.post("/add-comment",addComment);
blogRouter.post("/generate",auth,generateContent);
blogRouter.post('/:blogId/like', auth, toggleLike);
blogRouter.get('/:blogId/likes', getBlogLikes);

export default blogRouter;