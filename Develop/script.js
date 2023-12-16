// Variables to get the day and also the hour
var today = dayjs();
var hour = dayjs().format("H");

// Selecting elements
var allWorkDayHours = $("#main-container").children();
var saveButton = $("button")
var confirm = $("#confirm-appointment");

// Will be used to store user information
var userSchedule = {
  scheduleHour : [],
  scheduleText : []
}

// For the time the confirmation will be shown


$(function () {

saveButton.on("click", function(){
  
  // Getting the text that wants saved and also the hour of that time block
  var divTarget = this.parentElement;
  var text = $(divTarget).children("textarea").val();
  divHour = this.parentElement.id

  // Pushing the info into the object containing the information
  userSchedule.scheduleHour.push(divHour);
  userSchedule.scheduleText.push(text);

  // starts the function to store the info into local storage
  storeInfo()
  });

// Displays confirmation for only 5 seconds
saveButton.on("click", function(){
  var timerCount = 5;
  var timer = setInterval(function(){
   
    timerCount --;

    if(timerCount === 0){
      confirm.css("display", "none");
      clearInterval(timer);
    }else{
      confirm.css("display", "block");

    }


  }, 1000);
});





displayEvents();

// function to display any events that were stored in local storage
function displayEvents(){
  for(var i = 0; i < userSchedule.scheduleHour.length; i++){

    var theText = userSchedule.scheduleText[i];
    var theHour = userSchedule.scheduleHour[i];

    var changeDiv = document.getElementById(theHour);
    var textBox = $(changeDiv).children("textarea");

    textBox.text(theText);
  }
}
  //
  // TODO: Add code to display the current date in the header of the page.
});

// Stores the text and which time block it was in
function storeInfo(){
  localStorage.setItem("hour", JSON.stringify(userSchedule.scheduleHour));
  localStorage.setItem("text", JSON.stringify(userSchedule.scheduleText));
}


function init(){
  // Shows the current day
  $('#currentDay').text(today.format("dddd, MMMM DD"));

  // Checks the hour of time block and compares to hour of the day to set a class based on present, past and future
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

  // When page loads will get anything stored in local stoage and push it into the object to be displayed
  var storedHours = JSON.parse(localStorage.getItem("hour"));
  var storedText = JSON.parse(localStorage.getItem("text"));

  if(storedHours !== null && storedText !== null){
    userSchedule.scheduleHour = storedHours;
    userSchedule.scheduleText = storedText;
  };
};


init()