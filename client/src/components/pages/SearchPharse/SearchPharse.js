import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';


const SearchPharse = () => {
    return (
        <div>
            <InputGroup>
                <Form className="d-flex mt-3 mb-3 mx-auto w-50" style={{ maxWidth: '500px' }}>
                    <Form.Group className="flex-grow-1" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Search..." /*value={searchPharse}*/ />
                    </Form.Group>
                    <Button variant="outline-primary" className="ms-2">
                        <Search />
                    </Button>
                </Form>
            </InputGroup>
        </div>
    );
};

export default SearchPharse;