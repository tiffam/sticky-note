//check if there is any notes array in local storage when app starts
let notes = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

let noteId = localStorage.getItem("noteId")
  ? JSON.parse(localStorage.getItem("noteId"))
  : 0;

// when user click on submit button, the inputs will be saved into local storage and browser refreshes
document.getElementById("submit").addEventListener("click", function() {
  noteId++;
  notes.push({
    id: noteId,
    title: document.getElementById("title").value,
    note: document.getElementById("note").value
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("noteId", JSON.stringify(noteId));
  console.log(notes);
});
