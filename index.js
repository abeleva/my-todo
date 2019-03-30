// Import stylesheets
import './style.css';

// Объявляем переменные
const field = document.getElementById('field');
const button = document.getElementById('button');
const list = document.getElementById('list');
const listArray = [];

// Тут записываем значение инпута в массив
function collectItem(arr) {

  if (!field.value) {
    return false;
  } else arr.push(field.value); // Тут надо универсальнее как-то?
    return arr;

}

// А тут новый элемент списка создадим и добавим
function addItem(arr) {
  let newItem = document.createElement('li');
  newItem.innerHTML = arr[arr.length - 1];
  list.appendChild(newItem);
}

// Создание элемента списка
function createListItem(arr) {
  if (collectItem(arr)) { // Если вернет false не новый элемент не добавится
    addItem(arr); // Добавляем новый элемент
  }
}

// Это нужно объединить? Нужно вообще по-другому?
button.addEventListener('click', function(){
  createListItem(listArray);
});

field.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        createListItem(listArray);
    }
});
