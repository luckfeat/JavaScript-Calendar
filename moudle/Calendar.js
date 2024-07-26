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

  /* This Month */
  const firstDay = new Date(year, month).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay();

  /* Previous, Next Month */
  const previousMonthDate = new Date(year, month, 1 - firstDay);
  const nextMonthDate = new Date(year, month + 1, 7 - (lastDay + 1));

  /* 달력에 추가될 요일 계산 */
  const dateDifference = getDateDifference(previousMonthDate, nextMonthDate);
  const startDate = previousMonthDate;
  const lastDate = nextMonthDate.setDate(
    nextMonthDate.getDate() + dateDifference
  );

  return [startDate, lastDate];
}

export function renderDateElements(tag) {
  const [month] = getMonthAndYear();
  const [startDate, lastDate] = getStartAndLastDate();

  let currentDate = startDate;

  while (currentDate <= lastDate) {
    const dayOfDate = currentDate.getDate();
    const dateGrid = document.createElement('div');

    dateGrid.className =
      currentDate.getMonth() === month
        ? 'calendar-item'
        : 'calendar-item light';

    dateGrid.textContent = dayOfDate.toString();
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

  const calendarInput = calendarSection.querySelector('input');
  const calendarNav = calendarSection.querySelector('.calendar-nav');
  const calendarContent = calendarSection.querySelector('.calendar-content');

  renderDateElements(calendarContent);

  calendarInput.addEventListener('click', () => {
    const calendar = document.querySelector('.calendar');
    calendar.classList.remove('hidden');
  });

  // calendarInput.addEventListener('blur', () => {
  //   const calendar = document.querySelector('.calendar');
  //   calendar.classList.add('hidden');
  // });

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

  return calendarSection;
}
