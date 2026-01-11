// Initial Events Data
const initialEvents = [
  {
    name: "Tech Meetup",
    date: "2026-01-15",
    description: "Networking and talks on emerging technologies.",
  },
  {
    name: "Community Hackathon",
    date: "2026-02-05",
    description: "48-hour coding marathon for social good.",
  },
  {
    name: "New Year Gala",
    date: "2026-01-01",
    description: "Celebrate the new year with music and dance.",
  },
];

let events = [...initialEvents];

// Elements
const eventsList = document.getElementById("eventsList");
const eventForm = document.getElementById("eventForm");
const formWarning = document.getElementById("formWarning");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");

// Helpers
const todayStr = () => new Date().toISOString().slice(0, 10);
const isPast = (dateStr) => dateStr < todayStr();
const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function sortEventsByDateAsc(list) {
  return [...list].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  );
}

function createEventCard({ name, date, description }) {
  const card = document.createElement("div");
  card.className = `event-card ${isPast(date) ? "past" : "upcoming"}`;

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = name;

  const dateEl = document.createElement("div");
  dateEl.className = "date";
  dateEl.textContent = `Date: ${formatDate(date)} (YYYY-MM-DD: ${date})`;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = description;

  const actions = document.createElement("div");
  actions.className = "actions";

  const delBtn = document.createElement("button");
  delBtn.className = "danger";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    deleteEvent(name, date);
  });

  actions.appendChild(delBtn);
  card.append(title, dateEl, desc, actions);
  return card;
}

function renderEvents() {
  eventsList.innerHTML = "";
  const searchTerm = (searchInput.value || "").trim().toLowerCase();
  let filtered = sortEventsByDateAsc(events);
  if (searchTerm) {
    filtered = filtered.filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm) ||
        e.date.toLowerCase().includes(searchTerm)
    );
    searchStatus.textContent = `Showing ${filtered.length} result(s)`;
  } else {
    searchStatus.textContent = "";
  }
  filtered.forEach((ev) => eventsList.appendChild(createEventCard(ev)));
}

function deleteEvent(name, date) {
  events = events.filter((e) => !(e.name === name && e.date === date));
  renderEvents();
}

function handleAddEvent(e) {
  e.preventDefault();
  const nameInput = document.getElementById("eventName");
  const dateInput = document.getElementById("eventDate");
  const descInput = document.getElementById("eventDescription");

  const name = nameInput.value.trim();
  const date = dateInput.value.trim();
  const description = descInput.value.trim();

  if (!name || !date || !description) {
    formWarning.hidden = false;
    formWarning.textContent = "All fields are required.";
    return;
  }

  formWarning.hidden = true;
  events.push({ name, date, description });
  events = sortEventsByDateAsc(events);
  renderEvents();
  eventForm.reset();
}

// Footer year
const yearEl = document.getElementById("copyrightYear");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Event listeners
eventForm.addEventListener("submit", handleAddEvent);
searchInput.addEventListener("input", renderEvents);

// Initial render
renderEvents();
