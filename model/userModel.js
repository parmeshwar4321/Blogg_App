const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        trim:true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim:true
       
    },
    Password: {
        type: String,
        required: true
    },
    Mobile: {
        type: String,
        required: true,
        maxlength:12,
        minlength:10
    }

},
    { timestamps: true })

module.exports=  mongoose.model('userCollection', userSchema)