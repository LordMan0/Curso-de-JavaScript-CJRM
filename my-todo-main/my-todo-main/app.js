const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const divSearchTodo = document.querySelector('.div-search-todo')

const addTodo = inputValue => {
    if (inputValue){
        todosContainer.innerHTML += `
        <li class="list-group-item d-flex bg-highlight justify-content-between">
            <span>${inputValue}</span>
            <i class="far fa-check-circle my-auto"></i>
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

const removeTodo = (eventTarget, isAIconTag) => {
    if (isAIconTag) {        
        eventTarget.parentElement.style.textDecoration = 'line-through'
        setTimeout(() => {
            eventTarget.parentElement.remove()
        }, 300)
    }
}

todosContainer.addEventListener('click', event => {
    const eventTarget =  event.target
    const isAIconTag = eventTarget.tagName === 'I'
    
    removeTodo(eventTarget, isAIconTag)
})

const manipulateItemClass = (item, classToRemove, classToAdd) => {
    item.classList.remove(classToRemove)
    item.classList.add(classToAdd)
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
            notNeededLi.classList.remove('d-flex')
            notNeededLi.classList.add('d-none')
        })
    } else {
        lisArray.forEach(li => {
            manipulateItemClass(li, 'd-none', 'd-flex')
        })
    } 
}

divSearchTodo.addEventListener('input', event => {
    event.preventDefault()
    const inputValue = event.target.value.trim().toLowerCase()
    const lisArray = Array.from(todosContainer.children)

    searchTodo(inputValue, lisArray)
})