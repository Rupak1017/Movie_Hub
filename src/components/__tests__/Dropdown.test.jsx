import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../partials/Dropdown'; // Adjust the path based on your folder
import '@testing-library/jest-dom'

describe('Dropdown Component', () => {
  const mockOptions = ['option1', 'option2', 'option3'];
  const mockFunc = jest.fn();

  test('renders dropdown with title and options', () => {
    render(<Dropdown title="Select an option" options={mockOptions} func={mockFunc} />);
    
    // Title as default disabled option
    expect(screen.getByRole('option', { name: 'Select an option' })).toBeDisabled();

    // All options rendered (toUpperCase)
    mockOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.toUpperCase() })).toBeInTheDocument();
    });

    // Select element is present
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('calls function on selection change', () => {
    render(<Dropdown title="Choose" options={mockOptions} func={mockFunc} />);

    const select = screen.getByRole('combobox');
    
    // Change to second option
    fireEvent.change(select, { target: { value: mockOptions[1] } });
    
    // Handler should be called
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test('default option is selected initially and disabled', () => {
    render(<Dropdown title="Pick one" options={mockOptions} func={mockFunc} />);
    
    const defaultOption = screen.getByRole('option', { name: 'Pick one' });
    expect(defaultOption).toBeDisabled();

    const select = screen.getByRole('combobox');
    expect(select.value).toBe('0');
  });
});
