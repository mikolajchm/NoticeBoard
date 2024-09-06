import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Ad = () => {
    return (
        <Form>
            <Button  variant="outline-success" type="submit"> 
                Edit
            </Button> 
            <Button  className="ms-3" variant="danger" type="submit"> 
                Remove 
            </Button> 
        </Form>
    )
}
export default Ad;