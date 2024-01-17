// Set current day/time for header
$("#currentDay").text(`${dayjs().format("dddd, D MMMM YYYY")}`);

const plannerEl = $("#planner");

// Create multiple time blocks
for (let hour = 9; hour <= 17; hour++) {
  const time = dayjs(`2024 ${hour}:00`).format("hh A");

  const timeBlock = $(`
    <form data-time="${hour}">
      <label class="hour col-1" for="entry"><p>${time}</p></label>
      <input class="present col-10" name="entry" />
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
}

$("form").on("submit", handleSubmit);
