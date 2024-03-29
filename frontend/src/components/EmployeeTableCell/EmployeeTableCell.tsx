'use client'
import { TEmployee } from "@/types/TEmployee";
import { Button } from "react-bootstrap";
import styles from './styles.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { DeleteEmployee } from "@/actions";
import Image from "next/image";
import React from "react";

type EmployeeTableCellProps = {
    employee: TEmployee
}

const EmployeeTableCell = (props: EmployeeTableCellProps) => {
    const router = useRouter();
    const handleOnClickEdit = (id: string) => {
        router.push(`/employee/edit/${id}`)
    }

    const handleDelete = async (id: string) => {
        await DeleteEmployee(id);
        router.push('/');
    }
    return (
        <tr className="table-warning">
            <td><Image src={props.employee?.photo || ""} alt="User image" width={100} height={100}/></td>
            <td>{props.employee.first_name}</td>
            <td>{props.employee.last_name}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.number}</td>
            <td>{props.employee.gender === "M" ? "Male" : "Female"}</td>
            <td>
                <Button variant="danger" className={styles.deleteButtonWrapper} onClick={() => handleDelete(props.employee.id || "")}><FontAwesomeIcon className={styles.iconWrapper} icon={faTrashCan} /></Button>
                <Button variant="success" className={styles.editButtonWrapper} onClick={() => handleOnClickEdit(props.employee.id || "")}><FontAwesomeIcon icon={faUserPen} /></Button>
            </td>
        </tr>
    )
}

export default EmployeeTableCell;