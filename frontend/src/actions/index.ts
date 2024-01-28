'use server'

import { TEmployee } from "@/types/TEmployee";
import axios from "axios";
import * as _ from 'lodash';
import { revalidatePath } from "next/cache";

export const loadData = async (): Promise<TEmployee[]> => {
    try {
        const response = await axios.get("http://localhost:3000/employee");
        console.log(response.data)
        return response.data || [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const getEmployee = async (id: string): Promise<TEmployee | null> => {
    try {
        const response = await axios.get(`http://localhost:3000/employee/${id}`);
        console.log(response.data)
        return response.data || [];
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const saveNewEmployee = async (prevState: any, formData: FormData) => {
    try {
        const data = {
            first_name: formData.get("first_name")?.toString(),
            last_name: formData.get("last_name")?.toString(),
            email: formData.get("email")?.toString(),
            number: formData.get("number")?.toString(),
            gender: formData.get("gender")?.toString()
        }

        const nameRegex = /^[A-Za-z]{6,10}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const phoneNumberRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;

        if (!nameRegex.test(data.first_name || ""))
            return { item: "first_name", message: "First Name need to not null and 6-10 character length" }

        if (!nameRegex.test(data.last_name || ""))
            return { item: "last_name", message: "Last Name need to not null and 6-10 character length" }

        if (!emailRegex.test(data.email || ""))
            return { item: "email", message: "Invalid Email" }

        if (!phoneNumberRegex.test(data.number || ""))
            return { item: "number", message: "Invalid Phone number" }

        if (!data.gender)
            return { item: "gender", message: "Gender is mandatory" }

        const response = await axios.post(`http://localhost:3000/employee`, data);
        console.log(response.data)
        revalidatePath('/')
        return { item: "done", message: "User Added" };
    } catch (e: any) {
        console.log(e);
        return { item: "error", message: e.message };
    }
}

export const EditEmployee = async (prevState: any, data: TEmployee) => {
    try {
        const id = data.id;

        const nameRegex = /^[A-Za-z]{6,10}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const phoneNumberRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;

        if (!nameRegex.test(data.first_name || ""))
            return { item: "first_name", message: "First Name need to not null and 6-10 character length" }

        if (!nameRegex.test(data.last_name || ""))
            return { item: "last_name", message: "Last Name need to not null and 6-10 character length" }

        if (!emailRegex.test(data.email || ""))
            return { item: "email", message: "Invalid Email" }

        if (!phoneNumberRegex.test(data.number || ""))
            return { item: "number", message: "Invalid Phone number" }

        if (!data.gender)
            return { item: "gender", message: "Gender is mandatory" }

        const response = await axios.put(`http://localhost:3000/employee/${id}`, data);
        console.log(response.data)
        revalidatePath('/')
        return { item: "done", message: "User Updated" };
    } catch (e: any) {
        console.log(e);
        return { item: "error", message: e.message };
    }
}

export const DeleteEmployee = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/employee/${id}`);
        console.log(response.data)
        revalidatePath('/')
        return { item: "done", message: "User Updated" };
    } catch (e: any) {
        console.log(e);
        return { item: "error", message: e.message };
    }
}