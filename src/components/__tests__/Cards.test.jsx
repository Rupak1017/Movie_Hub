import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cards from '../partials/Cards';
import '@testing-library/jest-dom'

describe('Cards Component', () => {
  test('renders without crashing (empty data)', () => {
    render(
      <MemoryRouter>
        <Cards data={[]} title="movie" />
      </MemoryRouter>
    );
    // Expect no crash, no items
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('renders one card with title and vote average', () => {
    const mockData = [
      {
        id: 1,
        title: 'Test Movie',
        poster_path: '/poster.jpg',
        vote_average: 8.5,
        media_type: 'movie',
      },
    ];

    render(
      <MemoryRouter>
        <Cards data={mockData} title="fallback" />
      </MemoryRouter>
    );

    // Title should appear
    expect(screen.getByText('Test Movie')).toBeInTheDocument();

    // Vote average (85%) appears, using textContent matcher
    expect(
      screen.getByText((_, element) => element.textContent === '85%')
    ).toBeInTheDocument();

    // Link should have correct href
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/details/1');
  });

  test('renders fallback image when no image path is available', () => {
    const mockData = [
      {
        id: 2,
        title: 'No Image Movie',
        media_type: 'movie',
      },
    ];

    render(
      <MemoryRouter>
        <Cards data={mockData} title="movie" />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/noimage.webp');
  });

  test('uses fallback "title" prop when media_type is missing', () => {
    const mockData = [
      {
        id: 3,
        title: 'Fallback Media Type',
      },
    ];

    render(
      <MemoryRouter>
        <Cards data={mockData} title="custom" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/custom/details/3');
    expect(screen.getByText('Fallback Media Type')).toBeInTheDocument();
  });

  test('displays name instead of title when available', () => {
    const mockData = [
      {
        id: 4,
        name: 'Person Name',
        profile_path: '/profile.jpg',
        media_type: 'person',
      },
    ];

    render(
      <MemoryRouter>
        <Cards data={mockData} title="fallback" />
      </MemoryRouter>
    );

    expect(screen.getByText('Person Name')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/person/details/4');
  });
});
