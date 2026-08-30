import { Sequelize } from "sequelize";
import { Post } from "../../DB/Models/post.model.js";
import { User } from "../../DB/Models/user.model.js";
import { Comment } from "../../DB/Models/comment.model.js";

export const postService = {
    async create(data) {
        const post = new Post(data);
        await post.save();
        return post;
    },

    findById(id) {
        return Post.findByPk(id);
    },

    getDetails() {
        return Post.findAll({
            attributes: [
                "id",
                "title"
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "name"
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "content"
                    ]
                }
            ]
        });
    },

    getCommentCount() {
        return Post.findAll({
            attributes: [
                "id",
                "title",
                [
                    Sequelize.fn(
                        "COUNT",
                        Sequelize.col("Comments.id")
                    ),
                    "commentCount"
                ]
            ],
            include: [
                {
                    model: Comment,
                    attributes: []
                }
            ],
            group: [
                "Post.id"
            ]
        });
    }
};