const form = document.querySelector('.quiz-form')
const finalScore = document.querySelector('.final-score')
const correctAnswers = ['B', 'A', 'D', 'C']
const finalScoreContainer = finalScore.querySelector('.finalScoreContainer')
const congratulationsText = finalScore.querySelector('.congratulations')

let score = 0
let counter = 0
let userAnswers = []

const getUserAnswers = () => {
    correctAnswers.forEach((_,index) => {
        const inputQuestion = `inputQuestion${index + 1}`
        userAnswers.push(form[inputQuestion].value)
    })
}

const correctTheAnswers = () => {
    userAnswers.forEach((userAnswer, index) => {
        const isTheAnswerCorrect = userAnswer === correctAnswers[index]
        if (isTheAnswerCorrect) {
            return score += 25
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

const animateFinalResult = () => {
    
    if (score === 0) {
        return finalScoreContainer.textContent = `0%`
    }

    const interval = setInterval(() => {

        if (counter === score) {
            return clearInterval(interval)
        }


        finalScoreContainer.textContent = `${++counter}%`
    }, 10)

        if (score === 100) {
            setTimeout(() => {
                congratulationsText.classList.remove('d-none')
        }, 1000)
    }
}

const resetFinalScore = () => {
    score = 0
    counter = 0
    userAnswers = []
    congratulationsText.classList.add('d-none')
}

form.addEventListener('submit', event => {
    event.preventDefault()
    resetFinalScore()
    
    getUserAnswers()
    correctTheAnswers()
    showTheFinalResult()    
    animateFinalResult()
    
    console.log(score, counter)
})