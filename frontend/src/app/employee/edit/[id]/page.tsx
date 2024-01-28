import { getEmployee } from "@/actions"
import EditEmployeeForm from "@/components/EditEmployeeForm/EditEmployeeForm"
import { Col, Container, Row } from "react-bootstrap"

const EditEmployee = async ({ params }: { params: { id: string } }) => {

    const employee = await getEmployee(params.id);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col className="mt-5" md={5}>
                    <EditEmployeeForm employee={employee}/>
                </Col>
            </Row>
        </Container>
    )
}

export default EditEmployee;