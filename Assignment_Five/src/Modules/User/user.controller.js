import express from "express";
import { ValidationError } from "sequelize";
import { userService } from "./user.service.js";

export const userRouter = express.Router();

// POST /users/signup
userRouter.post("/signup", async (req, res) => {
    try {
        const existingUser = await userService.findByEmail(
            req.body.email
        );
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        await userService.signup(req.body);
        return res.status(201).json({
            message: "User added successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


// PUT /users/:id
userRouter.put("/:id", async (req, res) => {
    try {
        await userService.createOrUpdate(
            req.params.id,
            req.body
        );
        return res.status(200).json({
            message: "User created or updated successfully"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

// GET users by email
userRouter.get("/by-email", async (req, res) => {
    const user = await userService.findByEmail(
        req.query.email
    );
    if (!user) {
        return res.status(404).json({
            message: "no user found"
        });
    }
    return res.json({
        user
    });
});

// GET /users/:id
userRouter.get("/:id", async (req, res) => {
    const user = await userService.findById(
        req.params.id
    );
    if (!user) {
        return res.status(404).json({
            message: "no user found"
        });
    }
    return res.json(user);
});