import App from './../containers/App';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import answers from './../../server/constants';

test('show messages', () => {
  const { getByTestId } = render(<App />);
  const submit_form = getByTestId('submit-message');
  const input = getByTestId('input-message');

  fireEvent.change(input, { target: { value: 'سلام' } });
  fireEvent.submit(submit_form);

  expect(screen.getByText('سلام')).toBeInTheDocument();
});

test('prevent empty message', () => {
  const { getByTestId, container, rerender } = render(<App />);
  const input = getByTestId('input-message');

  fireEvent.change(input, { target: { value: '' } });
  fireEvent.submit(input);
  expect(container.firstChild.firstChild.firstChild).toBe(null);

  rerender(<App />);
  fireEvent.change(input, { target: { value: ' ' } });
  fireEvent.submit(input);
  expect(container.firstChild.firstChild.firstChild).toBe(null);
});

test('on start focused input', async () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('input-message');

  expect(input).toHaveFocus();
});

test('check clean message after send', () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('input-message');

  fireEvent.change(input, { target: { value: 'this is a test value' } });
  fireEvent.submit(input);
  expect(input.value).toBe('');
});

test('send correct message for HI', async () => {
  const { getByTestId } = render(<App />);
  const submit_form = getByTestId('submit-message');
  const input = getByTestId('input-message');

  fireEvent.change(input, { target: { value: answers.HI[0] } });
  fireEvent.submit(submit_form);
  await waitFor(() => screen.getByText(answers.HI[1]));
  expect(screen.getByText(answers.HI[1])).toBeInTheDocument();
});

test('send correct message for I_M_OK', async () => {
  const { getByTestId } = render(<App />);
  const submit_form = getByTestId('submit-message');
  const input = getByTestId('input-message');

  fireEvent.change(input, { target: { value: answers.I_M_OK[0] } });
  fireEvent.submit(submit_form);
  await waitFor(() => screen.getByText(answers.I_M_OK[1]));
  expect(screen.getByText(answers.I_M_OK[1])).toBeInTheDocument();
});
