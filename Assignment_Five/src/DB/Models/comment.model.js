import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

export class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        content: {
            type: DataTypes.TEXT
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Comment",
        timestamps: true
    }
);