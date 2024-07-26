import 'boxicons';

export function getDateDifference(startDate, endDate) {
  const timeDifference = endDate - startDate;
  const dateDifference = timeDifference / (1000 * 60 * 60 * 24);

  return calendarSize - (dateDifference + 1);
}

export function getThisMonthArray() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const calendarSize = 42;
  const firstDay = new Date(year, month);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const lastDayOfWeek = lastDay.getDay();
  const previousMonthDate = new Date(year, month, 1 - firstDayOfWeek);
  const nextMonthDate = new Date(year, month + 1, 7 - (lastDayOfWeek + 1));
  const dateDifference = getDateDifference(previousMonthDate, nextMonthDate);
  const startDate = previousMonthDate;
  const lastDate = new Date(year, month + 1, nextMonthDate.getDate() + 7);

  let currentDate = startDate;
  let calendarDateArray = [];

  while (currentDate <= lastDate) {
    const dayOfDate = currentDate.getDate();
    calendarDateArray.push(dayOfDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendarDateArray;
}

export default function Calendar() {
  const section = document.createElement('section');
  const calendarInput = document.createElement('input');
  const calendar = document.createElement('div');
  const calendarInnerHtml = `
    <nav class="calendar-nav">
      <box-icon class='left' type='solid' name='left-arrow' color='white' size='xs'></box-icon>
      <div class='center'>
        <span class='month'>${month}</span>
        <span class='year'>${year}</span>
      </div>
      <box-icon class='right' type='solid' name='right-arrow' color='white' size='xs'></box-icon>
    </nav>
    <div class="calendar-content"></div>
  `;

  Object.assign(calendarInput, {
    type: 'text',
    placeholder: 'Select Date',
  });

  calendar.className = 'calendar hidden';
  calendar.innerHTML = calendarInnerHtml;

  section.appendChild(calendarInput);
  section.appendChild(calendar);

  const calendarContent = document.querySelector('.calendar-content');

  const dateArray = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  dateArray.forEach(el => {});

  calendarInput.addEventListener('click', () => {
    const calendar = document.querySelector('.calendar');
    calendar.classList.remove('hidden');
  });

  // calendarInput.addEventListener('blur', () => {
  //   const calendar = document.querySelector('.calendar');
  //   calendar.classList.add('hidden');
  // });

  return section;
}
