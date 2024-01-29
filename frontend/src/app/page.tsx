import styles from "./page.module.css";
import EmployeeCard from "@/components/EmployeeCard/EmployeeCard";
import { Col, Container, Row } from "react-bootstrap";
import { loadData } from "@/actions";
import { TEmployee } from "@/types/TEmployee";
import * as _ from 'lodash';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import EmployeeTableCell from "@/components/EmployeeTableCell/EmployeeTableCell";
import React from "react";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
  const employees: TEmployee[] = await loadData();
  console.log(employees)
  let isTable = searchParams?.isTable === "true" ? true : false;

  return (
    <main className={styles.main}>
      <Container>
        <Row style={{ textAlign: 'end', marginTop: 10 }}>
          <Col>
            <Link data-testid="add-new-employee" className="btn btn-primary" href={"/employee/add"}>Add New Employee</Link>
            <Link data-testid="change-view" className="btn btn-primary ms-1" href={`?isTable=${!isTable}`}>{isTable ? <FontAwesomeIcon icon={faGrip} /> : <FontAwesomeIcon icon={faList} />}</Link>
          </Col>
        </Row>
        {!isTable && (
          <Row>
            {employees.map((employee: TEmployee) => (
              <Col className={styles.employeeCardWrapper} key={employee.id} md={3}>
                <EmployeeCard
                  {...employee}
                />
              </Col>
            ))}
          </Row>
        )}
        {isTable && (
          <Row className="mt-5">
            <table className="table table-bordered border-primary">
              <thead>
                <tr className="table-success">
                  <th>Image</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee: TEmployee) => (
                  <EmployeeTableCell key={employee.id} employee={employee}/>
                ))}
              </tbody>
            </table>
          </Row>
        )}
      </Container>
    </main >
  );
}
