import { fireEvent, render, screen } from '@testing-library/react';
import ShoppingListItemForm from './ShoppingListItemForm';
import ShoppingLists from './ShoppingLists';

describe ('ShoppingListItemForm', () => {

  // test 1 - render submit button on page  
  it('renders submit button', () => {
    render(
      <ShoppingListItemForm id="new"/>
    );
    const submitButton = screen.queryByTestId('submit-button');
    expect(submitButton).not.toBe(null);

  });

  // test 2 - typing in submit form works properly
  it('user can type in submit form', () => {
    const testFunction = jest.fn();
    render(
      <ShoppingListItemForm id="new" onBodyChanged={testFunction}/>
    );
    const textarea = screen.getByTestId('x');
    fireEvent.change(textarea, { target: { value: 'eggs' } });
    expect(textarea.value).toBe('eggs');
  });

  // // test 3 - users can see database data
  // it('user can see database', () => {
  //   render(
  //     <ShoppingLists />
  //   );

  // });


}

);
