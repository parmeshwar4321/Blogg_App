const dbPost = require('../model/postModel')
const dbUser = require('../model/userModel')
const { generateToken } = require('../Auth/jwt')

//get users
exports.getPost = async (req, res) => {
    try {

        await dbPost.aggregate([{
            $lookup: {
                from: "usercollections",
                localField: req.userDetail.id,
                foreignField: 'createdBy',
                as: "userDetails"
            }
        }])
            .then((result) => {
                res.status(200).send({ message: result })
                console.log(result);
            }).catch((err) => {
                res.status(404).send({ message: err.message })
            });


    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

//create
exports.creatPost = async (req, res) => {
    try {

        const createdBy = req.userDetail.id;
        const sentBy = req.userDetail.id

        const userData = {
            createdBy: createdBy,
            message: req.body.message,
            liked: req.body.liked,
            comments: [
                {
                    message: req.body.comments,
                    sentBy: sentBy
                }
            ]

        }
        await dbPost.insertMany(userData)
            .then((result) => {
                res.status(200).send({
                    data: result
                })
                console.log(result);
            }).catch((err) => {
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })

    }
}


//update user by Email
exports.updatePost = async (req, res) => {
    try {

        if (!req.userDetail) {
            console.log({ message: "please login..." });
            res.send({ message: "please login..." })
        }
        else {
            if (req.userDetail.id === req.body.createdBy) {

                console.log(req.body.createdBy);
                await dbPost.updateMany({
                    createdBy: req.body.createdBy
                },

                    {
                        $set:
                            req.body
                    })
                    .then((result) => {
                        res.status(200).send({ message: `Post Updated Successfully... ` })
                        console.log(result);
                    }).catch((err) => {
                        console.log(err.message);
                        res.status(404).send({ message: err.message })
                    });
            }

        }

    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }

}

exports.deletePost = async (req, res) => {
    try {

        if (!req.userDetail) {
            console.log({ message: "please login..." });
            res.send({ message: "please login..." })
        }
        else {
            if (req.userDetail.id === req.body.createdBy) {

                console.log(req.body.createdBy);
                await dbPost.remove({
                    createdBy: req.body.createdBy
                })
                    .then((result) => {
                        res.status(200).send({ message: `Post Deleted Successfully... ` })
                        console.log(result);
                    }).catch((err) => {
                        console.log(err.message);
                        res.status(404).send({ message: err.message })
                    });
            }

        }

    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }

}





