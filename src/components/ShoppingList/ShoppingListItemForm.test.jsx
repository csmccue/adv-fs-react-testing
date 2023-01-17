import { render, screen } from '@testing-library/react';
import ShoppingListItemForm from './ShoppingListItemForm';

describe ('ShoppingListItemForm', () => {

  // test 1 - render submit button on page  
  it('renders submit button', () => {
    render(
      <ShoppingListItemForm id="new"/>
    );

    const submitButton = screen.queryByTestId('submit-button');
    expect(submitButton).not.toBe(null);

  });
}

);
