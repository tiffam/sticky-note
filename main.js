//check if there is any notes array in local storage when app starts
let notes = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

let noteId = localStorage.getItem("noteId")
  ? JSON.parse(localStorage.getItem("noteId"))
  : 0;

// when user click on submit button, the inputs will be saved into local storage and browser refreshes
document.getElementById("submit").addEventListener("click", function() {
  if (document.getElementById("note").value !== "") {
    noteId++;
    notes.push({
      id: noteId,
      title: document.getElementById("title").value.toLowerCase(),
      note: document.getElementById("note").value
    });
    localStorage.setItem("noteId", JSON.stringify(noteId));
    saveNotes(notes);
  }
});

//create and display notes from notes array
let noteGenerator = function(notes, idName) {
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

    h5.textContent = notes[i].title.toUpperCase();
    para.textContent = notes[i].note;

    div.appendChild(iconDelete);
    div.appendChild(iconSave);
    div.appendChild(h5);
    div.appendChild(para);
    document.getElementById(idName).appendChild(div);
  }
};

//to execute the code to display notes
noteGenerator(notes, "show-notes");

//Delete note

let deleteNote = function() {
  let listDeleteItems = document.querySelectorAll(".delete");
  for (let i = 0; i < listDeleteItems.length; i++) {
    listDeleteItems[i].addEventListener("click", function() {
      console.log("deletNote", event);
      let searchId = event.target.id.slice(6);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == searchId) {
          notes.splice(notes[i], 1);
          saveNotes(notes);
        }
      }
    });
  }
};

//Edit note
let editNote = function() {
  let listEditItems = document.querySelectorAll(".save");
  for (let i = 0; i < listEditItems.length; i++) {
    listEditItems[i].addEventListener("click", function() {
      console.log("editNote", event);
      let searchId = event.target.id.slice(4);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == searchId) {
          notes[i].title = event.target.nextSibling.innerHTML;
          notes[i].note = event.target.nextSibling.nextSibling.innerHTML;
          localStorage.setItem("notes", JSON.stringify(notes));
          saveNotes(notes);
        }
      }
    });
  }
};

deleteNote();
editNote();

let saveNotes = function(editedNotes) {
  localStorage.setItem("notes", JSON.stringify(editedNotes));
  location.reload();
};

//search note and display search results
document.getElementById("search-button").addEventListener("click", function() {
  let searchTerm = document.getElementById("search").value;
  //search only when search input is not an empty string
  if (searchTerm !== "") {
    let searchTerm = document.getElementById("search").value.toLowerCase();
    let searchResults = notes.filter(function(note) {
      return !note.title.indexOf(searchTerm);
    });
    let div = document.createElement("div");
    if (searchResults.length - 1 < 0) {
      div.textContent = "No matching note for " + searchTerm;
      document.getElementById("show-search").appendChild(div);
    } else {
      div.textContent = "Search Results for " + searchTerm;
      document.getElementById("show-search").appendChild(div);
      noteGenerator(searchResults, "show-search");
    }
    document.getElementById("new-note").classList.toggle("invisible");
    document.getElementById("show-notes").classList.toggle("invisible");
    document.getElementById("search").classList.toggle("invisible");
    document.getElementById("search-button").classList.toggle("invisible");
    deleteNote();
    editNote();
  }
});
