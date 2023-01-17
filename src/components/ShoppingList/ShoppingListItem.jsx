export default function ShoppingListItem({ item }) {
  return (
    <>
      <div>
        {item.item_name}
        {item.quantity}
        {item.shopping_list_id}
      </div>
    </>

  );
}
