import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import NavBar from './Navbar';

describe('Navbar Component', () => {
    test('Page has a Navbar', () => {
        const { getByRole } = render(<NavBar />);
        const navbarElement = getByRole('navigation');
        expect(navbarElement).toBeInTheDocument();
    })

    // test('Navbar has a text as Employee Manager', () => {
    //     const { getByText } = render(<NavBar />);
    //     const employeeManagerText = getByText('Employee Manager');
    //     expect(employeeManagerText).toBeInTheDocument();
    // })
})