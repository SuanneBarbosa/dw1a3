let actionState = false
let inicio = 1500
let final = 0
let timerInterval;
let segundos = 0
let minutos = Math.floor(inicio/60) 
let modificadorPomodoro = 0
let modificadorShortBreak = 0 
let modificadorLongBreak = 0
const pomodoroValue = 1500
const shortBreakValue = 300
const longBreakValue = 900

function changeButtonText(newText) {
    let actionButton = document.getElementById("actionButton")
    actionButton.innerHTML = newText
}

function actionTimer() {
    if (!actionState) {
        changeButtonText('STOP')
        iniciarCronometro()
    } else {
        changeButtonText('START')
        clearInterval(timerInterval)
    }
    actionState = !actionState
}

function changeTimer (newStarValue) {
    clearInterval(timerInterval)
    inicio = newStarValue
    segundos = 0
    minutos = Math.floor(inicio/60)
    timerExibition()
}

function verificarTempoMinimo (value, modificador, time){
    if ( (value + modificador + time) < 60) { 
        throw new Error("Tempo mínimo alcançado!")
    }      
}

function actionModificar(time, action){
    try {
        let tempoTotal = 0
        if (action == "pomodoro") { 
            verificarTempoMinimo(pomodoroValue, modificadorPomodoro, time)
            modificadorPomodoro += time 
            tempoTotal = pomodoroValue + modificadorPomodoro
            
        } else if (action == "shortBreak"){
            verificarTempoMinimo(shortBreakValue, modificadorShortBreak, time)
            modificadorShortBreak += time 
            tempoTotal = shortBreakValue + modificadorShortBreak
        } else {
            verificarTempoMinimo(longBreakValue, modificadorLongBreak, time)
            modificadorLongBreak += time 
            tempoTotal = longBreakValue + modificadorLongBreak
        }    
        changeTimer(tempoTotal)  
    } catch (error) {
        alert(error.message)
    }
}

function actionPomodoro () {
    changeTimer(pomodoroValue + modificadorPomodoro)
}

function actionShortBreak () {
   changeTimer(shortBreakValue + modificadorShortBreak)
   
}

function actionLongBreak () {
    changeTimer(longBreakValue + modificadorLongBreak)
}

function beep () {
    var audio = new Audio('beep beep.mp3')
    audio.play()
}

function iniciarCronometro() {
   timerInterval = setInterval(() => {
        if(segundos == 0) {
            if(minutos == 0) {
                actionPomodoro()
                beep ()
                changeButtonText('START')
                return
            }
            segundos = 60 
            minutos--
        } 
        inicio-- 
        segundos-- 
        timerExibition()
    }, 1000)
}

function timerExibition () {
    let timerText = document.getElementById("timerText")
    timerText.innerHTML = `${(minutos < 10) ? "0" + minutos : minutos}:${(segundos < 10) ? "0" + segundos : segundos}`
}