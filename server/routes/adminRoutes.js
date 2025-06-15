import express from "express";
import { adminLogin, approveCommentById, deletCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth, { isAdmin, isUser } from "../middleware/auth.js";

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin);

// Admin only routes
adminRouter.get("/comments", auth, isAdmin, getAllComments);
adminRouter.post("/delete-comment", auth, isAdmin, deletCommentById);
adminRouter.post("/approve-comment", auth, isAdmin, approveCommentById);

// admin and regular users
adminRouter.get("/blogs", auth, isUser, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, isUser, getDashboard);

export default adminRouter;