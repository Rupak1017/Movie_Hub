import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../partials/Header'; 
import '@testing-library/jest-dom'

describe('Header Component', () => {
  const mockData = {
    id: 101,
    title: 'Test Movie',
    overview: 'This is a mock overview of the movie that should be shortened.',
    media_type: 'movie',
    release_date: '2025-06-14',
    backdrop_path: '/test-backdrop.jpg',
  };

  test('renders title and overview', () => {
    render(
      <MemoryRouter>
        <Header data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText(/This is a mock overview/i)).toBeInTheDocument();
  });

  test('renders "more" link with correct href', () => {
    render(
      <MemoryRouter>
        <Header data={mockData} />
      </MemoryRouter>
    );

    const moreLink = screen.getByText('more');
    expect(moreLink).toHaveAttribute('href', '/movie/details/101');
  });

test('renders release date and media type', () => {
  render(
    <MemoryRouter>
      <Header data={mockData} />
    </MemoryRouter>
  );

  expect(
    screen.getAllByText((_, el) => el.textContent.includes('2025-06-14')).length
  ).toBeGreaterThan(0);

  expect(
    screen.getAllByText((_, el) => el.textContent.includes('MOVIE')).length
  ).toBeGreaterThan(0);
});


  test('renders trailer link with correct href', () => {
    render(
      <MemoryRouter>
        <Header data={mockData} />
      </MemoryRouter>
    );

    const trailerLink = screen.getByRole('link', { name: /watch trailer/i });
    expect(trailerLink).toHaveAttribute('href', '/movie/details/101/trailer');
  });

  test('renders fallback text if release date is missing', () => {
    const modifiedData = { ...mockData, release_date: '' };

    render(
      <MemoryRouter>
        <Header data={modifiedData} />
      </MemoryRouter>
    );

    const matches = screen.getAllByText((_, element) =>
      element.textContent.includes('No Information')
    );

    expect(matches.length).toBeGreaterThan(0); // ✅ At least one match found
  });
});
