import { client, checkError } from './client.js';
import { getShoppingListItemsByShoppingListId } from './shopping-list-items.js';

const listWithListItems = async (list) => {
  const shoppingItems = await getShoppingListItemsByShoppingListId(list);
  return {
    ...list,
    shoppingItems,
  };
};

export async function getShoppingLists() {
  // We were using this earlier to select shopping list items:
  // shopping-items:anon-shopping-list-items!left ( * )
  // However it includes _all_ items for every list, which is not what we
  // want. Scoping appears to be something not directly supported by supabase,
  // so just do an n+1 query for now.
  const response = await client
    .from('anon-shopping-lists')
    .select('*')
    .order('created_at', { ascending: false })
  ;
  const rawLists = checkError(response);
  const lists = await Promise.all(rawLists.map(listWithListItems));
  return lists;
}

export async function createShoppingList(shoppingList) {
  const response = await client
    .from('anon-shopping-lists')
    .insert(shoppingList)
    .select()
  ;
  return checkError(response);
}

export async function updateShoppingList(shoppingList) {
  const response = await client
    .from('anon-shopping-lists')
    .update(shoppingList)
    .eq('id', shoppingList.id)
  ;
  return checkError(response);
}

export async function deleteShoppingList(shoppingListId) {
  const response = await client
    .from('anon-shopping-lists')
    .delete()
    .eq('id', shoppingListId)
  ;
  return checkError(response);
}
