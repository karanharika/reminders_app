const ENTER = 13;
const DEL = 46;
let index = localStorage.length;

let input = document.getElementById("add-reminder");
let preview = document.getElementsByClassName("preview")[0];
let notice = document.getElementsByClassName("notice")[0];
let notices = document.querySelector(".notices");
let submit = document.getElementById("submit-reminder");
let reminders = document.getElementById("reminders");
let deleteAll = document.getElementById("clear");


input.focus();
onkeyup = () => {
    preview.innerHTML = input.value;
    if (event.which === ENTER) {
        saveReminder();
        location.reload();
    }

    if (event.which === DEL) {
        deleteReminders();
        location.reload();
    }
}


function showNotice(message, status){
    notice.innerHTML = message;

    if (status){
        notice.classList.add('error');
    }
    else{
        notice.classList.remove('error');
    }

    $(notices).show();
    setTimeout(() => $(notices).hide(), 2000)
}


function saveReminder(){
    if (input.value !== "") {
        let periviousLength = localStorage.length;

        localStorage.setItem(`reminder${index++}`, input.value);
    
        if (localStorage.length === periviousLength + 1){
            showNotice("Reminder Saved Successfully!!", false);
            
            addReminderToPage(input.value);

            preview.innerHTML = "";
            input.value = "";
            input.focus();
        }
        else{
            showNotice("Error: Reminder Not Saved!!", true);
        }

    }

    else{
        showNotice("Error: Reminder text can not be empty!!", true);
    }
}


submit.onclick = saveReminder;


function addReminderToPage(type){
    let reminder = document.createElement('li');
    reminder.classList.add('reminder');
    reminder.innerHTML = type;
    reminders.insertBefore(reminder, reminders.firstElementChild);
}

for (let i = 0; i < localStorage.length; i++){
    if (localStorage.getItem(`reminder${i}`) !== null){
        addReminderToPage(localStorage[`reminder${i}`]);
    }
}

deleteAll.onclick = deleteReminders;

function deleteReminders(){
    if (localStorage.length === 0){
        showNotice("Error: No reminders to delete!!", true);
    }
    else {
        localStorage.clear();

        $(".reminder").not(".preview").remove();
        input.value = "";
        input.focus();
        showNotice("Reminders deleted!!", false);
    }
}


var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}







  
