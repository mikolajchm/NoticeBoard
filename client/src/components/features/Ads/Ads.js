import { IMGS_URL } from '../../../config';
import { getAllAds } from '../../../redux/adsRedux'
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Ads = () => {
  const ads = useSelector(getAllAds);

  return (
    <>
    <Row xs={1} md={2} xl={3} className="mb-5">
      {ads.map((ad) => (
        <Col key={ad._id} className="mb-4 d-flex justify-content-center">  
            <Card style={{  width: '100%' , padding: '2px' }}>   
            <Image style={{ height: '200px', objectFit: 'cover' }} src={IMGS_URL + ad.photo} rounded />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text className="mb-3 text-muted">{ad.location}</Card.Text>
              <Link to={`/ad/${ad._id}`}>
                <Button variant="outline-primary" size="lg">Read more...</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
  );
}

export default Ads;