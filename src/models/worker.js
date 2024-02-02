import mongoose from "mongoose";

workerSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type : String, required : true},
    email : {type: String, required : true},
    password : {type: String, required : true}
}, {versionKey : false});

const worker = mongoose.model("workers", workerSchema);

export default worker;