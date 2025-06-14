// src/components/__tests__/Topnav.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Topnav from '../partials/Topnav';
import axios from '../../utils/axios';
import useDebounce from '../../hooks/useDebounce';
import '@testing-library/jest-dom'

jest.mock('../../utils/axios');
jest.mock('../../hooks/useDebounce');

describe('Topnav Component', () => {
  beforeEach(() => {
    // make debouncedQuery === query immediately
    useDebounce.mockImplementation(value => value);
    axios.get.mockClear();
  });

  it('initially renders just the input, no results', () => {
    render(
      <MemoryRouter>
        <Topnav />
      </MemoryRouter>
    );
    // no search links at start
    expect(screen.queryByRole('link')).toBeNull();
    // input is there
    expect(screen.getByPlaceholderText(/search anything/i)).toBeInTheDocument();
  });

  it('fetches and displays results when typing', async () => {
    const mockResults = [
      { id: 1, title: 'Movie 1', backdrop_path: 'path1.jpg', media_type: 'movie' },
      { id: 2, name: 'Person A', profile_path: 'path2.jpg', media_type: 'person' },
    ];
    axios.get.mockResolvedValueOnce({ data: { results: mockResults } });

    render(
      <MemoryRouter>
        <Topnav />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search anything/i);
    fireEvent.change(input, { target: { value: 'hello' } });

    // wait for the API call
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/search/multi?query=hello');
    });

    // each result yields a Link with the right href and label
    for (const item of mockResults) {
      const link = screen.getByRole('link', { name: item.title || item.name });
      expect(link).toHaveAttribute('href', `/${item.media_type}/details/${item.id}`);
      // img src built correctly
      const img = link.querySelector('img');
      expect(img).toHaveAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}`
      );
    }
  });

  it('shows the clear icon after typing and clears everything when clicked', async () => {
    const mockResults = [
      { id: 42, title: 'Answer Movie', backdrop_path: 'ans.jpg', media_type: 'movie' }
    ];
    axios.get.mockResolvedValueOnce({ data: { results: mockResults } });

    render(
      <MemoryRouter>
        <Topnav />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search anything/i);
    fireEvent.change(input, { target: { value: 'abc' } });

    // wait for link to appear
    await waitFor(() => screen.getByRole('link', { name: 'Answer Movie' }));

    // clear icon is the <i> with class "ri-close-fill"
    const clearIcon = document.querySelector('.ri-close-fill');
    expect(clearIcon).toBeInTheDocument();

    fireEvent.click(clearIcon);
    // input cleared
    expect(input.value).toBe('');
    // no more results
    expect(screen.queryByRole('link')).toBeNull();
  });
});
