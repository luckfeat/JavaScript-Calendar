import Calendar from './moudle/Calendar';

const root = document.querySelector('#root');

function appendCalendar() {
  const newCalendar = Calendar();
  root.appendChild(newCalendar);
}

appendCalendar();
