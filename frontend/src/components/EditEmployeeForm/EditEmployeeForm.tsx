'use client'
import { EditEmployee, saveNewEmployee } from "@/actions"
import { TEmployee } from "@/types/TEmployee";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    item: "",
    message: ""
}

type EditEmployeeFormProps = {
    employee: TEmployee | null
}

const EditEmployeeForm = (props: EditEmployeeFormProps) => {
    const [state, formAction] = useFormState(EditEmployee, initialState);
    const router = useRouter();
    const [employee, setEmployee] = useState<TEmployee | null>(props.employee);

    if (state?.item === "done") {
        router.push("/");
    }

    const handleSubmit = () => {
        if (employee)
            formAction(employee);
    }

    function SubmitButton() {
        const { pending } = useFormStatus();
        return (
            <button className="btn btn-outline-primary float-end" aria-disabled={pending} onClick={() => handleSubmit()}>Save</button>
        )
    }

    return (
        <div>
            {state?.item === "error" && (
                <div className="alert alert-danger" role="alert">
                    {state.message}
                </div>
            )}
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label className="form-label">First Name</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={employee?.first_name || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, first_name: e.target.value })}
                            className={`form-control ${state?.item === "first_name" && "is-invalid"}`}
                            name="first_name" />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            {state?.message}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label className="form-label">Last Name</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={employee?.last_name}
                            className={`form-control ${state?.item === "last_name" && "is-invalid"}`}
                            name="last_name"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, last_name: e.target.value })}
                        />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            {state?.message}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label className="form-label">Email</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            type="email"
                            value={employee?.email}
                            className={`form-control ${state?.item === "email" && "is-invalid"}`}
                            name="email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, email: e.target.value })}
                        />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            {state?.message}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label className="form-label">Phone</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={employee?.number}
                            className={`form-control ${state?.item === "number" && "is-invalid"}`}
                            name="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployee({ ...employee, number: e.target.value })}
                        />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            {state?.message}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label className="form-label">Gender</label>
                    </div>
                    <div className="col-md-9">
                        <select
                            value={employee?.gender}
                            className={`form-control ${state?.item === "gender" && "is-invalid"}`}
                            aria-label="Default select example"
                            name="gender"
                            onSelect={(e: any) => setEmployee({ ...employee, gender: e.target.value })}
                        >
                            <option value=""></option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                            {state?.message}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <SubmitButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployeeForm;