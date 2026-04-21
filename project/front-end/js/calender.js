const daysContainer = document.getElementById('days');
const monthYear = document.querySelector('.month-year');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

const months = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December"
];

function renderCalendar() {
  daysContainer.innerHTML = '';
  monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Vorige maand dagen
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.className = 'day other-month';
    day.textContent = daysInPrevMonth - i;
    daysContainer.appendChild(day);
  }

  // Huidige maand
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.className = 'day';
    day.textContent = i;

    // Vandaag highlight
    if (
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      day.classList.add('today');
    }

    // Geselecteerde dag highlight
    if (selectedDate) {
      const sel = new Date(selectedDate);
      if (
        i === sel.getDate() &&
        currentMonth === sel.getMonth() &&
        currentYear === sel.getFullYear()
      ) {
        day.classList.add('selected');
      }
    }

    // Klik event
    day.addEventListener('click', () => {
      if (day.classList.contains('other-month')) return;

      // Verwijder vorige selectie
      document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));

      // Voeg nieuwe selectie toe
      day.classList.add('selected');
      selectedDate = new Date(currentYear, currentMonth, i);

      console.log("Geselecteerde datum:", selectedDate.toLocaleDateString('nl-NL'));
      // Hier kun je later iets mee doen (bijv. events tonen, formulier openen, etc.)
    });

    daysContainer.appendChild(day);
  }

  // Volgende maand opvullen (tot ~42 cellen)
  const totalCells = daysContainer.children.length;
  const remaining = 42 - totalCells;
  for (let i = 1; i <= remaining; i++) {
    const day = document.createElement('div');
    day.className = 'day other-month';
    day.textContent = i;
    daysContainer.appendChild(day);
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// Start
renderCalendar();