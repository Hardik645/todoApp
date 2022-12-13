const form = document.getElementById("addSection");
const input = document.getElementById("addSection_input");
const todoList=document.getElementById("todoList");

//push data from input to LS
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value){
    const newTodos = [input.value,0];
    input.value="";
    let LS = JSON.parse(localStorage.getItem("todos"));
    LS = LS === null
        ? JSON.stringify([newTodos])
        : JSON.stringify([...LS, newTodos]);
    localStorage.setItem("todos", LS)
    fetchLS(JSON.parse(LS));
    }
});

//add cards to screen
const fetchLS = (LS) => {
    todoList.innerHTML=``;
LS.forEach(ele => {
    const div=document.createElement("div");
    div.classList.add("todos")
    div.innerHTML=` <span class="todos_context">${ele[0]}</span>
                    <i class="fa-solid fa-trash"></i>`;
    todoList.appendChild(div);

//add completed/uncompleted functionality
    const span=div.querySelector("span");
    if(ele[1]){span.classList.toggle("check");}
    span.addEventListener("click",()=>{
        span.classList.toggle("check");
        if(span.classList.contains("check")){
            set(span.innerHTML,1)
        }
        else{
            set(span.innerHTML,0)
        }
    })
//delete data from LS
    const trash=div.querySelector("i");
    trash.addEventListener("click",()=>{
        let LS = JSON.parse(localStorage.getItem("todos"));
        let updatedLS=[];
        LS.forEach(element => {
            if(element[0]!==span.innerHTML)
                updatedLS.push(element);
        });
        // console.log(LS)
        localStorage.setItem("todos", JSON.stringify(updatedLS)) 
        todoList.removeChild(div);
    })
});
}
//toggle between complete and uncomplete task on LS
const set=(t,n)=>{
    let LS = JSON.parse(localStorage.getItem("todos"));
        let updatedLS=[];
        LS.forEach(element => {
            if(element[0]===t)
                updatedLS.push([t,n]);
            else
                updatedLS.push(element);
        });
        localStorage.setItem("todos", JSON.stringify(updatedLS))
}

// fetch data after reload or start of webpage
const LS = JSON.parse(localStorage.getItem("todos"));
    LS === null
    ? console.log("empty todos") : fetchLS(LS);
