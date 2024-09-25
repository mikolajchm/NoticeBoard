import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { API_URL } from '../../../config';
import { getAdById } from '../../../redux/adsRedux';
import { useParams } from 'react-router-dom';
import { editAd } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUser } from '../../../redux/userRedux';



const EditAdForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const adData = useSelector((state) => getAdById(state, id));

    const [title, setTitle] = useState(adData.title || "");
    const [content, setContent] = useState(adData.content || "");
    const [price, setPrice] = useState(adData.price || "");
    const [publishDate, setPublishDate] = useState(new Date());
    const [location, setLocation] = useState(adData.location || "");
    const [photo, setPhoto] = useState(adData.image || null);
    const [status, setStatus] = useState(null); // null, 'loading', 'succes', 'serverError' , 'clientError', 'loginError'


    
    const user = useSelector(getLoggedUser);


    const handleSubmit = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        fd.append('photo', photo);
        fd.append('publishDate', publishDate);
        fd.append('price', price);  
        fd.append('location', location);
        fd.append('user', user.id);

        const options = { 
            method: 'PUT',
            body: fd, 
        };

        setStatus('loading');

        fetch(`${API_URL}/api/ad/edit/${id}`, options)
        .then(async (res) => {
            if (res.status === 201) {
                const data = await res.json();
                setStatus('success');
                dispatch(editAd(data));
                setTimeout(() => {
                    navigate("/");
                }, 50);
            } else if (res.status === 400) {
                setStatus('clientError');
            } else if (res.status === 409) {
                setStatus('loginError');
            } else {
                setStatus('serverError');
            }
        })
        .catch((err) => {
            console.error(err);
            setStatus('serverError');
        });
    }

    return (
        <Form className="col-12 col-sm-6 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Edit Ad</h1>

            { status === "success" && (<Alert variant="success" >
            <Alert.Heading>Succes !</Alert.Heading>
                <p>You have been add ad!</p>
            </Alert> )}

            { status === "serverError" && (<Alert variant="danger">
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>Unexpected error... Try again!</p>     
            </Alert> )}

            { status === "clientError" && (<Alert variant="danger">
                <Alert.Heading>No enough data</Alert.Heading>
                <p>You have to fill all the fields.</p>     
            </Alert> )}

            { status === "loading" && (<Spinner animation="border" role="status" className="block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner> )}

            <Form.Group className="mb-3" controlId="formLogin" minLength={10}  maxLength={50}>
                <Form.Label>Title :</Form.Label>
                <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLogin" minLength={20}  maxLength={100}>
                <Form.Label>Content :</Form.Label>
                <Form.Control type="text" as="textarea" rows={3}  value={content} onChange={e => setContent(e.target.value)} placeholder="Content..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Photo :</Form.Label>
                <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label style={{ marginRight: '10px' }}>Phublish date :</Form.Label>
                <DatePicker 
                    selected={publishDate} 
                    onChange={(date) => setPublishDate(date)} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Price :</Form.Label>
                <Form.Control type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Location:</Form.Label>
                <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location..." />
                </Form.Group>

            <Button variant="outline-primary" type="submit"> 
                Save
            </Button> 
        </Form>
    )
}


export default EditAdForm;