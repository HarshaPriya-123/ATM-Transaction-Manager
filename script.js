let balance = 10000;
let pin = "1234";
let attempts = 3;
let transactions = [];
let enteredPin = "";
let blocked = false;

/* ---------- PIN HANDLING ---------- */
function enterDigit(d){ 
  if(blocked || enteredPin.length >= 4) return;
  enteredPin += d; 
  updatePinDisplay(); 
}
function clearPin(){ 
  if(blocked) return;
  enteredPin = ""; 
  updatePinDisplay(); 
}
function updatePinDisplay(){
  let display = "";
  for(let i = 0; i < 4; i++){
    display += i < enteredPin.length ? "*" : "_";
  }
  document.getElementById("pin-display").innerText = display;
}
function login(){
  if(blocked) return;
  if(enteredPin === pin){
    document.getElementById("login").style.display = "none";
    document.getElementById("menu").style.display = "block";
    enteredPin = ""; 
    updatePinDisplay();
    document.getElementById("loginMsg").innerText = "";
  } else {
    attempts--;
    document.getElementById("loginMsg").innerText = "Incorrect PIN. Attempts left: " + attempts;
    enteredPin = ""; 
    updatePinDisplay();
    if(attempts === 0){ 
      document.getElementById("loginMsg").innerText = "Card Blocked"; 
      blocked = true; 
    }
  }
}

/* ---------- KEYBOARD SUPPORT ---------- */
document.addEventListener("keydown", function(e){
  const loginVisible = document.getElementById("login").style.display !== "none";
  if(loginVisible && !blocked){
    if(e.key >= '0' && e.key <= '9') enterDigit(e.key);
    else if(e.key === "Backspace") enteredPin = enteredPin.slice(0, -1);
    else if(e.key === "Enter") login();
    updatePinDisplay();
  }
});

/* ---------- TRANSACTIONS ---------- */
function deposit(){
  let amt = prompt("Enter deposit amount");
  if(amt && !isNaN(amt)){
    amt = Number(amt);
    balance += amt;
    transactions.push("Deposit : Rs. " + amt);
    document.getElementById("output").innerText = "Deposit successful: Rs. " + amt + "\nBalance: Rs. " + balance;
  }
}
function withdraw(){
  let amt = prompt("Enter withdraw amount");
  if(amt && !isNaN(amt)){
    amt = Number(amt);
    if(amt <= balance){
      balance -= amt;
      transactions.push("Withdraw : Rs. " + amt);
      document.getElementById("output").innerText = "Withdrawal successful: Rs. " + amt + "\nBalance: Rs. " + balance;
    } else {
      document.getElementById("output").innerText = "Insufficient balance for Rs. " + amt;
    }
  }
}
function checkBalance(){
  document.getElementById("output").innerText = "Balance : Rs. " + balance;
}
function history(){
  document.getElementById("output").innerText = transactions.length > 0 ? transactions.join(" | ") : "No transactions yet";
}

/* ---------- RECEIPT ---------- */
function printReceipt(){
  let text = "🏧 ATM TRANSACTION RECEIPT\n";
  text += "--------------------------\n";
  text += transactions.length > 0 ? transactions.join("\n") : "No transactions";
  text += "\n--------------------------\nBalance : Rs. " + balance + "\nThank you for banking...";
  
  document.getElementById("receiptText").innerText = text;
  document.getElementById("receiptModal").style.display = "block";
}
document.getElementById("closeReceipt").onclick = function(){ 
  document.getElementById("receiptModal").style.display = "none"; 
}

/* ---------- EXIT ---------- */
function exitATM(){
  document.getElementById("menu").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("output").innerText = "";
  document.getElementById("loginMsg").innerText = "";
  enteredPin = "";
  attempts = 3;
  blocked = false;
  updatePinDisplay();
}