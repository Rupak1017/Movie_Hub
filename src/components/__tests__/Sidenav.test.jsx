// Sidenav.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';  // Wrap the component with Router to handle links
import Sidenav from '../partials/Sidenav';
import '@testing-library/jest-dom'
describe('Sidenav Component', () => {

  // Test if MovieHub heading is rendered
  test('renders MovieHub heading', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );
    
    const headingElement = screen.getByText(/MovieHub/i);
    expect(headingElement).toBeInTheDocument(); // Check if the heading is rendered
  });

  // Test if the New Feeds section is rendered
  test('renders New Feeds section', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );
    
    const newFeedsSection = screen.getByText(/New Feeds/i);
    expect(newFeedsSection).toBeInTheDocument(); // Check if "New Feeds" section is rendered
  });

  // Test if the 'Trending' link is rendered
  test('renders Trending link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const trendingLink = screen.getByText(/Trending/i);
    expect(trendingLink).toBeInTheDocument(); // Check if the "Trending" link is rendered
  });

  // Test if the 'Popular' link is rendered
  test('renders Popular link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const popularLink = screen.getByText(/Popular/i);
    expect(popularLink).toBeInTheDocument(); // Check if the "Popular" link is rendered
  });

  // Test if the 'Movies' link is rendered
  test('renders Movies link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const moviesLink = screen.getByText(/Movies/i);
    expect(moviesLink).toBeInTheDocument(); // Check if the "Movies" link is rendered
  });

  // Test if the 'TV Shows' link is rendered
  test('renders TV Shows link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const tvShowsLink = screen.getByText(/TV Shows/i);
    expect(tvShowsLink).toBeInTheDocument(); // Check if the "TV Shows" link is rendered
  });

  // Test if the 'People' link is rendered
  test('renders People link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const peopleLink = screen.getByText(/People/i);
    expect(peopleLink).toBeInTheDocument(); // Check if the "People" link is rendered
  });

  // Test if the Website Information section is rendered
  test('renders Website Information section', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );
    
    const websiteInfoSection = screen.getByText(/Website Information/i);
    expect(websiteInfoSection).toBeInTheDocument(); // Check if "Website Information" section is rendered
  });

  // Test if the 'About' link is rendered
  test('renders About link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument(); // Check if the "About" link is rendered
  });

  // Test if the 'Contact Us' link is rendered
  test('renders Contact Us link', () => {
    render(
      <Router>
        <Sidenav />
      </Router>
    );

    const contactUsLink = screen.getByText(/Contact Us/i);
    expect(contactUsLink).toBeInTheDocument(); // Check if the "Contact Us" link is rendered
  });
});

