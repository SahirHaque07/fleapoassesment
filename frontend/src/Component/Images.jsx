import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Images = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState([])

  const data = async()=>{
    const { data } = await axios.get("/images");
    setImage(data);
  }
  useEffect(()=>{
    data()
  },[])

  return (
    <Container>
      <Row>
        {image ? image.map((x) => {
          return (<>
            <Col md={3} className="my-2">
              <Card style={{ width: '18rem' }} key={x._id}>
                <Card.Img variant="top" src={x.path} />

                {/* <Button variant="primary" className='my-2'>View Image</Button> */}

              </Card>
            </Col>
          </>)
        }) : null}
      </Row>
      <Button onClick={() => navigate("/")} className="view-button"> Go Back</Button>
    </Container>
  )
}

export default Images