import React, { useState,useCallback } from 'react';
import { Button, Col, Container, Row ,Image} from 'react-bootstrap';
import Cropper from 'react-easy-crop';

const ImageNewCrop = () => {
    const [image,setImage]=useState(null)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);

    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
     }
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])
    return (<>
     <Container>
         <Row>
             <Col md={6}>
             <h3 style={{ color: "goldenrod" }}>Choose Image to Crop</h3>
        <input className="my-5 text-center" type="file" accept='image/*' onChange={handleChange} />
      
             </Col>
             <Col md={6}>
           {image &&   <Cropper style={{height:"500px",width:"500px"}}
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            
            onZoomChange={setZoom}
        />}
        <Button onClick={onCropComplete}>Crop</Button>
             </Col>
         </Row>
     </Container>
    </>
    )
}




export default ImageNewCrop