import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { getLoggedUser } from '../../../redux/userRedux';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';


const Ad = () => {
    const { id } = useParams();
    const adData = useSelector((state) => getAdById(state, id));
    const loggedUser = useSelector(getLoggedUser);

    return (
        <Form>
            <Form.Group className="mb-2">
                <Card style={{ padding: '5px'}}>
                    <Card.Header><cite>Information :</cite></Card.Header>
                    <Card.Body >
                        <blockquote className="blockquote mb-3">
                            <Col xs={6} md={4} xl={8} className="mb-3">
                                <Image src={IMGS_URL + adData.photo} fluid />
                            </Col>
                            <p>
                                Title : 
                            </p> 
                            <footer className="blockquote-footer" style={{color: 'black'}}>
                                {adData.title}  
                            </footer>
                            <p>
                                Description : 
                            </p>
                            <footer className="blockquote-footer" style={{color: 'black'}}>
                                {adData.content}  
                            </footer>
                            <p>
                                PublishDate : 
                            </p>
                            <footer className="blockquote-footer" style={{color: 'black'}}>
                                {adData.publishDate}
                            </footer>
                            <p>
                                Price : 
                            </p>
                            <footer className="blockquote-footer" style={{color: 'black'}}>
                                {adData.price}
                            </footer>
                            <p>
                                Location : 
                            </p>
                            <footer className="blockquote-footer" style={{color: 'black'}}>
                                {adData.location}
                            </footer>
                            <p>
                                Sellerinfo : 
                            </p>
                            <p className="blockquote-footer" style={{color: 'black'}}>
                                Login : {adData.login}
                            </p>
                            <p  className="blockquote-footer" style={{color: 'black'}}>
                                Avatar : {''}
                                <Image src={IMGS_URL + adData.photo}  style={{width: '200px'}}/>
                            </p>
                            <p className="blockquote-footer" style={{color: 'black'}}>
                                Phone : {adData.phone}
                            </p>
                            {loggedUser && (
                                <div>
                                    <Link to={`/ad/edit/${id}`}>
                                        <Button  variant="outline-success" type="submitedit"> 
                                            Edit
                                        </Button> 
                                    </Link>
                                    <Button  className="ms-3" variant="danger" type="submitremove"> 
                                        Remove 
                                    </Button>
                                </div>
                            )}
                        </blockquote>
                    </Card.Body>
                </Card>
            </Form.Group>
        </Form>
    )
}
export default Ad;