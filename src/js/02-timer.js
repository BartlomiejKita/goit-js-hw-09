import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const pickedTime = document.querySelector('#datetime-picker');

startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      Notiflix.Notify.success(
        'Correct date choosen, press start to begin countdown'
      );
    }
  },
});

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    let countDownDate = new Date(pickedTime.value).getTime();
    let now = new Date().getTime();

    const timeLeft = countDownDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector('[data-days]').innerHTML =
      days < 10 ? '0' + days : days;
    document.querySelector('[data-hours]').innerHTML =
      hours < 10 ? '0' + hours : hours;
    document.querySelector('[data-minutes]').innerHTML =
      minutes < 10 ? '0' + minutes : minutes;
    document.querySelector('[data-seconds]').innerHTML =
      seconds < 10 ? '0' + seconds : seconds;

    if (timeLeft < 0) {
      clearInterval(timerId);
      document.querySelector('[data-days]').innerHTML = '00';
      document.querySelector('[data-hours]').innerHTML = '00';
      document.querySelector('[data-minutes]').innerHTML = '00';
      document.querySelector('[data-seconds]').innerHTML = '00';
    }
  }, 1000);
});
