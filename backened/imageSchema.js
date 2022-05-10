

import mongoose from "mongoose";


const imageSchema =  mongoose.Schema({
    path:{
        type:String,
        required:true
    }
})

const CropImage = mongoose.model("CropImage",imageSchema);

export default CropImage;