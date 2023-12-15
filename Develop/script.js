// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
var hour = dayjs().format("H");
var allWorkDayHours = $("#main-container").children();
var saveButton = $("button")
var confirm = $("#confirm-appointment");
var userSchedule = {
  scheduleHour : [],
  scheduleText : []
}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

saveButton.on("click", function(){
  
  var divTarget = this.parentElement;
  var text = $(divTarget).children("textarea").val();
  divHour = this.parentElement.id

  userSchedule.scheduleHour.push(divHour);
  userSchedule.scheduleText.push(text);

  console.log(divTarget);
  console.log(text);
  console.log(divHour);

  storeInfo()
  });

displayEvents();

function displayEvents(){
  for(var i = 0; i < userSchedule.scheduleHour.length; i++){

    var theText = userSchedule.scheduleText[i];
    var theHour = userSchedule.scheduleHour[i];

    var changeDiv = document.getElementById(theHour);
    var textBox = $(changeDiv).children("textarea");

    textBox.text(theText);

    console.log(textBox)
    console.log(changeDiv);
    console.log(theText);
    console.log(theHour);
  }
}
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


function storeInfo(){
  localStorage.setItem("hour", JSON.stringify(userSchedule.scheduleHour));
  localStorage.setItem("text", JSON.stringify(userSchedule.scheduleText));
  confirm.css("display", "block");
}


function init(){
  $('#currentDay').text(today.format("dddd, MMMM DD"));

  for(var i = 0; i < allWorkDayHours.length; i++){

    var hourId = allWorkDayHours[i].id;

    var NumHourId = parseInt(hourId);
    var hourAsNumber = parseInt(hour);

    if (NumHourId === hourAsNumber){
      $("#main-container").children().eq(i).addClass("present");
    }else if (NumHourId < hourAsNumber){
      $("#main-container").children().eq(i).addClass("past");
    }else{
      $("#main-container").children().eq(i).addClass("future");
    };
  };

  var storedHours = JSON.parse(localStorage.getItem("hour"));
  var storedText = JSON.parse(localStorage.getItem("text"));

  if(storedHours !== null && storedText !== null){
    userSchedule.scheduleHour = storedHours;
    userSchedule.scheduleText = storedText;
  };
};


init()