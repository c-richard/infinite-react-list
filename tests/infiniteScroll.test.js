import React from 'react';
import { act, render, screen } from '@testing-library/react';

import InfiniteList from '../src/InfiniteList';

describe('Infinite List', () => {
  it('renders without exploding', () => {
    act(() => {
      render(<InfiniteList />);
    });

    expect(screen.getByTestId('infinite-list')).toBeInTheDocument();
  });
});
