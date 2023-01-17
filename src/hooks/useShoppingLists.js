import { getShoppingLists } from '../services/shopping-lists.js';
import { useState, useEffect } from 'react';
import { createShoppingList } from '../services/shopping-lists.js';
import {
  createShoppingListItem,
  updateShoppingListItem,
} from '../services/shopping-list-items.js';

export default function useShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState([]);

  const fetchShoppingLists = async () => {
    const shoppingLists = await getShoppingLists();
    setShoppingLists(shoppingLists);
  };

  const onCreateShoppingList = async (shoppingList) => {
    const dbFriendlyShoppingList = { ...shoppingList };
    delete dbFriendlyShoppingList.id;
    delete dbFriendlyShoppingList.shoppingItems;
    const newShoppingLists = await createShoppingList(dbFriendlyShoppingList);
    const newShoppingList = newShoppingLists[0];
    newShoppingList.shoppingItems = [];
    setShoppingLists([newShoppingList].concat(shoppingLists));
  };

  const onCreateShoppingItem = async (shoppingListId, shoppingListItem) => {
    const dbFriendlyShoppingListItem = {
      ...shoppingListItem,
      shopping_list_id: shoppingListId,
    };
    delete dbFriendlyShoppingListItem.id;
    const newItems = await createShoppingListItem(dbFriendlyShoppingListItem);
    const item = newItems[0];
    const newLists = [...shoppingLists];
    const index = newLists.findIndex(list => list.id === item.shopping_list_id);
    newLists[index].shoppingItems.unshift(item);
    setShoppingLists(newLists);
  };

  // Oof. Maybe we should revisit immutability requirements with useState. Are
  // they actually required?
  const onUpdateShoppingItem = async (shoppingListItem) => {
    await updateShoppingListItem(shoppingListItem);
    const newLists = [...shoppingLists];
    const listIndex = newLists.findIndex(list => {
      return list.id === shoppingListItem.shopping_list_id;
    });
    const newList = newLists[listIndex];
    const itemIndex = newList.shoppingItems.findIndex(item => {
      return item.id === shoppingListItem.id;
    });
    const newItems = [...newList.shoppingItems];
    newItems[itemIndex] = shoppingListItem;
    newLists[listIndex] = {
      ...newList,
      shoppingItems: newItems,
    };
    setShoppingLists(newLists);
  };

  const onDeleteShoppingItem = async (shoppingListItem) => {
    await updateShoppingListItem(shoppingListItem);
    const newLists = [...shoppingLists];
    const listIndex = newLists.findIndex(list => {
      return list.id === shoppingListItem.shopping_list_id;
    });
    const newList = newLists[listIndex];
    const itemIndex = newList.shoppingItems.findIndex(item => {
      return item.id === shoppingListItem.id;
    });
    const newItems = [...newList.shoppingItems];
    delete newItems[itemIndex];
    newLists[listIndex] = {
      ...newList,
      shoppingItems: newItems,
    };
    setShoppingLists(newLists);
  };

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  return {
    shoppingLists,
    onCreateShoppingList,
    onCreateShoppingItem,
    onUpdateShoppingItem,
    onDeleteShoppingItem,
  };
}
