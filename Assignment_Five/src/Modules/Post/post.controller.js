import express from "express";
import { postService } from "./post.service.js";

export const postRouter = express.Router();

// POST /posts
postRouter.post("/", async (req, res) => {
    try {
        await postService.create(req.body);
        return res.status(201).json({
            message: "Post created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// GET /posts/details
postRouter.get("/details", async (req, res) => {
    const posts = await postService.getDetails();
    return res.json(posts);
});

// GET /posts/comment-count
postRouter.get("/comment-count", async (req, res) => {
    const posts = await postService.getCommentCount();
    return res.json(posts);
});

// DELETE post by id 
postRouter.delete("/:postId", async (req, res) => {
    try {
        const post = await postService.findById(
            req.params.postId
        );
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        const userId = req.body.userId;
        if (post.userId != userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }
        await post.destroy();
        return res.json({
            message: "Post deleted"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});