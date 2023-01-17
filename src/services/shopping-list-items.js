import { client, checkError } from './client.js';

export async function getShoppingListItemsByShoppingListId(shoppingList) {
  const response = await client
    .from('anon-shopping-list-items')
    .select('*')
    .eq('shopping_list_id', shoppingList.id)
    .order('created_at', { ascending: false })
  ;
  const shoppingListItems = checkError(response);
  return shoppingListItems;
}

export async function createShoppingListItem(shoppingListItem) {
  const response = await client
    .from('anon-shopping-list-items')
    .insert(shoppingListItem)
    .select()
  ;
  return checkError(response);
}


export async function updateShoppingListItem(shoppingListItem) {
  const response = await client
    .from('anon-shopping-list-items')
    .update(shoppingListItem)
    .eq('id', shoppingListItem.id)
  ;
  return checkError(response);
}

export async function deleteShoppingListItem(shoppingListItemId) {
  const response = await client
    .from('anon-shopping-list-items')
    .delete()
    .eq('id', shoppingListItemId)
  ;
  return checkError(response);
}
