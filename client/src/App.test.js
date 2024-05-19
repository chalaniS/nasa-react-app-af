import { render, screen } from '@testing-library/react';
import App from './App';
import ImageDetails from './pages/ImageDetails.js';

test('renders app title', () => {
  render(<ImageDetails />);
  // const appTitle = screen.getByText(/My React App/i);
  // expect(appTitle).toBeInTheDocument();
});
