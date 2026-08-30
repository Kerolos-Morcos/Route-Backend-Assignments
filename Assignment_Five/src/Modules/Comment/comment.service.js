import { Op } from "sequelize";
import { Comment } from "../../DB/Models/comment.model.js";
import { User } from "../../DB/Models/user.model.js";
import { Post } from "../../DB/Models/post.model.js";

export const commentService = {
    bulkCreate(comments) {
        return Comment.bulkCreate(comments);
    },

    findById(id) {
        return Comment.findByPk(id);
    },

    findOrCreate(data) {
        return Comment.findOrCreate({
            where: {
                postId: data.postId,
                userId: data.userId,
                content: data.content
            },
            defaults: data
        });
    },

    search(word) {
        return Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        });
    },

    newest(postId) {
        return Comment.findAll({
            where: {
                postId
            },
            attributes: [
                "id",
                "content",
                "createdAt"
            ],
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 3
        });
    },

    details(id) {
        return Comment.findByPk(id, {
            attributes: [
                "id",
                "content"
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "name",
                        "email"
                    ]
                },
                {
                    model: Post,
                    attributes: [
                        "id",
                        "title",
                        "content"
                    ]
                }
            ]
        });
    }
};