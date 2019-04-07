"use strict";
// Import stylesheets
import './style.css';

// Объявляем переменные
const form = document.getElementById('form');
const field = document.getElementById('field');
const dateField = document.getElementById('date-field');
const list = document.getElementById('list');

const button = document.getElementById('button-remove');
const listArray = [];
const itemObj = {};

// Добавляем события

// Добавление элемента списка
form.addEventListener('submit', function(e){
  e.preventDefault();

  const fieldValue = field.value.trim();
  
  if (!fieldValue) { // Забыла, что тут можно еще добавить [&& !fieldValue.length]?
    return;
  }

  itemObj.text = fieldValue;
  itemObj.createdDate = new Date();
  itemObj.expiredDate = dateField.valueAsDate;

  listArray.push(itemObj);

  addItem(listArray.slice(-1)[0]);

  // Очищение полей
  field.value = '';
  dateField.value = '';

  // Фильтр
  filterList();
});

// Поиск совпадения
field.addEventListener('input', function(){
  
  filterList();
  
});


// Проверка на актуальность
const tm = setInterval(function() {
  console.log(1);

  for (let i = 0; i < listArray.length; i++) {
    if (listArray[i].expiredDate - new Date() < 24*60*60*1000) { 
      list.children[i].style.background = 'red';  
    }
  }
}, 1000);


// А тут новый элемент списка создадим и добавим
function addItem(object) {
  const newItem = document.createElement('li');
  const buttonRemove = document.createElement('button');
  const createdDateContainer = document.createElement('div')
  const remainingTime = document.createElement('div');
  const createdDate = object.createdDate; 
  const createdYear = createdDate.getFullYear();
  const createdMonth = createdDate.getMonth();
  const createdDay = createdDate.getDate();
  const dateFieldAsDate = dateField.valueAsDate;


  newItem.className = 'list-group-item';
  newItem.innerText = object.text;

  list.appendChild(newItem);

  // Добавляем кнопку удаления
  buttonRemove.addEventListener('click', function(){
    this.closest('.list-group-item').remove();
  });
  buttonRemove.className = 'button-remove';
  buttonRemove.innerText = 'Удалить';
  newItem.appendChild(buttonRemove);

  // Дата создания ?? надо в отдельную функцию выносить ??
  if (createdDay < 10) {
    createdDay = '0' + createdDay;
  }
  createdMonth = createdMonth + 1;
  if (createdMonth < 10) {
    createdMonth = '0' + createdMonth;
  }
  const dateText = 'Создано: ' + createdDay + '.' + createdMonth + '.' + createdYear;
  createdDateContainer.innerText = dateText;
  createdDateContainer.className = 'created-date';
  newItem.appendChild(createdDateContainer);
  

  // Добавление оставшегося времени ?? надо в отдельную функцию выносить ??
  const remainingTimeArray = dhm(itemObj.expiredDate - new Date());
  remainingTime.innerText = 'Осталось ' + remainingTimeArray[0] + 'д. ' + remainingTimeArray[1] + 'ч. ' + remainingTimeArray[2] + 'м. ' + remainingTimeArray[3] + 'с. ';
  remainingTime.className = 'remaining-time' 
  newItem.appendChild(remainingTime);
}


// Filter
function filterList() {
  const listItems = document.querySelectorAll('#list > li'); // ?? почему это тут надо объявлять, а глобально не работает ??

  listItems.forEach(function(item, i){
    const text = listItems[i].innerText.toUpperCase();
    const inputText = field.value.toUpperCase();

    if (text.indexOf(inputText) > -1){
      listItems[i].style.display = '';
    } else {
      listItems[i].style.display = 'none';
    }
  })
}

// Ms to days converter (это из интеренетов)
function dhm(ms){
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms=ms % (24*60*60*1000);
    const hours = Math.floor((daysms)/(60*60*1000));
    const hoursms=ms % (60*60*1000);
    const minutes = Math.floor((hoursms)/(60*1000));
    const minutesms=ms % (60*1000);
    const sec = Math.floor((minutesms)/(1000));
    const remainingTimeArray = [days, hours, minutes, sec];
    return remainingTimeArray;
}