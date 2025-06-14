// src/components/__tests__/Home_Integration.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';
import axios from '../../utils/axios';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// 1) Mock axios
jest.mock('../../utils/axios');

// 2) Stub all child components
jest.mock('../partials/Sidenav',        () => () => <div data-testid="sidenav" />);
jest.mock('../partials/Topnav',         () => () => <div data-testid="topnav" />);
jest.mock('../partials/Header',         () => ({ data }) => <div data-testid="header">{data.title}</div>);
jest.mock('../partials/HorizontalCards',() => ({ data }) => <div data-testid="cards">{data.map(i => i.title).join(',')}</div>);
jest.mock('../partials/Dropdown',       () => ({ func }) => (
  <select data-testid="dropdown" defaultValue="all" onChange={func}>
    <option value="all">all</option>
    <option value="movie">movie</option>
    <option value="tv">tv</option>
  </select>
));
jest.mock('../Loading',                () => () => <div>loading…</div>);

describe('Home integration (stubbed children)', () => {
  const mockWallpaper = { id: 1, title: 'Header Movie', media_type: 'movie' };
  const mockTrendingAll = [
    { id: 2, title: 'A' },
    { id: 3, title: 'B' },
  ];
  const mockTrendingMovie = [
    { id: 4, title: 'M1' },
    { id: 5, title: 'M2' },
  ];

  beforeEach(() => {
    let allCallCount = 0;
    axios.get.mockImplementation((url) => {
      if (url === '/trending/all/day') {
        allCallCount += 1;
        // 1st call → initial trending
        if (allCallCount === 1) {
          return Promise.resolve({ data: { results: mockTrendingAll } });
        }
        // 2nd call → header data
        return Promise.resolve({ data: { results: [mockWallpaper] } });
      }
      if (url === '/trending/movie/day') {
        return Promise.resolve({ data: { results: mockTrendingMovie } });
      }
      // Fallback (e.g. /trending/tv/day)
      return Promise.resolve({ data: { results: mockTrendingAll } });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading, then header + initial trending', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // 1) Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // 2) Wait for initial cards stub to render "A,B"
    const cards = await screen.findByTestId('cards');
    expect(cards).toHaveTextContent('A,B');

    // 3) Header stub should render "Header Movie"
    const header = screen.getByTestId('header');
    expect(header).toHaveTextContent('Header Movie');
  });

  it('updates trending after selecting "movie"', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait initial cards
    await screen.findByTestId('cards');

    // Change dropdown
    fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'movie' } });

    // Now cards stub should render "M1,M2"
    const movieCards = await screen.findByTestId('cards');
    expect(movieCards).toHaveTextContent('M1,M2');
  });
});
