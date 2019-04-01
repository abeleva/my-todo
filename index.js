// Import stylesheets
import './style.css';

// Объявляем переменные
const form = document.getElementById('form');
const field = document.getElementById('field');
const list = document.getElementById('list');
const listArray = [];

// Добавляем события
form.addEventListener('submit', function(e){
  e.preventDefault();

  const fieldValue = field.value.trim();

  if (!fieldValue) { // Забыла, что тут можно еще добавить
    return;
  }

  listArray.push(field.value);

  addItem(listArray);
});

// А тут новый элемент списка создадим и добавим
function addItem(arr) {
  let newItem = document.createElement('li');
  newItem.innerText = arr.slice(-1);
  list.appendChild(newItem);
}

