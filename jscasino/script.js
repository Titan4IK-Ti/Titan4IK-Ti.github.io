var balance = 0; // начальный баланс
var lastBet = 0; // последняя ставка
var result = "-"; // результат

function chooseColor(color) {
  document.getElementById("result").innerHTML = "-";
  if (color == "red") {
    document.getElementById("red").style.backgroundColor = "red";
    document.getElementById("black").style.backgroundColor = "";
  } else {
    document.getElementById("black").style.backgroundColor = "black";
    document.getElementById("red").style.backgroundColor = "";
  }
}

function placeBet() {
  var bet = parseInt(document.getElementById("bet-input").value);
  if (bet > balance) {
    alert("No money = No casino. Understand?");
    return;
  }
  var color = "";
  if (document.getElementById("red").style.backgroundColor == "red") {
    color = "red";
  } else if (document.getElementById("black").style.backgroundColor == "black") {
    color = "black";
  } else {
    alert("Choose a color");
    return;
  }
  var randomNumber = Math.floor(Math.random() * 2); // случайное число 0 или 1
  if (randomNumber == 0 && color == "black" || randomNumber == 1 && color == "red") {
    balance += bet;
    result = "u won " + (bet * 2) + " coins!";
  } else {
    balance -= bet;
    result = "u lost " + bet + " coins!";
  }
  document.getElementById("balance").innerHTML = balance;
  document.getElementById("last-bet").innerHTML = lastBet;
  document.getElementById("result").innerHTML = result;
  lastBet = bet;
}

function increment() {
  balance += 100;  // увеличиваем значение переменной на 1 при каждом нажатии на кнопку
  document.getElementById("balance").innerHTML = balance; // обновляем значение переменной на странице
}