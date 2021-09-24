const mongoose = require('mongoose')
// posts - { createdBy: ObjectId(userId), createdAt, updatedAt, message, comments: [{ sentBy: ObjectId(userId), sentAt, liked: [ObjectId(userId)] }] }

const postSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()

    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    message: {
        type: String,
        required: true
    },


    comments: [

        {
            message: {
                type: String,
                required: true

            },
            sentBy: {
                type: String,
                ref: "User",
                required: true
            },
            sentAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
    ,
    liked: {
        type: Number,
        authorId: {
            type: String,
            ref: "User", required: true
        }

    }
},
    {

        timestamps: true
    }
)


//     message: {
//         type: String,
//         required: true
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     userId: {
//         type: String
//     },
// },
//     {
//         timestamps: true
//     });


// const commentSchema = new Schema({
//     message: { type: String, required: true },
//     sentBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", required: true
//     },
//     postId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post", required: true
//     },
// },
//     {
//         timestamps: true
//     });
// const likeSchema = new Schema({
//     content: { type: String, required: false },
//     authorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", required: true
//     },
//     postId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post",
//         required: function () { return this.commentId ? false : true }
//     },
//     commentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//         required: function () { return this.postId ? false : true }
//     }

const userModel = new mongoose.model('postCollection', postSchema
)

module.exports = userModel;