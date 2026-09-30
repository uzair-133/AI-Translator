const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb is Connected")
    }
    catch (err) {
        console.log("mongodb is not Connected", err)
    }
}

module.exports = connectToDb