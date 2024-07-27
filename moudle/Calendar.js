import 'boxicons';
import store, { increment, decrement } from './Store';

export function getMonthAndYear() {
  const { counter } = store.getState();
  const now = new Date();
  now.setMonth(now.getMonth() + counter);
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[month];

  return [month, year, monthName];
}

export function getDateDifference(startDate, endDate) {
  const calendarSize = 42;
  const timeDifference = endDate - startDate;
  const dateDifference = timeDifference / (1000 * 60 * 60 * 24);

  return calendarSize - (dateDifference + 1);
}

export function getStartAndLastDate() {
  const [month, year] = getMonthAndYear();

  const firstDay = new Date(year, month).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay();

  const previousMonth = new Date(year, month, 1 - firstDay);
  const nextMonth = new Date(year, month + 1, 7 - (lastDay + 1));

  const dateDifference = getDateDifference(previousMonth, nextMonth);
  const startDate = previousMonth;
  const lastDate = nextMonth.setDate(nextMonth.getDate() + dateDifference);

  return [startDate, lastDate];
}

export function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function renderDateElements(tag) {
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [month] = getMonthAndYear();
  const [startDate, lastDate] = getStartAndLastDate();

  week.forEach(el => {
    const day = document.createElement('div');
    day.textContent = el;
    day.className = 'calendar-week';
    tag.appendChild(day);
  });

  let currentDate = startDate;

  while (currentDate <= lastDate) {
    const dayOfDate = currentDate.getDate();
    const dateGrid = document.createElement('div');

    dateGrid.className =
      currentDate.getMonth() === month
        ? 'calendar-item'
        : 'calendar-item light';

    if (
      currentDate.toString().slice(0, 10) === new Date().toString().slice(0, 10)
    ) {
      dateGrid.classList.add('today');
    }

    dateGrid.textContent = dayOfDate.toString();
    dateGrid.dataset.Date = formatDate(currentDate);
    tag.appendChild(dateGrid);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

export function updatedCalendar() {
  const [month, year, monthName] = getMonthAndYear();

  const calendarSection = document.querySelector('section');
  const monthSpan = calendarSection.querySelector('.month');
  const yearSpan = calendarSection.querySelector('.year');
  const calendarContent = calendarSection.querySelector('.calendar-content');

  calendarContent.innerHTML = '';
  monthSpan.innerHTML = monthName;
  yearSpan.innerHTML = year.toString();
  renderDateElements(calendarContent);
}

export default function Calendar() {
  const [month, year, monthName] = getMonthAndYear();
  const calendarSection = document.createElement('section');
  const calendarInnerHtml = `
    <input type='text' placeholder='Select Date'>
    <div class='calendar hidden'>
      <nav class="calendar-nav">
        <box-icon class='left' type='solid' name='left-arrow' color='white' size='xs'></box-icon>
        <div class='center'>
          <span class='month'>${monthName}</span>
          <span class='year'>${year}</span>
        </div>
        <box-icon class='right' type='solid' name='right-arrow' color='white' size='xs'></box-icon>
      </nav>
      <div class='calendar-content'>
      </div>
    </div>
  `;

  calendarSection.innerHTML = calendarInnerHtml;

  const calendar = calendarSection.querySelector('.calendar');
  const calendarInput = calendarSection.querySelector('input');
  const calendarNav = calendarSection.querySelector('.calendar-nav');
  const calendarContent = calendarSection.querySelector('.calendar-content');

  renderDateElements(calendarContent);

  let selectedDate;

  calendarSection.addEventListener('click', e => {
    if (e.target.tagName === 'SECTION') {
      calendar.classList.add('hidden');
    }
  });
  calendarInput.addEventListener('click', () => {
    calendar.classList.remove('hidden');
  });
  calendarNav.addEventListener('click', e => {
    if (
      e.target.tagName === 'BOX-ICON' &&
      e.target.getAttribute('name') === 'left-arrow'
    ) {
      store.setState({ counter: store.getState().counter - 1 });
      updatedCalendar();
    } else if (
      e.target.tagName === 'BOX-ICON' &&
      e.target.getAttribute('name') === 'right-arrow'
    ) {
      store.setState({ counter: store.getState().counter + 1 });
      updatedCalendar();
    }
  });
  calendarContent.addEventListener('click', e => {
    if (
      e.target.className === 'calendar-item' ||
      e.target.className === 'calendar-item today'
    ) {
      calendarInput.placeholder = e.target.dataset.Date;
      selectedDate?.classList.remove('selected');
      selectedDate = e.target;
      e.target.classList.add('selected');
      calendar.classList.add('hidden');
    }
  });

  return calendarSection;
}
