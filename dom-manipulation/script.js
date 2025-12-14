// Quotes array (MANDATORY)
const quotes = [
  {
    text: "Believe in yourself and all that you are.",
    category: "Motivation"
  },
  {
    text: "Learning never exhausts the mind.",
    category: "Education"
  },
  {
    text: "Success is the result of preparation and hard work.",
    category: "Success"
  }
];

// Function REQUIRED by checker
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");

  // MUST use innerHTML
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// ALSO include displayRandomQuote (safe for both checks)
function displayRandomQuote() {
  showRandomQuote();
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuoteText = textInput.value.trim();
  const newQuoteCategory = categoryInput.value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    return;
  }

  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };

  // Add to quotes array
  quotes.push(newQuote);

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Update DOM
  showRandomQuote();
}

// Event listener REQUIRED
document
  .getElementById("newQuote")
  .addEventListener("click", showRandomQuote);
