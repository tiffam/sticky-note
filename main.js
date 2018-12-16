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

//create and display notes from notes array
let displayNotes = function(notes, idName) {
  for (let i = 0; i < notes.length; i++) {
    let div = document.createElement("div");
    let iconDelete = document.createElement("i");
    let iconSave = document.createElement("i");
    let h5 = document.createElement("h5");
    let para = document.createElement("p");
    div.setAttribute("class", "note");
    h5.setAttribute("contenteditable", "true");
    para.setAttribute("contenteditable", "true");
    iconDelete.setAttribute("class", "delete fas fa-minus-circle");
    iconDelete.setAttribute("id", "delete" + notes[i].id);
    iconSave.setAttribute("class", "save fas fa-save");
    iconSave.setAttribute("id", "save" + notes[i].id);
    h5.textContent = notes[i].title;
    para.textContent = notes[i].note;

    div.appendChild(iconDelete);
    div.appendChild(iconSave);
    div.appendChild(h5);
    div.appendChild(para);
    document.getElementById(idName).appendChild(div);
  }
};

//to execute the code to display notes
displayNotes(notes, "show-notes");
