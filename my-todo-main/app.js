const addTodo = document.querySelector('.add-todo')
const todoContainer = document.querySelector('.todos-container')
const searchTodo = document.querySelector('.search-todo')

addTodo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()

    todoContainer.innerHTML += `
    <li class="list-group-item d-flex bg-highlight justify-content-between">
        <span>${inputValue}</span>
        <i class="far fa-check-circle my-auto"></i>
    </li>
    `

    event.target.reset()
})

todoContainer.addEventListener('click', event => {
    if (event.target.tagName === 'I') {
        
        event.target.parentElement.style.textDecoration = 'line-through'
        setTimeout(() => {
            event.target.parentElement.remove()
        }, 300)
    }
})

searchTodo.addEventListener('input', event => {
    event.preventDefault()
    const inputValue = event.target.value.trim().toLowerCase()
    const lisArray = Array.from(todoContainer.children)
    const neededLisArray = lisArray
        .filter(liArray => liArray.textContent.toLowerCase().includes(inputValue))
    const notNeededLisArray = lisArray
        .filter(liArray => !liArray.textContent.toLowerCase().includes(inputValue))

    if (inputValue) {
        neededLisArray.forEach(neededLi => {
            neededLi.classList.remove('d-none')
            neededLi.classList.add('d-flex')
        })
        notNeededLisArray.forEach(notNeededLi => {
            notNeededLi.classList.remove('d-flex')
            notNeededLi.classList.add('d-none')
        })
    } else {
        lisArray.forEach(li => {
            li.classList.remove('d-none')
            li.classList.add('d-flex')
        })
    } 
    
    
})