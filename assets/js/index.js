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
  const time = dayjs(`2024 ${hour}:00`).format("hh A");
  const timeStatus = getTimeStatus(hour);

  const timeBlock = $(`
    <form data-time="${hour}">
      <label class="hour col-1" for="entry"><p>${time}</p></label>
      <input class="col-10 ${timeStatus}" name="entry" />
      <button type="submit" class="saveBtn col-1"><i class="fa-solid fa-floppy-disk"></i></button>
    </form>
  `);

  plannerEl.append(timeBlock);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = $(e.target).find('input[name="entry"]').val();
  const time = $(e.target).data('time');
  console.log(`Input Value for time ${time}:`, inputValue);
  localStorage.setItem(`time_${time}`, inputValue);
}

$("form").on("submit", handleSubmit);

// Retrieve stored values
$(document).ready(() => {
  for (let hour = 9; hour <= 17; hour++) {
    const storedValue = localStorage.getItem(`time_${hour}`);
    if (storedValue) {
      $(`form[data-time="${hour}"] input[name="entry"]`).val(storedValue);
    }
  }
});