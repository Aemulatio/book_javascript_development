const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {AuthenticationError, ForbiddenError} = require("apollo-server-express")
require("dotenv").config()
const gravatar = require("../util/gravatar")
const mongoose = require("mongoose")
module.exports = {
    newNote: async (parent, args, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Необходимо быть авторизованным, для создания записи")
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        })
    },

    deleteNote: async (parent, {id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Необходимо быть авторизованным, для создания записи")
        }

        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("У вас нет прав на удаление этой записи")
        }

        try {
            await note.remove();
            return true
        } catch (err) {
            return false;
        }
    },

    updateNote: async (parent, {content, id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Необходимо быть авторизованным, для создания записи")
        }
        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("У вас нет прав на изменение этой записи")
        }
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content,
                }
            },
            {
                new: true
            }
        );
    },

    signUp: async (parent, {username, email, password}, {models}) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email)
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            return jwt.sign({id: user._id}, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err)
            throw new Error("Ошибка создания аккаунта")
        }
    },
    signIn: async (parent, {username, email, password,}, {models}) => {
        if (email) {
            email = email.trim().toLowerCase()
        }
        const user = await models.User.findOne({
            $or: [{email}, {username}]
        });

        if (!user) {
            throw new AuthenticationError("Error signed in")
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw  new AuthenticationError("Error signed in")
        }
        return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, {id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Необходимо быть авторизованным, для создания записи")
        }
        let noteCheck = await models.Note.findById(id)
        const hasUser = noteCheck.favoritedBy.indexOf(user.id)
        
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true,
                }
            );
        } else {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true,
                }
            );
        }
    }

}