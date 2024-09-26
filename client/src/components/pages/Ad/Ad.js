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
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';


const Ad = () => {
    const { id } = useParams();
    const adData = useSelector((state) => getAdById(state, id));
    const loggedUser = useSelector(getLoggedUser);

    return (
        <Form>
            <Form.Group className="mb-4">
                <Card style={{ padding: '5px'}}>
                    <Card.Header><cite>More information about: {adData.title}</cite></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-3">
                            <Col xs={6} md={4} xl={6} className="mb-3">
                                <Image src={IMGS_URL + adData.photo} fluid />
                            </Col>
                            <ListGroup variant="header" className="mb-2">
                                <ListGroup.Item>Title : {adData.title}</ListGroup.Item>
                                <ListGroup.Item>Description : {adData.content} </ListGroup.Item>
                                <ListGroup.Item>PublishDate : {adData.publishDate}</ListGroup.Item>
                                <ListGroup.Item>Price :  {adData.price}</ListGroup.Item>
                                <ListGroup.Item>Location :  {adData.location}</ListGroup.Item>
                                <ListGroup.Item>Sellerinfo :  {adData.publishDate}</ListGroup.Item>
                            </ListGroup>
                            <Card.Header as="h3" className="mb-2">Sellerinfo</Card.Header>
                            <ListGroup variant="header" className="mb-4">
                                <ListGroup.Item>Login : {adData.login}</ListGroup.Item>
                                <ListGroup.Item>Avatar : {''}
                                <Image src={IMGS_URL + adData.photo}  style={{width: '200px'}}/></ListGroup.Item>
                                <ListGroup.Item>Phone : {adData.phone}</ListGroup.Item>
                            </ListGroup>
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