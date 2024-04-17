document.addEventListener('DOMContentLoaded', () => {

  // START TIMER FUNCTION
  function startTimer(timerInput) {
    // this is to check if a timer is already running and if it is I stop it
    if (timerInput.dataset.intervalId) {
      clearInterval(timerInput.dataset.intervalId);
    }

    let seconds = 0; // start counting seconds from zero
    const interval = setInterval(() => {
      seconds++; // every second increase the count by one
      let minutes = Math.floor(seconds / 60); // calculate how many minutes have passed
      let remainingSeconds = seconds % 60; // calculate how many seconds are left after minutes

      // format the minutes and seconds to have two digits.
      if (minutes < 10) minutes = '0' + minutes;
      if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;

      // update the timer display with the new time.
      timerInput.value = `${minutes}:${remainingSeconds}`;
      timerInput.dataset.intervalId = interval; // store the interval ID to use it later
    }, 1000); // set this function to run every 1000 milliseconds (1 second)
  }

  // STOP TIMER FUNCTION
  function pauseTimer(timerInput) {
    clearInterval(timerInput.dataset.intervalId); // stop the interval.
    timerInput.dataset.intervalId = null; // clear the interval ID so it can be restarted
  }

  // RESTART TIMER FUNCTION
  function restartTimer(timerInput) {
    clearInterval(timerInput.dataset.intervalId); // stop any running timer
    timerInput.value = '00:00'; // reset display to zero
    startTimer(timerInput); // start the timer again.
  }

  // FEEDBACK: Pause previous timer when a new one is added
  function pauseAllTimers() {
    // find all timer inputs by their class name.
    const allTimers = document.querySelectorAll('.timer-display');
    allTimers.forEach(timerInput => {
      pauseTimer(timerInput); // pause each timer
    });
  }

  // ADD TIMER FUNCTION
  function addTimer() {
    pauseAllTimers();  // FEEDBACK: Pause previous timer when a new one is added

    // select the container where timers are and the add button.
    const timersContainer = document.querySelector('.timers');
    const addButton = document.querySelector('.add-timer-btn');
    const newTimer = document.createElement('div'); // create a new div for the timer
    newTimer.classList.add('timer'); // add the timer class to the div
    newTimer.innerHTML = `
          <input type="text" placeholder="Label" class="timer-label">
          <input type="text" class="timer-display" placeholder="00:00" readonly>
          <button class="control-btn start">Start</button>
          <button class="control-btn stop">Pause</button>
          <button class="control-btn restart">Restart</button>
      `; // set inner HTML to include input fields, buttons.

    timersContainer.insertBefore(newTimer, addButton); // insert the new timer before the add button!!
  }

  // set up event handling for clicks on timer buttons
  document.querySelector('.timers').addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('control-btn')) {
      const timerDiv = target.closest('.timer');
      const timerInput = timerDiv.querySelector('.timer-display');

      if (target.classList.contains('start')) {
        startTimer(timerInput); // start timer if start button is clicked
      } else if (target.classList.contains('stop')) {
        pauseTimer(timerInput); // ause timer if pause button is clicked
      } else if (target.classList.contains('restart')) {
        restartTimer(timerInput); // restart timer if restart button is clicked.
      }
    }

    if (target.classList.contains('add-timer-btn')) {
      addTimer(); // add new timer if add button is clicked
    }
  });

  // comment bubble that changes every 30 seconds
  const comments = [
    "Keep calm and commit on.",
    "When life gives you code, make codebase.",
    "It's not a bug, it's an undocumented feature."
  ];
  let commentIndex = 0;
  setInterval(() => {
    const commentBubble = document.querySelector('.comment-bubble p');
    if (commentBubble) {
      commentBubble.textContent = comments[commentIndex++ % comments.length]; // cycle through comments
    }
  }, 30000); // change the comment every 30 seconds
});


// Update: Automatically stop the clock when another one starts
