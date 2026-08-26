import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from '@/app/(dashboard)/dashboard/page';

// Mock the hooks
vi.mock('@/hooks/useWallet', () => ({
  useWallet: vi.fn()
}));
vi.mock('@/hooks/useGroups', () => ({
  useGroups: vi.fn()
}));
vi.mock('@/hooks/usePayments', () => ({
  usePayments: vi.fn()
}));

import { useWallet } from '@/hooks/useWallet';
import { useGroups } from '@/hooks/useGroups';
import { usePayments } from '@/hooks/usePayments';

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading states for all widgets', () => {
    vi.mocked(useWallet).mockReturnValue({ isLoading: true, data: null, error: null });
    vi.mocked(useGroups).mockReturnValue({ isLoading: true, data: null, error: null });
    vi.mocked(usePayments).mockReturnValue({ isLoading: true, data: null, error: null });

    const { container } = render(<Dashboard />);
    // Since each widget uses animate-pulse when loading
    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBeGreaterThan(0);
  });

  it('renders widgets with data correctly', () => {
    vi.mocked(useWallet).mockReturnValue({
      data: { balance: 1000, currency: 'USDC', trendPercentage: 1 },
      isLoading: false,
      error: null
    });
    vi.mocked(useGroups).mockReturnValue({
      data: [{ id: '1', name: 'Mock Group', tag: 'TAG', saved: 10, target: 100, nextDate: 'Date', avatars: [] }],
      isLoading: false,
      error: null
    });
    vi.mocked(usePayments).mockReturnValue({
      data: [{ id: '1', type: 'deposit', title: 'Mock Tx', date: 'Date', time: 'Time', amount: 50, currency: 'USDC', status: 'OK' }],
      isLoading: false,
      error: null
    });

    render(<Dashboard />);
    
    expect(screen.getByText('1,000.00')).toBeInTheDocument();
    expect(screen.getByText('Mock Group')).toBeInTheDocument();
    expect(screen.getByText('Mock Tx')).toBeInTheDocument();
  });

  it('renders error boundaries', () => {
    vi.mocked(useWallet).mockReturnValue({ error: new Error('Error'), isLoading: false, data: null });
    vi.mocked(useGroups).mockReturnValue({ error: new Error('Error'), isLoading: false, data: null });
    vi.mocked(usePayments).mockReturnValue({ error: new Error('Error'), isLoading: false, data: null });

    render(<Dashboard />);
    
    expect(screen.getByText('Error loading wallet data')).toBeInTheDocument();
    expect(screen.getByText('Error loading savings groups')).toBeInTheDocument();
    expect(screen.getByText('Error loading transactions')).toBeInTheDocument();
  });
});
