import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import NavBar from '../src/components/StyledComponents/Navbar';

describe('Navbar Component', () => {
    test('Page has a Navbar', () => {
        const { getByRole } = render(<NavBar />);
        const navbarElement = getByRole('navigation');
        expect(navbarElement).toBeInTheDocument();
    })
})