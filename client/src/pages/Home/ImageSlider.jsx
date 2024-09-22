import Carousel from "react-bootstrap/Carousel";
import "./ImageSlider.css";
import img from "../../assets/wedding2.jpeg";
import img1 from "../../assets/party2.jpeg";
import img2 from "../../assets/formal3.jpeg";

function ImageSlider() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={img}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">Wedding Wear</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={img1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">Party Wear</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={img2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">Formal Wear</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;
