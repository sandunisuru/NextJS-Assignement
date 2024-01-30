import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from '../src/app/page';
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';
import { ReactElement } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        query: { isTable: 'true' },
    }),
}));

jest.mock('../src/actions', () => ({
    loadData: jest.fn().mockResolvedValue([
        {
            id: '15',
            first_name: 'Amitha',
            last_name: 'L Senvirathna',
            email: 'amitha@gmail.com',
            number: '0712538902',
            gender: 'F',
            photo: 'https://randomuser.me/api/portraits/women/26.jpg'
        }
    ]), // Mocking with some information array
}));

jest.mock('next/link', () => (props: any) => require('react').createElement('div', props))

describe('Home Page', () => {
    test('displays a table when isTable=true', async () => {
        const tsx = await Home({ searchParams: { isTable: 'true' } });
        render(tsx);
        const tableElement = await screen.findByRole("table");
        expect(tableElement).toBeInTheDocument();
    })

    test('Table contains values', async () => {
        const tsx = await Home({ searchParams: { isTable: 'true' } });
        render(tsx);
        const firstNameElement = await screen.findByText("Amitha");
        const lastNameElement = await screen.findByText("L Senvirathna");
        const emailElement = await screen.findByText("amitha@gmail.com");
        const phoneElement = await screen.findByText("0712538902");
        const genderElement = await screen.findByText("Female");
        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();
        expect(phoneElement).toBeInTheDocument();
        expect(genderElement).toBeInTheDocument();
    })

    test('displays a grid when isTable=false', async () => {
        const tsx = await Home({ searchParams: { isTable: 'false' } });
        render(tsx);
        const element = screen.getByTestId("employee-15-card");
        expect(element).toBeInTheDocument();
    })

    test('It only displays one card', async () => {
        const tsx = await Home({ searchParams: { isTable: 'false' } });
        const result = render(tsx);
        const element = result.container.querySelectorAll(".card");
        expect(element.length).toBe(1);
    })
})