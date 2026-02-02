const cards = document.getElementById('cards')
const newDeck = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')
const cardNo = document.getElementById('card-no')
const headerText = document.getElementById('header-text')

let deckId
let computerScore = 0
let myScore = 0

newDeck.addEventListener('click', () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        cardNo.textContent = data.remaining
    })
})


drawCards.addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardNo.textContent = data.remaining
            cards.children[0].innerHTML = `<img class='cards' src='${data.cards[0].image}'/> ` 
            cards.children[1].innerHTML = `<img class='cards' src='${data.cards[1].image}'/>`

            const handText =  determineWinner(data.cards[0], data.cards[1])
            headerText.textContent = handText

            document.getElementById('computer-score').textContent = computerScore
            document.getElementById('my-score').textContent = myScore

            if(data.remaining === 0) {
                drawCards.disabled = true

                if(computerScore > myScore) {
                    headerText.textContent = "Computer wins!"
                } else if (computerScore < myScore) {
                    headerText.textContent = "You win!"
                } else {
                    headerText.textContent = "It's a tie"
                }
            }
        })
})

function determineWinner(card1, card2) {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9","10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = values.indexOf(card1.value)
    const card2Value = values.indexOf(card2.value)

    if(card1Value > card2Value) {
        computerScore++
        return "Computer's Hand"
    } else if (card1Value < card2Value) {
        myScore++
        return "Your Hand"
    } else {
        return "War!"
    }
}