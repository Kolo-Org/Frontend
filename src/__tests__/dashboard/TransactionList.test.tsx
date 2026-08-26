import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TransactionList } from '@/components/dashboard/TransactionList';

describe('TransactionList', () => {
  it('renders loading state correctly', () => {
    const { container } = render(<TransactionList transactions={[]} isLoading={true} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders transactions correctly', () => {
    const mockTransactions = [
      {
        id: '1',
        type: 'deposit' as const,
        title: 'Deposit from WhatsApp Pay',
        date: 'Oct 21, 2023',
        time: '2:30 PM',
        amount: 250,
        currency: 'USDC',
        status: 'Completed',
      },
      {
        id: '2',
        type: 'contribution' as const,
        title: 'Home Fund Contribution',
        date: 'Oct 19, 2023',
        time: '9:15 AM',
        amount: -100,
        currency: 'USDC',
        status: 'Completed',
      }
    ];

    render(<TransactionList transactions={mockTransactions} isLoading={false} />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Deposit from WhatsApp Pay')).toBeInTheDocument();
    expect(screen.getByText('+250.00 USDC')).toBeInTheDocument();
    
    expect(screen.getByText('Home Fund Contribution')).toBeInTheDocument();
    expect(screen.getByText('-100.00 USDC')).toBeInTheDocument();
    
    expect(screen.getByText('Download Statement')).toBeInTheDocument();
  });
});
