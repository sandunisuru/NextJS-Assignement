'use server'

import { TEmployee } from "@/types/TEmployee";
import axios from "axios";
import * as _ from 'lodash';
import { revalidatePath } from "next/cache";

const ROOT_URL = process.env.ROOT_URL || "http://localhost:3000";

export const loadData = async (): Promise<TEmployee[]> => {
    try {
        const response = await axios.get(`${ROOT_URL}/employee`);
        return response.data || [];
    } catch (e) {
        return [];
    }
}

export const getEmployee = async (id: string): Promise<TEmployee | null> => {
    try {
        const response = await axios.get(`${ROOT_URL}/employee/${id}`);
        return response.data || [];
    } catch (e) {
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

        await axios.post(`${ROOT_URL}/employee`, data);
        revalidatePath('/')
        return { item: "done", message: "User Added" };
    } catch (e: any) {
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

        await axios.put(`${ROOT_URL}/employee/${id}`, data);
        revalidatePath('/')
        return { item: "done", message: "User Updated" };
    } catch (e: any) {
        return { item: "error", message: e.message };
    }
}

export const DeleteEmployee = async (id: string) => {
    try {
        await axios.delete(`${ROOT_URL}/employee/${id}`);
        revalidatePath('/')
        return { item: "done", message: "User Updated" };
    } catch (e: any) {
        return { item: "error", message: e.message };
    }
}