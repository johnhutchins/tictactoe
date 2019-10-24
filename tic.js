
class Player {
    contructor(name){
        this.name = name
    }
    cellsChosen = []
}
let playerX = new Player('Player X')
let playerO = new Player('Player O')

let winningPossibilities = [
    ['1','2','3'],
    ['1','5','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','5','7'],
    ['3','6','9'],
    ['4','5','6'],
    ['7','8','9']
]

let arr = []

$(document).ready(function() {
    let whichPlayer = playerX
    let text = $("#playerTurn")

    $('.box').click(function() {
        if(whichPlayer === playerX){
            this.append('X')
            $(this).addClass('disabled')
            checkGridFull()  
            whichPlayer.cellsChosen.push(this.id)
            //TODO if array is bigger than three, need to verify all the combinations...
            if(whichPlayer.cellsChosen.length >= 3){
                cleanInput(whichPlayer.cellsChosen)
            }
            text.empty()
            text.append('It is now player Os turn')
            return whichPlayer = playerO
        }
        if(whichPlayer === playerO){
            this.append('O')
            $(this).addClass('disabled')
            checkGridFull()
            whichPlayer.cellsChosen.push(this.id)
            if(whichPlayer.cellsChosen.length >= 3){
                cleanInput(whichPlayer.cellsChosen)
            }
            text.empty()
            text.append('It is now player Xs turn')
            return whichPlayer = playerX
        }
    });
    $('#playAgain').on('click',()=>{
        location.reload()
    })
});


function cleanInput(cellsChosenArray){
    let mutatedArr = cellsChosenArray.sort(function(a, b){return a-b})
    isArrWinner(mutatedArr)
}

function isArrWinner(cleanedArr){
    for(let j=0;j<winningPossibilities.length;j++){
        let isWinner = true
        let arr = winningPossibilities[j]
        for(let i=0;i<arr.length;i++){
            //console.log('check against arr === ',arr)
            if(!cleanedArr.includes(arr[i])){
                isWinner = false
                break
            }
        }
        if(isWinner){
            $('.game-board').replaceWith('<img src="http://www.quickmeme.com/img/5d/5db4d3777ccf3c798b0ae2fc7fdda76cc345da3fae63b335647d8f3fd228fda6.jpg"></img>')
            console.log("WINNER WINNER WINNER WINNER")
            break
        }
    }

    winningPossibilities.forEach((arr)=>{
        if(JSON.stringify(cleanedArr) === JSON.stringify(arr)){
            console.log("weiner")
        }
    })
}

function checkGridFull(){
    $('.box').each(function(){
        if($(this).hasClass('disabled')===true){
            if(!arr.includes(this.id)){
                arr.push(this.id)
            }
        } 
    })
    if(arr.length === 9){
        $('.game-board').replaceWith('<img src="https://media.makeameme.org/created/yeah-you-guys-8lqkrt.jpg"></img>')
        console.log("GAME IS FULL")
    }
    return true
}