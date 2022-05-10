import express from "express"
import connDb from "./config/db.js";
import CropImage from "./imageSchema.js";
import dotenv from "dotenv"
const app = express();
app.use(express.json())
dotenv.config();
connDb();

app.post("/", async (req, res) => {
    try {
        // const path = req.body.path;
        const path= req.body.path;
        
        const image = new CropImage({path});
        await image.save();
        res.json("Image Uploaded Successfully")
    } catch (error) {
        res.json({
            message: error.stack
        })
    }
})
app.get("/images",async(req,res)=>{
    try {
        const allImages = await CropImage.find({});
        res.json(allImages)
    } catch (error) {
        res.json({
            message:error.stack
        })
    }
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("<h1>Api is Running ...</h1>");
    }) 
}


app.listen(process.env.PORT, () => {
    console.log("Srver is running on port = 8080")
})