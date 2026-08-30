import { User } from "../../DB/Models/user.model.js";

export const userService = {
    findByEmail(email) {
        return User.findOne({
            where: {
                email
            }
        });
    },

    findById(id) {
        return User.findByPk(id, {
            attributes: {
                exclude: ["role"]
            }
        });
    },

    async signup(data) {
        const user = User.build(data);
        await user.save();
        return user;
    },

    async createOrUpdate(id, data) {
        const [user, created] = await User.upsert(
            {
                id,
                ...data
            },
            {
                validate: false
            }
        );

        return {
            user,
            created
        };
    }
};