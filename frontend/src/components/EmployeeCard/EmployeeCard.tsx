'use client'
import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import styles from './styles.module.css';
import { useRouter } from "next/navigation";
import { DeleteEmployee } from "@/actions";

interface EmployeeCardProps {
    id?: string;
    first_name?: string;
    last_name?: string;
    number?: string;
    email?: string;
    photo?: string;
    gender?: string;
}

const EmployeeCard: FC<EmployeeCardProps> = (props: EmployeeCardProps) => {
    const router = useRouter();
    const handleOnClickEdit = (id: string) => {
        router.push(`/employee/edit/${id}`)
    }

    const handleDelete = async (id: string) => {
        await DeleteEmployee(id);
        router.push('/');
    }

    return (
        <Card>
            <Card.Img variant="top" src={props.photo} />
            <Card.Body>
                <Card.Title>{props.first_name} {props.last_name}</Card.Title>
                <Card.Text>
                    {props.email}
                </Card.Text>
                <Card.Text>
                    {props.number}
                </Card.Text>
                <Card.Text>
                    {props.gender === "M" ? "Male" : "Female"}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'end' }}>
                <Button variant="danger" className={styles.deleteButtonWrapper} onClick={() => handleDelete(props.id || "")}><FontAwesomeIcon className={styles.iconWrapper} icon={faTrashCan} /></Button>
                <Button variant="success" className={styles.editButtonWrapper}  onClick={() => handleOnClickEdit(props.id || "")}><FontAwesomeIcon icon={faUserPen} /></Button>
            </Card.Footer>
        </Card>
    );
}

export default EmployeeCard;