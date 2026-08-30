import express from "express";
import { sequelize } from "./DB/connection.js";
import "./DB/Models/associations.js";
import { userRouter } from "./Modules/User/user.controller.js";
import { postRouter } from "./Modules/Post/post.controller.js";
import { commentRouter } from "./Modules/Comment/comment.controller.js";

const app = express();
const port = 5005;

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);


app.all("/{*dummy}", (req, res) => {
    return res.status(404).json({
        message: "Invalid routing"
    });
});

try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    // await sequelize.sync({
    //     alter: true
    // });
    await sequelize.sync();
    console.log("Models synchronized successfully");
    app.listen(port, () => {
        console.log(
            `Server is running on http://localhost:${port}`
        );
    });
} catch (error) {
    console.log(
        "Database connection error:",
        error
    );
}