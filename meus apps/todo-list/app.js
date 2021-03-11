const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.input-search-todo')

const addTodo = inputValue => {
    if (inputValue) {
        todosContainer.innerHTML += `
        <li class="list-group-item d-flex bg-highlight justify-content-between" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt my-auto" data-trash="${inputValue}"></i>
        </li>
        `
    }
    
    event.target.reset()
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()
    addTodo(inputValue)
})

const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
    
    if (trashDataValue) {
        todo.remove()        
    }
}

todosContainer.addEventListener('click', event => {
    const clickedElement =  event.target   
    removeTodo(clickedElement)
})

const filterTodo = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchedTodos ? matchedTodos : !matchedTodos
    })

const manipulateClasses = (todos, classToRemove, classToAdd) => {
    todos.forEach(todo => {
        todo.classList.remove(classToRemove)
        todo.classList.add(classToAdd)
    })
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodo(todos, inputValue, true)
    manipulateClasses(todosToHide, 'd-none', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodo(todos, inputValue, false)
    manipulateClasses(todosToShow, 'd-flex', 'd-none')
}

const searchTodo = (inputValue, lisArray) => {
    const neededLisArray = lisArray
        .filter(liArray => liArray.textContent.toLowerCase().includes(inputValue))
    const notNeededLisArray = lisArray
        .filter(liArray => !liArray.textContent.toLowerCase().includes(inputValue))

    if (inputValue) {
        neededLisArray.forEach(neededLi => {
            manipulateItemClass(neededLi, 'd-none', 'd-flex')
        })
        notNeededLisArray.forEach(notNeededLi => {
            manipulateItemClass(notNeededLi, 'd-flex', 'd-none')
        })
    } else {
        lisArray.forEach(li => {
            manipulateItemClass(li, 'd-none', 'd-flex')
        })
    } 
}

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children)

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
})