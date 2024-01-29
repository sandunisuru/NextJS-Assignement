import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import RootLayout from './layout';

describe('Navbar Component', () => {
    test('Page has a Navbar', () => {
        const { getByRole } = render(<RootLayout children={undefined} />);
        const navbarElement = getByRole('navigation');
        expect(navbarElement).toBeInTheDocument();
    })

    test('Navbar has a text as Employee Manager', () => {
        render(<RootLayout children={undefined} />);
        const employeeManagerText = screen.getByText('Employee Manager');
        expect(employeeManagerText).toBeInTheDocument();
    })
})