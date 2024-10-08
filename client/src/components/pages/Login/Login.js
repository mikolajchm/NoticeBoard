import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import  { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userRedux';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null); // null, 'loading', 'succes', 'serverError' , 'clientError'
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
          };

        setStatus('loading');

        fetch(`${API_URL}/auth/login`, options)
            .then((res) => res.json())
            .then((data) => {
                console.log('Response from server:', data); 

                if (data.message === 'Login successful') {
                    console.log('User data:', data.user); 
                    setStatus('success');
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                    dispatch(logIn(data.user));
                    setTimeout(() => {
                        navigate('/');
                    }, 500);
                } else if (data.message === 'Login or password are incorrect') {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch((err) => {
                console.error('Error during fetch:', err);
                setStatus('serverError');
            }); 
    }


    return (
        <Form className="col-12 col-sm-6 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Sign in</h1>

            { status === "success" && (<Alert variant="success" >
            <Alert.Heading>Succes !</Alert.Heading>
                <p>You have been succesfully logged in!</p>
            </Alert> )}

            { status === "serverError" && (<Alert variant="danger">
                <Alert.Heading>Something went wrong...</Alert.Heading>
                <p>Unexpected error... Try again!</p>     
            </Alert> )}

            { status === "clientError" && (<Alert variant="danger">
                <Alert.Heading>Incorrect data</Alert.Heading>
                <p>Password or login are incorrect.</p>     
            </Alert> )}

            { status === "loading" && (<Spinner animation="border" role="status" className="block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner> )}

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login :</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password :</Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
            </Form.Group>

            <Button variant="outline-primary" type="submit"> 
                Sign in 
            </Button> 

        </Form>
    )
}
export default Login; 