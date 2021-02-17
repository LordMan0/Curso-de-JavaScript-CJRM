const form = document.querySelector('.quiz-form')
const finalScore = document.querySelector('.final-score')
const correctAnswers = ['B', 'A', 'D', 'C']
const span = finalScore.querySelector('span')
const congratulationsText = finalScore.querySelector('.congratulations')

let score = 0
let counter = 0
const userAnswers = []

const getUserAnswers = () => {
    correctAnswers.forEach((_,index) => {
        const inputQuestion = `inputQuestion${index+1}`
        userAnswers.push(form[inputQuestion].value)
    })
}

const correctingTheAnswers = () => {
    userAnswers.forEach((userAnswer, index) => {
        const isTheAnsewrCorrect = userAnswer === correctAnswers[index]
        if (isTheAnsewrCorrect) {
            score += 25
        }
    })
}

const showTheFinalResult = () => {
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    finalScore.classList.remove('d-none')
}

const animatedFinalResult = () => {
    const interval = setInterval(() => {
        if (counter === score) {clearInterval(interval)}
        span.textContent = `${counter++}%`
    }, 10)

        if (score === 100) {
            setTimeout(() => {
                congratulationsText.classList.remove('d-none')
        }, 1000)
    }
}

form.addEventListener('submit', event => {
    event.preventDefault()

    getUserAnswers()
    correctingTheAnswers()
    showTheFinalResult()    
    animatedFinalResult() 
})
