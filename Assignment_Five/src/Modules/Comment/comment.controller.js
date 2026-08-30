import express from "express";
import { commentService } from "./comment.service.js";

export const commentRouter = express.Router();

// POST /comments
commentRouter.post("/", async (req, res) => {
    try {
        await commentService.bulkCreate(
            req.body.comments
        );
        return res.status(201).json({
            message: "comments created"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// POST /comments/find-or-create
commentRouter.post("/find-or-create", async (req, res) => {
    try {
        const [comment, created] =
            await commentService.findOrCreate(
                req.body
            );
        return res.json({
            comment,
            created
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// GET search
commentRouter.get("/search", async (req, res) => {
    const { count, rows } =
        await commentService.search(
            req.query.word
        );
    if (count === 0) {
        return res.status(404).json({
            message: "no comments found"
        });
    }
    return res.json({
        count,
        comments: rows
    });
});

// GET /comments/newest/:postId
commentRouter.get("/newest/:postId", async (req, res) => {
    const comments =
        await commentService.newest(
            req.params.postId
        );
    return res.json(comments);
});

// GET /comments/details/:id
commentRouter.get("/details/:id", async (req, res) => {
    const comment =
        await commentService.details(
            req.params.id
        );
    if (!comment) {
        return res.status(404).json({
            message: "no comment found"
        });
    }
    return res.json(comment);
});

// PATCH /comments/:commentId
commentRouter.patch("/:commentId", async (req, res) => {
    try {
        const comment =
            await commentService.findById(
                req.params.commentId
            );
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }
        if (comment.userId != req.body.userId) {
            return res.status(403).json({
                message: "You are not authorized to update this comment"
            });
        }
        comment.content = req.body.content;
        await comment.save();
        return res.json({
            message: "Comment updated"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});