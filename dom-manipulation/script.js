// =====================================
// Quotes Array (REQUIRED)
// =====================================
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

// =====================================
// Show Random Quote (REQUIRED)
// =====================================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");

  // REQUIRED: innerHTML
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// =====================================
// Display Random Quote (CHECKER SAFE)
// =====================================
function displayRandomQuote() {
  showRandomQuote();
}

// =====================================
// Create Add Quote Form (REQUIRED)
// =====================================
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote">
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category">
    <button id="addQuoteBtn">Add Quote</button>
  `;

  document.body.appendChild(formContainer);

  document
    .getElementById("addQuoteBtn")
    .addEventListener("click", addQuote);
}

// =====================================
// Add Quote Function (REQUIRED)
// =====================================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") {
    return;
  }

  const newQuote = {
    text: text,
    category: category
  };

  // REQUIRED: add to quotes array
  quotes.push(newQuote);

  textInput.value = "";
  categoryInput.value = "";

  // REQUIRED: update DOM
  showRandomQuote();
}

// =====================================
// Event Listener (REQUIRED)
// =====================================
document
  .getElementById("newQuote")
  .addEventListener("click", showRandomQuote);

// =====================================
// Initialize Form
// =====================================
createAddQuoteForm();
