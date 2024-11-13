import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyListItem from './CompanyListItem';

describe('CompanyListItem Component', () => {
  const company = { id: 1, name: 'Company A' };
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the company name and checkbox correctly', () => {
    render(<CompanyListItem company={company} selected={false} onSelect={mockOnSelect} />);

    const companyName = screen.getByText('Company A');
    expect(companyName).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox reflects the "selected" state', () => {
    render(<CompanyListItem company={company} selected={true} onSelect={mockOnSelect} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('invokes "onSelect" callback with company id when checkbox is clicked', () => {
    render(<CompanyListItem company={company} selected={false} onSelect={mockOnSelect} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnSelect).toHaveBeenCalledWith(company.id);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
