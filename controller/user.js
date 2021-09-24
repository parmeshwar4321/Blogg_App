const dbUser = require('../model/userModel')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Auth/jwt')

//get users
exports.getUsers = async (req, res) => {
    try {
        await dbUser.find({},
            {
                _id: true,
                Name: 1,
                Email: 1,
                Mobile: 1
            })
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
exports.createUsers = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
        const userData = {
            Name: req.body.Name,
            Email: req.body.Email,
            Password: hashedPassword,
            Mobile: req.body.Mobile
        }
        await dbUser.insertMany(userData)
            .then((result) => {
                res.status(200).send({ message: `User Sign-in Successfully...with UserId ::     ${result[0]._id}` })
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
exports.updateUsers = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
        await dbUser.updateMany({
            Email: req.body.Email
        },
            {
                $set: {
                    Name: req.body.Name,
                    Password: hashedPassword,
                    Mobile: req.body.Mobile
                }
            })
            .then((result) => {
                res.status(200).send({ message: `User Updated Successfully... ` })
                console.log(result);
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }

}



//login user
exports.loginUsers = async (req, res) => {
    try {
        var userData = await dbUser.find({ Email: req.body.Email })
        if (userData[0].Email) {
            if (bcrypt.compareSync(req.body.Password, userData[0].Password)) {
                const token = generateToken({ id: userData[0]._id, role: userData[0].Role })
                res.cookie('token', token).send({ message: `User Log-in Successfully with UserId :: ${userData[0]._id}` })
            } else {
                res.send({ message: "incorrect Password" })

            }
        } else {
            res.status(404).send({ message: "Email Required" })
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

//delete  user by id
exports.deleteUsers = async (req, res) => {
    try {
        await dbUser.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.status(200).send({ message: `User Deleted Successfully... ` })
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
}

