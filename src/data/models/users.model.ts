import mongoose from "mongoose";

export const usersModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: Number,
            default: 1
        },

        note_tl: {
            type: String,
            required: true,
            default: 0
        },
        note_mn: {
            type: String,
            required: true,
            default: 0
        },
        note_ad: {
            type: String,
            required: true,
            default: 0
        },
        note_ab: {
            type: String,
            required: true,
            default: 1
        },


        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project'
            }
        ]
    },
    { timestamps: true }
);

export type User = typeof usersModel