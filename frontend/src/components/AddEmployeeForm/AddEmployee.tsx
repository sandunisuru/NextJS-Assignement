'use client'
import { saveNewEmployee } from "@/actions"
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    item: "",
    message: ""
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button className="btn btn-outline-primary float-end" aria-disabled={pending}>Save</button>
    )
}

const AddEmployeeForm = () => {
    const [state, formAction] = useFormState(saveNewEmployee, initialState);
    const router = useRouter();

    if (state?.item === "done") {
        router.push("/");
    }

    return (
        <form action={formAction} method="post">
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
                        <input type="text" className={`form-control ${state?.item === "first_name" && "is-invalid"}`} name="first_name" />
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
                        <input type="text" className={`form-control ${state?.item === "last_name" && "is-invalid"}`} name="last_name" />
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
                        <input type="email" className={`form-control ${state?.item === "email" && "is-invalid"}`} name="email" />
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
                        <input type="text" className={`form-control ${state?.item === "number" && "is-invalid"}`} name="number" />
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
                        <select className={`form-control ${state?.item === "gender" && "is-invalid"}`} aria-label="Default select example" name="gender">
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
        </form>
    )
}

export default AddEmployeeForm;