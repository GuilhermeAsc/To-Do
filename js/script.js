//Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editform = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const canceleditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterBtn = document.querySelector('#filter-select')

let oldInputValue;

//Funções
const saveTODO = (text, done = 0, save = 1) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const donebtn = document.createElement("button");
    donebtn.classList.add("finish-todo");
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(donebtn);

    const editbtn = document.createElement("button");
    editbtn.classList.add("edit-todo");
    editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editbtn);
    
    const deletebtn = document.createElement("button");
    deletebtn.classList.add("remove-todo");
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletebtn);

    // Utilizando dados da localStorage

    if(done){
        todo.classList.add("done");
    }
    if(save){
        saveTodoLocalStorage({text, done:0})
    }

    todoList.appendChild(todo);

    todoInput.value = "";
};
const toggleforms = ()=>{
    editform.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updatetodo = (text)=>{
     
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{
    let todoTitle = todo.querySelector("h3");

    if(todoTitle.innerText === oldInputValue){
        todoTitle.innerText = text;

        // Utilizando dados da localStorage

        updateTodoLocalStorage(oldInputValue,text)
    }
    });

};
const getSearchedTodos = (search) =>{
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo)=>{
        
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        console.log(todoTitle);
    
        if(!todoTitle.includes(search)){
            todo.style.display = "none";
        }
    })
    
};
const filterTodos = (filtervalue)=>{
    const todos = document.querySelectorAll(".todo");

    switch(filtervalue){
        case "all":
            todos.forEach((todo)=>(todo.style.display = "flex"));
            break;
        case "done":
            todos.forEach((todo)=> 
            todo.classList.contains("done")
            ?(todo.style.display="flex")
            :(todo.style.display="none")
            );
            break;
        case "todo":
            todos.forEach((todo)=> 
            todo.classList.contains("done")
            ?(todo.style.display="flex")
            :(todo.style.display="none")
            );
            break;
        default:
            break;
           
    }
}

//Eventos
todoForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputValue = todoInput.value

    if(inputValue){
        // Save Todo
        saveTODO(inputValue);
    }
    
});


document.addEventListener("click", (e)=>{
   const targetAll = e.target;
   const parentaAll = targetAll.closest("div");
   let todotitle;

   if(parentaAll && parentaAll.querySelector("h3")){
    todotitle = parentaAll.querySelector("h3").innerText || "";
   }

   if(targetAll.classList.contains("finish-todo")){
    parentaAll.classList.toggle("done");
   }
   if(targetAll.classList.contains("edit-todo")){
    toggleforms();

    editInput.value = todotitle;
    oldInputValue = todotitle;
   }
   if(targetAll.classList.contains("remove-todo")){
    parentaAll.remove();
   }
});

canceleditBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleforms();
});

editform.addEventListener("submit", (e)=>{
    e.preventDefault();
    const editInputValue =  editInput.value;

    if(editInput.value){
       updatetodo(editInputValue);
    }
    toggleforms();
});

searchInput.addEventListener("keyup", (e)=>{
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e)=>{
    const filterValue = e.target.value;

    filterTodos(filterValue);
})

//local Storage
const getTodosLocalStorage = ()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = ()=>{
    const todos = getTodosLocalStorage();

    todos.forEach((todo)=>{
        saveTodo(todo.text, todo.done, 0);

    });
};

const saveTodoLocalStorage = (todo)=>{
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText)=>{
    const todos = getTodosLocalStorage();

    const filteredText = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredText));
};

const updateTodoStatusLocalStorage = (todoText) =>{
    const todos = getTodosLocalStorage();

    todos.map((todo)=>{
        todo.text === todoText ? (todo.done = !todo.done) : null;
    });

    localStorage.setItem("todos", JSON.stringify(todos))

};

const updateTodoLocalStorage = (todoOldText,todoNewText)=>{
    const todos = getTodosLocalStorage();

    todos.map((todo)=>{
        todo.text === todoOldText ? (todo.text = todoNewText) : null;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
console.log