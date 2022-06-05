const container = document.querySelector(".container");
const add = document.querySelector(".add");
const input = document.querySelector(".input");
const save = document.querySelector(".save");
  let noteArray = [];
let todoArray = [];

//------------add----------------------
add.addEventListener("click", addNote);
function addNote(e) {
  e.preventDefault();
  TodoDom(input.value);
  todoArray.push(input.value);
  localStorage.setItem("key", JSON.stringify(todoArray));
  input.value = "";
}


//-----------dom----------------
function TodoDom(data) {
  const todo_container = document.createElement("div");
  todo_container.classList.add("container");
  container.appendChild(todo_container);

  //note
  const note = document.createElement("h6");
  note.classList.add("note");
  todo_container.appendChild(note);
  note.textContent = data;

  //remove
  const removeNote = document.createElement("img");
  removeNote.classList.add("remove");
  removeNote.src =
    "https://icons-for-free.com/download-icon-delete+24px-131985190578721347_512.png";
  todo_container.appendChild(removeNote);

  //edit
  const editNote = document.createElement("img");
  editNote.classList.add("edit");
  editNote.src =
    "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/30-512.png";
  todo_container.appendChild(editNote);

  //--------------------edit function-----------------------

  editNote.addEventListener("click", editfunction);
  function editfunction() {
    input.value = note.textContent;

    //------save-----
    save.addEventListener("click", savefunction);
    function savefunction() {
      note.textContent = input.value;  
 

      localStorage.removeItem('key');

      let noteGroup = document.querySelectorAll(".note");

      for (let i = 0; i < noteGroup.length; i++) {
        noteArray.push(noteGroup[i].textContent);
      }
      localStorage.setItem("key1", JSON.stringify(noteArray));

      //splic 123
      // input.value = "";
    }
  }

  //-------------remove function------------------
  removeNote.addEventListener("click", removeFunction);
  function removeFunction() {
    todo_container.remove();

    //remove from local storage
    todoArray = JSON.parse(localStorage.getItem("key"));

    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i] === data) {
        todoArray.splice(i, 1);
      }
    }
    localStorage.setItem("key", JSON.stringify(todoArray));
  } //end remove

  
}

//-------------------------onload------------------------
document.addEventListener("DOMContentLoaded", onload);


function onload() {
  if (localStorage.getItem("key1")) {
   todoArray = JSON.parse(localStorage.getItem("key1"));
  todoArray.forEach((element) => {
    TodoDom(element);
  });
}
 
}


////////////////////////////////////////
