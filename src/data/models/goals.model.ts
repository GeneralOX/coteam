import mongoose from "mongoose";

export const goalsModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        status:
        {
            type: String,
            required: true,
            default: "Pending"
        }

    },
    { timestamps: true }
);

export type Goal = typeof goalsModel