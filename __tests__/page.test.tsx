import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/components/CompanyList', () => () => <div data-testid="company-list">Company List Component</div>);

describe('Home Page', () => {
  it('renders with a heading and CompanyList is lazy-loaded', async () => {
    const Page = require('@/app/page').default;

    render(<Page />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    expect(screen.getByText('Loading company list...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading company list...')).not.toBeInTheDocument();
      expect(screen.getByTestId('company-list')).toBeInTheDocument();
    });
  });
});
