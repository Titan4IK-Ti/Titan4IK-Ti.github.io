// Получаем элементы формы и списка сообщений
var nameInput = document.getElementById('nameInput');
var messageInput = document.getElementById('messageInput');
var sendButton = document.getElementById('sendButton');
var messagesList = document.getElementById('messages');

// Отправляем сообщение на сервер при нажатии кнопки "Отправить"
sendButton.addEventListener('click', function() {
	// Получаем имя и сообщение из формы
	var name = nameInput.value.trim();
	var message = messageInput.value.trim();

	// Если имя или сообщение не введены, то ничего не делаем
	if (!name || !message) {
		return;
	}

	// Создаем новое сообщение
	var newMessage = {
		name: name,
		message: message,
		timestamp: new Date().getTime()
	};

	// Отправляем новое сообщение на сервер
	sendMessage(newMessage);

	// Очищаем поле ввода сообщения
	messageInput.value = '';
});

// Получаем список сообщений при загрузке страницы
getMessages();

// Функция для отправки сообщения на сервер
function sendMessage(message) {
	// Создаем новый элемент списка сообщений
	var messageItem = document.createElement('div');
	messageItem.innerText = message.name + ': ' + message.message;
	messagesList.appendChild(messageItem);

	// Создаем новый XMLHttpRequest-объект
	var xhr = new XMLHttpRequest();

	// Отправляем POST-запрос на сервер с данными сообщения
	xhr.open('POST', 'https://example.com/sendmessage');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(message));
}

// Функция для получения списка сообщений с сервера
function getMessages() {
	// Создаем новый XMLHttpRequest-объект
	var xhr = new XMLHttpRequest();

	// Отправляем GET-запрос на сервер для получения списка сообщений
	xhr.open('GET', 'https://example.com/getmessages');
	xhr.onload = function() {
		// Если запрос успешен, то выводим список сообщений
		if (xhr.status === 200) {
			var messages = JSON.parse(xhr.responseText);

			// Очищаем список сообщений перед выводом новых сообщений
			messagesList.innerHTML = '';

			// Выводим список сообщений на страницу
			messages.forEach(function(message) {
				var messageItem = document.createElement('div');
				messageItem.innerText = message.name + ': ' + message.message;
				messagesList.appendChild(messageItem);
			});
		}
	};
	xhr.send();
}

// Обновляем список сообщений каждые 5 секунд
setInterval(getMessages, 5000);