let currentDate = new Date();

// List of All Major US Holidays (Saved in LocalStorage)
let holidays = JSON.parse(localStorage.getItem('customHolidays')) || {
    "1-1": "New Year's Day",
    "1-15": "Martin Luther King Jr. Day",
    "2-19": "Presidents' Day",
    "3-17": "St. Patrick's Day",
    "4-1": "April Fools' Day",
    "5-27": "Memorial Day",
    "6-19": "Juneteenth",
    "7-4": "Independence Day",
    "9-2": "Labor Day",
    "10-14": "Columbus Day",
    "10-31": "Halloween",
    "11-11": "Veterans Day",
    "11-28": "Thanksgiving",
    "12-24": "Christmas Eve",
    "12-25": "Christmas Day",
    "12-31": "New Year's Eve"
};

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    
    // Update month and year display
    monthYear.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarDays.innerHTML = "";
    
    // Fill Empty Spots Before Month Starts
    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div class="day"></div>`;
    }

    // Fill in Actual Days
    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        let dateKey = `${month + 1}-${i}`;
        let holidayName = holidays[dateKey];
        let holidayClass = holidayName ? 'holiday' : '';

        calendarDays.innerHTML += `<div class="day ${isToday ? 'today' : ''} ${holidayClass}" data-holiday="${holidayName || ''}" onclick="toggleHoliday(${month + 1}, ${i})">${i}</div>`;
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function toggleHoliday(month, day) {
    let dateKey = `${month}-${day}`;

    if (holidays[dateKey]) {
        // If the date already has a holiday, remove it
        let confirmDelete = confirm(`Remove "${holidays[dateKey]}" from ${month}/${day}?`);
        if (confirmDelete) {
            delete holidays[dateKey];
        }
    } else {
        // Add a new holiday
        let newHoliday = prompt(`Enter a holiday or event for ${month}/${day}:`);
        if (newHoliday) {
            holidays[dateKey] = newHoliday;
        }
    }

    localStorage.setItem('customHolidays', JSON.stringify(holidays));
    renderCalendar();
}

renderCalendar();