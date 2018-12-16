//check if there is any notes array in local storage when app starts
let notes = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

let noteId = localStorage.getItem("noteId")
  ? JSON.parse(localStorage.getItem("noteId"))
  : 0;
