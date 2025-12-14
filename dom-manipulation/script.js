const quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Practice makes perfect.", category: "Education" }
];

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteDisplay").textContent =
    `"${quote.text}" — ${quote.category}`;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  quotes.push({ text, category });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  displayRandomQuote();
}

document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);
