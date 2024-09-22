import React from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import "./HorizontalSlider.css";

import image1 from "../../assets/formalS1.jpeg";
import image2 from "../../assets/formalM.jpeg";
import image3 from "../../assets/formalS6.jpeg";

import image4 from "../../assets/weddingM.jpeg";
import image5 from "../../assets/weddingF.jpeg";
import image6 from "../../assets/weddingM1.jpeg";

const HorizontalSlider = () => {
  const items = [
    {
      id: 1,
      images: [image1, image2, image3],
    },
    {
      id: 2,
      images: [image4, image5, image6],
    },
  ];

  return (
    <Container fluid>
      <Carousel>
        {items.map((item, idx) => (
          <Carousel.Item key={item.id}>
            <Row className="justify-content-center align-items-center image-row">
              {item.images.map((img, index) => (
                <Col key={index} md={4} sm={6} xs={12} className="text-center">
                  <img
                    src={img}
                    alt={`Slide ${idx + 1} - Image ${index + 1}`}
                    className="d-block carousel-image"
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default HorizontalSlider;
