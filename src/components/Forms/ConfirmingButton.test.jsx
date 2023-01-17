import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import ConfirmingButton from './ConfirmingButton.jsx';

describe('ConfirmingButton', () => {

  it('displays the children provided', () => {
    render(
      <ConfirmingButton>
        <span data-testid={'child'}>hi</span>
      </ConfirmingButton>
    );
    expect(screen.queryByTestId('child')).not.toBe(null);
  });

  it('reveals confirmation buttons when clicked', () => {
    render(
      <ConfirmingButton id="1"> hi </ConfirmingButton>
    );
    fireEvent.click(screen.getByTestId('confirm-initiate-button-1'));
    expect(screen.queryByTestId('confirm-confirmation-button-1'))
      .not.toBe(null);
    expect(screen.queryByTestId('confirm-deny-button-1')).not.toBe(null);
  });

  it('shows a confirmation message when clicked', () => {
    render(
      <ConfirmingButton
        id="1"
        message="Are you sure you wish to destroy the universe?"
      >
        destroy universe
      </ConfirmingButton>
    );
    fireEvent.click(screen.getByTestId('confirm-initiate-button-1'));
    expect(screen.queryByTestId('confirm-message-1').textContent)
      .toBe('Are you sure you wish to destroy the universe?');
  });

  it('reveals confirmation buttons when clicked', () => {
    render(
      <ConfirmingButton id="1"> hi </ConfirmingButton>
    );
    fireEvent.click(screen.getByTestId('confirm-initiate-button-1'));
    expect(screen.queryByTestId('confirm-confirmation-button-1'))
      .not.toBe(null);
    expect(screen.queryByTestId('confirm-deny-button-1')).not.toBe(null);
  });

  it('hides confirmation buttons when denied', () => {
    render(
      <ConfirmingButton id="1"> hi </ConfirmingButton>
    );
    fireEvent.click(screen.getByTestId('confirm-initiate-button-1'));
    fireEvent.click(screen.getByTestId('confirm-deny-button-1'));
    expect(screen.queryByTestId('confirm-confirmation-button-1')).toBe(null);
    expect(screen.queryByTestId('confirm-deny-button-1')).toBe(null);
  });

  it('fires an onConfirm event with the id when confirmed', () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmingButton id="1" onConfirm={onConfirm}> hi </ConfirmingButton>
    );
    fireEvent.click(screen.getByTestId('confirm-initiate-button-1'));
    fireEvent.click(screen.getByTestId('confirm-confirmation-button-1'));
    expect(onConfirm).toHaveBeenCalledWith('1');
  });

});
