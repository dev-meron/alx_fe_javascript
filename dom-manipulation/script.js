// =====================================
// Quotes Array
// =====================================
const quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" }
];

// =====================================
// Server Simulation
// =====================================
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

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
// Populate Categories
// =====================================
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = `
    <option value="all">All Categories</option>
  `;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
    filterQuotes();
  }
}

// =====================================
// Filter Quotes
// =====================================
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;

  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  } else {
    document.getElementById("quoteDisplay").innerHTML = `
      <p>No quotes found for this category.</p>
    `;
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

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

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
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);
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

  populateCategories();
  filterQuotes();
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
    populateCategories();
    filterQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

// =====================================
// Server Sync Functions
// =====================================
async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  return data.slice(0, 10).map(item => ({
    text: item.title,
    category: "Server"
  }));
}

async function pushLocalQuotesToServer() {
  for (const quote of quotes) {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  }
}

function resolveConflicts(serverQuotes) {
  const localJSON = JSON.stringify(quotes);
  const serverJSON = JSON.stringify(serverQuotes);

  if (localJSON !== serverJSON) {
    quotes.length = 0;
    quotes.push(...serverQuotes);
    saveQuotes();

    showSyncMessage("Server updates applied (conflict resolved)");
  }
}

async function syncWithServer() {
  showSyncMessage("Syncing with server...");

  try {
    const serverQuotes = await fetchServerQuotes();
    resolveConflicts(serverQuotes);
    populateCategories();
    filterQuotes();

    showSyncMessage("Sync complete ✅");
  } catch (error) {
    showSyncMessage("Sync failed ❌");
  }
}

// =====================================
// Sync UI Message
// =====================================
function showSyncMessage(message) {
  const status = document.getElementById("syncStatus");
  status.textContent = message;

  setTimeout(() => {
    status.textContent = "";
  }, 4000);
}

// =====================================
// Event Listeners
// =====================================
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("syncNow").addEventListener("click", syncWithServer);

// =====================================
// Initialize App
// =====================================
loadQuotes();
createAddQuoteForm();
populateCategories();
filterQuotes();
syncWithServer();
setInterval(syncWithServer, 20000);

