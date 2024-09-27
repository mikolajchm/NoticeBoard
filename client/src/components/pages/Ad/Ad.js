import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';  
import { API_URL } from '../../../config';
import { getAdById, removeAd } from '../../../redux/adsRedux';
import { getLoggedUser } from '../../../redux/userRedux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/esm/Image';


const Ad = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const adData = useSelector((state) => getAdById(state, id));
    const loggedUser = useSelector(getLoggedUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = (e) => {
        e.preventDefault(); 
        
        const options = {
            method: 'DELETE',
        };


        fetch(`${API_URL}/api/ad/remove/${id}`, options).then((res) => {
            if (res.status === 201) {
                setShow(false);
                dispatch(removeAd(id));
                navigate("/");
            } else {
                console.log('Removed failed');
            }
        });
    };

    return (
        <Form>
            <Form.Group className="mb-4">
                <Card style={{ padding: '5px'}}>
                <Card.Header as="h3" className="mb-2">More information about : {adData.title}</Card.Header>
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
                            <Card.Header as="h4" className="mb-2">Sellerinfo</Card.Header>
                            <ListGroup variant="header" className="mb-4">
                                <ListGroup.Item>Login : {adData.login}</ListGroup.Item>
                                <ListGroup.Item>Avatar : {''}
                                <Image src={IMGS_URL + adData.avatar}  style={{width: '200px'}}/></ListGroup.Item>
                                <ListGroup.Item>Phone : {adData.phone}</ListGroup.Item>
                            </ListGroup>
                            {loggedUser && (
                                <div 
                                    className="modal show"
                                    style={{ display: 'block', position: 'initial' }}
                                >
                                    <Link to={`/ad/edit/${id}`}>
                                        <Button  variant="outline-success" type="button"> 
                                            Edit
                                        </Button> 
                                    </Link>
                                    <Button  className="ms-3" variant="danger" onClick={handleShow}> 
                                        Remove 
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Are you sure?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>This operation is irreversible. Do you want to proceed?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={handleRemove}> 
                                                Remove
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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