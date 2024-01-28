
import AddEmployeeForm from "@/components/AddEmployeeForm/AddEmployee";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddEmployee = () => {

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col className="mt-5" md={5}>
                    <AddEmployeeForm/>
                </Col>
            </Row>
        </Container>
    )
}

export default AddEmployee;