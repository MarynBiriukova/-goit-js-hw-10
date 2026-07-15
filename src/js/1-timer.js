import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import '../css/styles.css';


let userSelectedDate = null;
let tInterval = null;
//let numDay = 0;

const startBtn = document.querySelector("[data-start]");
const inputPicker = document.querySelector('#datetime-picker');
const daysVal = document.querySelector("[data-days]");
const hoursVal = document.querySelector("[data-hours]");
const minutesVal = document.querySelector("[data-minutes]");
const secondsVal = document.querySelector("[data-seconds]");
/************************************************************************ */
  startBtn.addEventListener('click', () => {
  
  if (tInterval) return;
  startBtn.disabled = true;
  inputPicker.disabled = true;

  tInterval = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime; 
  
    if (deltaTime <= 0) {

      clearInterval(tInterval);
      tInterval = null;
      inputPicker.disabled = false;
      //startBtn.disabled = false;
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeComponents = convertMs(deltaTime);
    //numDay = timeComponents.days;
    
    updateTInterface(timeComponents);
  }, 1000);
});

 /********************************************************************** */

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userDate = selectedDates[0];
    const now = new Date();//this.defaultDate;
    if (userDate <= now) {
      //window.alert("Please choose a date in the future");
      iziToast.error({
        position: 'topCenter',
        title: 'Error',
        message: 'Please choose a date in the future'
      });
      startBtn.disabled = true;    
      userSelectedDate = null;
    } else {
      userSelectedDate = userDate;
      startBtn.disabled = false;
    }

  },

};


flatpickr("#datetime-picker", options);
startBtn.disabled = true;


function updateTInterface({ days, hours, minutes, seconds }) {
  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
