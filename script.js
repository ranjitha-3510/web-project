const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

// Load currency options dynamically
fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

// Convert function
function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const result = (amount * rate).toFixed(2);
      document.getElementById("result").innerText =
        `${amount} ${from} = ${result} ${to}`;
    });
}
