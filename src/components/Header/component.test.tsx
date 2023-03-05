import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './component';

test('renders page title', () => {
  render(<Header />);
  const titleElement = screen.getByText(
    new RegExp(`${process.env.REACT_APP_TITLE}`),
  );
  expect(titleElement).toBeInTheDocument();
});
