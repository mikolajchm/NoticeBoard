import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const Login = () => {
    return (
        <Form className="col-12 col-sm-6 mx-auto">

            <h1 className="my-4">Login</h1>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login :</Form.Label>
                <Form.Control type="text" placeholder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password :</Form.Label>
                <Form.Control type="text" placeholder="Enter password" />
            </Form.Group>

            <Button variant="outline-primary" type="submit"> 
                Submit 
            </Button> 

        </Form>
    )
}
export default Login;