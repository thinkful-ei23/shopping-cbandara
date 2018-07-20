'use strict';

const STORE = [
	{name: 'apples',checked:false},
	{name:'oranges',checked:false},
	{name:'milk',checked:true},
	{name:'bread',checked:true}
];
//--------------------------------------------------------
//start Render
//--------------------------------------------------------

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>
    `;
}


function generateListHtml(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join("");
}


function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateListHtml(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}
//-----------------------------------------------------------------------------------
//end render, start submit
//-----------------------------------------------------------------------------------

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
//---------------------------------------------------
//end submit, start check
//---------------------------------------------------

function toggleCheckedForListItem(itemIndex){STORE[itemIndex].checked = !STORE[itemIndex].checked;}

function getItemIndexFromElement(item){
	const itemIndexString=$(item)
			       .closest('.js-item-index-element')
			       .attr('data-item-index');
	return parseInt(itemIndexString,10);
}

function itemCheckClicked(){
	console.log('checking');
	$('.js-shopping-list').on('click','.js-item-toggle', event => {
		const itemIndex=getItemIndexFromElement(event.currentTarget);
		toggleCheckedForListItem(itemIndex);
		renderShoppingList();
	});
}
//-------------------------
//end check, start delete
//-------------------------

function removeFromList(x){
	STORE.splice(x,1);
}

function itemDeleteClicked(){
	console.log('delete');
	$('.js-shopping-list').on('click','.js-item-delete', event => {
		const x = getItemIndexFromElement(event.currentTarget);
		removeFromList(x);
		renderShoppingList();
	});
}

function handleShoppingList(){
	renderShoppingList();
	handleNewItemSubmit();
	itemCheckClicked();
	itemDeleteClicked();
}

/*---------------------------------
end
---------------------------------*/
$(handleShoppingList);
