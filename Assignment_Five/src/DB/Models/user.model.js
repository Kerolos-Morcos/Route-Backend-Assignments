import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            validate: {
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error(
                            "Password length must be greater than 6 characters"
                        );
                    }
                }
            }
        },

        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user"
        }
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: (user) => {
                if (user.name.length <= 2) {
                    throw new Error(
                        "User name must be greater than 2 characters"
                    );
                }
            }
        }
    }
);