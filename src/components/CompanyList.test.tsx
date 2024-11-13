import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompanyList from './CompanyList';
import { fetchCompanies, mockDeleteRequest } from '@/utils/api';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';

// Mock necessary dependencies
jest.mock('@/utils/api');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('CompanyList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchCompanies as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Company A' },
      { id: 2, name: 'Company B' },
    ]);
    (mockDeleteRequest as jest.Mock).mockResolvedValue({ message: 'success' });
  });

  test('renders and fetches companies initially', async () => {
    render(<CompanyList />);

    const companies = await waitFor(() => screen.getAllByRole('listitem'));
    expect(companies).toHaveLength(2);

    expect(fetchCompanies).toHaveBeenCalledWith(1);
    expect(fetchCompanies).toHaveBeenCalledTimes(1);
  });

  test('handles company selection', async () => {
    render(<CompanyList />);

    const checkbox = await screen.findByRole('checkbox', { name: 'Select Company A' });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('handles deletion of selected companies', async () => {
    render(<CompanyList />);

    const checkbox = await screen.findByRole('checkbox', { name: 'Select Company A' });
    fireEvent.click(checkbox);

    const deleteButton = screen.getByRole('button', { name: /Delete Selected/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteRequest).toHaveBeenCalledWith(new Set([1])));
    expect(toast.success).toHaveBeenCalledWith('Companies deleted successfully!');
  });

  test('handles load more companies', async () => {
    // Set up mock to handle loading additional companies
    (fetchCompanies as jest.Mock)
      .mockResolvedValueOnce([
        { id: 1, name: 'Company A' },
        { id: 2, name: 'Company B' },
      ])
      .mockResolvedValueOnce([
        { id: 3, name: 'Company C' },
        { id: 4, name: 'Company D' },
      ]);

    render(<CompanyList />);

    // Make sure initial load completes
    await waitFor(() => screen.getByText(/Company B/));

    fireEvent.scroll(window, { target: { scrollY: 1000 } }); // Simulate scrolling

    await waitFor(() => {
      const additionalCompanies = screen.getAllByRole('listitem');
      expect(additionalCompanies).toHaveLength(4);
    });

    expect(fetchCompanies).toHaveBeenCalledWith(2);
  });

  test('shows toast on fetch error', async () => {
    (fetchCompanies as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<CompanyList />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching companies.');
    });
  });
});
