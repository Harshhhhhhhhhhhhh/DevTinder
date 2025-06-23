const mongoose =require("mongoose")

const connectDB = async (params) => {
    await mongoose.connect(
    "mongodb+srv://harshraj2651:9006631511harsh@cluster0.yevlgkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )    
}

module.exports = connectDB




