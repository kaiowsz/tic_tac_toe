document.addEventListener('DOMContentLoaded', loadAll)

function loadAll() {
    document.querySelectorAll('.piece').forEach(piece => {
        piece.addEventListener('click', search)
    })
}

document.querySelector('.player1').addEventListener('click', changeNick)
document.querySelector('.player2').addEventListener('click', changeNick)

let actualMove = 0;

let player1Symbol = '◯'
let player2Symbol = '⤬'

let player1Moves = []
let player2Moves = []

let player1Score = 0
let player2Score = 0

let nameP1 = 'Player 1'
let nameP2 = 'Player 2'
let nameP1display = document.querySelector('.player1')
let nameP2display = document.querySelector('.player2')

let player1Display = document.querySelector('.scoreP1')
let player2Display = document.querySelector('.scoreP2')

let chancesWin = [[0, 4, 8], 
                [2, 4, 6],
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]]

// 0 -> Player 1
// 1 -> Player 2
let played = 0

function search(event) {
    let clicked = event.target.id

    changeMove(clicked)
}

function changeNick(event) {
    try {
        let nick = prompt('Type your nickname:')

        if (event.target == nameP1display) {
            nameP1 = nick
        } else if (event.target == nameP2display) {
            nameP2 = nick
        }

        if (nick == null) {
            throw 'Nickname empty.'
        }

        if (nick == '') {
            throw 'Nickname empty.'
        }

        if (nick.length >= 18) {
            throw 'Nickname too long.'
        }
        
        event.target.textContent = nick
    } catch (error) {
        alert(error)
    }
}

function changeMove(clicked) {

    if (document.getElementById(`${clicked}`).textContent != '') {
        return
    }

    played++

    

    if (actualMove == 0) {
        document.getElementById(`${clicked}`).textContent = player1Symbol

        player1Moves.push(Number(clicked))

        checkWin(1)

        actualMove = 1
    } else if (actualMove == 1) {
        document.getElementById(`${clicked}`).textContent = player2Symbol

        player2Moves.push(Number(clicked))

        checkWin(2)

        actualMove = 0
    }
}

function checkWin(num) {

    if (played == 9) {
        updateDisplay(0)
        return
    }

    // Interval setted up because when the player wins, the display doesn't update normally; needs a little bit of time to happen.

    let rights = []
    if (num == 1) {
       setTimeout(() => {
        chancesWin.forEach(entry => {
            for (number of entry) {
                if(player1Moves.indexOf(number) >= 0) {
                    rights.push(number)
                } 
            }
            if (rights.length == 3) {
                updateDisplay(1)
                rights = []
                return
             } else {
                rights = []
             }
        })
        }, 30); 
    }

    if (num == 2) {
        setTimeout(() => {
         chancesWin.forEach(entry => {
             for (number of entry) {
                if(player2Moves.indexOf(number) >= 0) {
                    rights.push(number)
                } 
             }
             if (rights.length == 3) {
                updateDisplay(2)
                rights = []
                return
             } else {
                rights = []
             }
         })
     }, 30); 
     }
}

function updateDisplay(num) {

    console.log(num)
    
    if(num == 1) {
        alert(`${nameP1} wins!`)
        player1Score++

        player1Display.textContent = player1Score
        resetGame()
    }

    if(num == 2) {
        alert(`${nameP2} wins!`)
        player2Score++

        player2Display.textContent = player2Score
        resetGame()
    }

    if (num == 0) {
        alert('Draw.')
        resetGame()
    }
    
}

function resetGame() {
    let test = document.querySelectorAll('.piece')
    
    test.forEach(piece => {
        piece.textContent = ''
    })

    player1Moves = []
    rights = []
    player2Moves = []
    played = 0
}