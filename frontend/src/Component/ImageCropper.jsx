import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Container, Row, Col, Image, Button,Alert } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ImageCropper = () => {
    const navigate=useNavigate();
    const [error,setError] = useState();
    const [message,setMessage]=useState("");
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);
    
    const handleChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
    }
    // if (src!==null){
    //     console.log("image = ",image);
    // }

  
    const uploadImage= async()=>{
        const path = output
        console.log("path = ",path);
        console.log("outpu = ",output);
       try {
        const posted= await axios.post("/",{path})
       
        if(posted){
            setMessage("Cropped Image Uploaded Successfully ✔️")
        }
       } catch (error) {
           setError("Size Exceeds Limit must below 20kb")
       }
    }

    //Crop Image Function 
    
    
    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
        );
        
        // Converting to base64
        const base64Image = canvas.toDataURL();
        setOutput(base64Image);
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={6} className="text-center">
                    <h3 style={{ color: "goldenrod" }}>Choose Image to Crop</h3>
                    <input className="my-5 text-center" type="file" accept='image/*' onChange={handleChange} />
                </Col>
                <Col md={6}>
                    {error&&<Alert variant='danger'>{error}</Alert>}
                        {message&&<Alert variant='success'>{message}</Alert>}
                    {src && <ReactCrop src={src} onImageLoaded={setImage}
				crop={crop} onChange={setCrop} />


                    }
                    {src &&
                        <div>
                            <Button onClick={cropImageNow} variant='warning' ><i className="fa-solid fa-crop"></i> Crop </Button>
                          
                        </div>}

                        {output && <><Image src={output}className="my-2" fluid rounded thumbnail/>
                          <Button variant='success'className='mx-2'onClick={uploadImage}>Upload</Button>
                          </>}
                </Col>
                
            </Row>
            <Button onClick={()=>navigate("/images")} className=" view-button">View All Images</Button>
        </Container>
    )
}

export default ImageCropper;


// import { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// function App() {
// const [src, setSrc] = useState(null);
// const [crop, setCrop] = useState({ aspect: 16 / 9 });
// const [image, setImage] = useState(null);
// const [output, setOutput] = useState(null);

// const selectImage = (file) => {
// 	setSrc(URL.createObjectURL(file));
// };

// const cropImageNow = () => {
// 	const canvas = document.createElement('canvas');
// 	const scaleX = image.naturalWidth / image.width;
// 	const scaleY = image.naturalHeight / image.height;
// 	canvas.width = crop.width;
// 	canvas.height = crop.height;
// 	const ctx = canvas.getContext('2d');

// 	const pixelRatio = window.devicePixelRatio;
// 	canvas.width = crop.width * pixelRatio;
// 	canvas.height = crop.height * pixelRatio;
// 	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
// 	ctx.imageSmoothingQuality = 'high';

// 	ctx.drawImage(
// 	image,
// 	crop.x * scaleX,
// 	crop.y * scaleY,
// 	crop.width * scaleX,
// 	crop.height * scaleY,
// 	0,
// 	0,
// 	crop.width,
// 	crop.height,
// 	);
	
// 	// Converting to base64
// 	const base64Image = canvas.toDataURL('image/jpeg');
// 	setOutput(base64Image);
// };

// return (
// 	<div className="App">
// 	<center>
// 		<input
// 		type="file"
// 		accept="image/*"
// 		onChange={(e) => {
// 			selectImage(e.target.files[0]);
// 		}}
// 		/>
// 		<br />
// 		<br />
// 		<div>
// 		{src && (
// 			<div>
// 			<ReactCrop src={src} onImageLoaded={setImage}
// 				crop={crop} onChange={setCrop} />
// 			<br />
// 			<button onClick={cropImageNow}>Crop</button>
// 			<br />
// 			<br />
// 			</div>
// 		)}
// 		</div>
// 		<div>{output && <img src={output} />}</div>
// 	</center>
// 	</div>
// );
// }

// export default App;
