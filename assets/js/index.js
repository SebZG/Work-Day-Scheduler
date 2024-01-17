// Set current day/time for header
$("#currentDay").text(`${dayjs().format("dddd, D MMMM YYYY")}`);

const hour = 9;
const ti = dayjs(`2024 ${hour}:00`).format("hh A");

const plannerEl = $("#planner");
const timeBlock = $(
  `
  <form>
  <label class="hour col-1" for="entry">${ti}</label>
  <input class="present col-10" name="entry" />
  <button type="submit" class="saveBtn col-1"><i class="fa-solid fa-floppy-disk"></i></button>
  </form>
  `
);

plannerEl.append(timeBlock);

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = $(e.target).find('input[name="entry"]').val();
  console.log("Input Value:", inputValue);
  $("input").val(inputValue)
}

$("form").on("submit", handleSubmit);