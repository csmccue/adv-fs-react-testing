import ShoppingList from './ShoppingList.jsx';
import ShoppingListForm from './ShoppingListForm.jsx';

export default function ShoppingLists({
  onCreateShoppingList,
  onCreateShoppingItem,
  onUpdateShoppingItem,
  onDeleteShoppingItem,
  shoppingLists,
}) {
  return <div>
    <ShoppingListForm id="new" onSubmit={onCreateShoppingList} />
    <ol data-testid="shopping-lists">
      {shoppingLists.map(shoppingList => {
        return <li key={shoppingList.id}>
          <ShoppingList
            onCreateShoppingItem={onCreateShoppingItem}
            onUpdateShoppingItem={onUpdateShoppingItem}
            onDeleteShoppingItem={onDeleteShoppingItem}
            shoppingList={shoppingList}
          />
        </li>;
      })}
    </ol>
  </div>;
}
