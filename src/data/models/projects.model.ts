import mongoose from "mongoose";

export const projectsModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },
    { timestamps: true }
);

export type Project = typeof projectsModel