import ShoppingListItem from './ShoppingListItem.jsx';
import ShoppingListItemForm from './ShoppingListItemForm.jsx';

export default function ShoppingList({
  shoppingList,
  onCreateShoppingItem,
  onUpdateShoppingItem,
  onDeleteShoppingItem,
}) {
  return <div>
    <div data-testid={`shopping-list-name-${shoppingList.id}`}>
      {shoppingList.name}
    </div>
    <ShoppingListItemForm id="new-shopping-item" onSubmit={(shoppingItem) => {
      onCreateShoppingItem(shoppingList.id, shoppingItem);
    }} />
    <ol data-testid={`shopping-list-${shoppingList.id}`}>
      {
        shoppingList.shoppingItems.map((shoppingItem) => {
          return <li key={shoppingItem.id}>
            <ShoppingListItem
              onUpdateShoppingItem={onUpdateShoppingItem}
              onDeleteShoppingItem={onDeleteShoppingItem}
              shoppingItem={shoppingItem}
            />
          </li>;
        })
      }
    </ol>
  </div>;
}
