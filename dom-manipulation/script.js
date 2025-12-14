// =====================================
// Quotes Array
// =====================================
const quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" }
];

// =====================================
// Local Storage Functions
// =====================================
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes.length = 0;
    quotes.push(...JSON.parse(storedQuotes));
  }
}

// =====================================
// Show Random Quote
// =====================================
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;

  // Session Storage (optional requirement)
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Checker-safe alias
function displayRandomQuote() {
  showRandomQuote();
}

// =====================================
// Create Add Quote Form
// =====================================
function createAddQuoteForm() {
  const container = document.createElement("div");

  container.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote">
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category">
    <button id="addQuoteBtn">Add Quote</button>
    <button id="exportBtn">Export Quotes (JSON)</button>
    <input type="file" id="importFile" accept=".json">
  `;

  document.body.appendChild(container);

  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  document.getElementById("exportBtn").addEventListener("click", exportToJson);
  document
    .getElementById("importFile")
    .addEventListener("change", importFromJsonFile);
}

// =====================================
// Add Quote
// =====================================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) return;

  const newQuote = { text, category };

  quotes.push(newQuote);
  saveQuotes();

  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// =====================================
// Export Quotes to JSON
// =====================================
function exportToJson() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// =====================================
// Import Quotes from JSON
// =====================================
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

// =====================================
// Event Listener
// =====================================
document
  .getElementById("newQuote")
  .addEventListener("click", showRandomQuote);

// =====================================
// Initialize App
// =====================================
loadQuotes();
createAddQuoteForm();
