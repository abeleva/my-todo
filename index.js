// Import stylesheets
import './style.css';

// Объявляем переменные
const form = document.getElementById('form');
const field = document.getElementById('field');
const dateField = document.getElementById('date-field');
const list = document.getElementById('list');

const button = document.getElementById('button-remove');
const listArray = [];

// Добавляем события

// Добавление элемента списка
form.addEventListener('submit', function(e){
  e.preventDefault();

  const fieldValue = field.value.trim();
  
  if (!fieldValue) { // Забыла, что тут можно еще добавить [&& !fieldValue.length]?
    return;
  }

  listArray.push(field.value);

  addItem(listArray);

  field.value = '';

  filterList();

  
});

// Поиск совпадения
field.addEventListener('input', function(){
  
  filterList();
  
});

// А тут новый элемент списка создадим и добавим
function addItem(arr) {
  const newItem = document.createElement('li');
  const buttonRemove = document.createElement('button');
  const createdDateContainer = document.createElement('div')
  const createdDate = new Date(); 
  const createdYear = createdDate.getFullYear();
  const createdMonth = createdDate.getMonth();
  const createdDay = createdDate.getDate();
  const dateFieldAsDate = dateField.valueAsDate;


  newItem.className = 'list-group-item';
  newItem.innerText = arr.slice(-1);

  list.appendChild(newItem);

  // Добавляем кнопку удаления
  
  buttonRemove.className = 'button-remove';
  buttonRemove.innerText = 'Удалить';

  newItem.appendChild(buttonRemove);

  buttonRemove.addEventListener('click', function(){
    this.closest('.list-group-item').remove();
  });

  // Дата создания
  newItem.appendChild(createdDateContainer);
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
  

  // Добавление оставшегося времени ?? надо в отдельную функцию выносить ??

  const remainingTime = document.createElement('div');
  remainingTime.innerText = getRemainingTime(dateField.valueAsDate);
  remainingTime.className = 'remaining-time'
  newItem.appendChild(remainingTime);
}

// Получить оставшееся время
function getRemainingTime(date) {
    const remainingTimeArray = dhm(date - new Date());
    
    return 'Осталось ' + remainingTimeArray[0] + 'д. ' + remainingTimeArray[1] + 'ч. ' + remainingTimeArray[2] + 'м. ' + remainingTimeArray[3] + 'с. ';
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