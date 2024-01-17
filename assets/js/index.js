// Set current day/time for header
$("#currentDay").text(`${dayjs().format("dddd, D MMMM YYYY")}`);

const plannerEl = $("#planner");

// Determine time status
const getTimeStatus = (hour) => {
  const currentHour = dayjs().hour();
  if (hour < currentHour) {
    return "past";
  } else if (hour === currentHour) {
    return "present";
  } else {
    return "future";
  }
};

// Create multiple time blocks
for (let hour = 9; hour <= 17; hour++) {
  const time = dayjs(`2024 ${hour}`).format("h A");
  const timeStatus = getTimeStatus(hour);

  const timeBlock = $(`
    <form data-time="${hour}">
      <label class="col-1" for="entry"><p>${time}</p></label>
      <textarea class="col-10 ${timeStatus}" name="entry"></textarea>
      <button type="submit" class="saveBtn col-1"><i class="fa-solid fa-floppy-disk"></i></button>
    </form>
  `);

  plannerEl.append(timeBlock);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = $(e.target).find('textarea[name="entry"]').val();
  const time = $(e.target).data('time');
  console.log(`Input Value for time ${time}:`, inputValue);
  localStorage.setItem(`time-${time}`, inputValue);
}

$("form").on("submit", handleSubmit);

// Retrieve stored values
$(document).ready(() => {
  for (let hour = 9; hour <= 17; hour++) {
    const storedValue = localStorage.getItem(`time-${hour}`);
    if (storedValue) {
      $(`form[data-time="${hour}"] textarea[name="entry"]`).val(storedValue);
    }
  }
});
