const cards = document.getElementById('cards')
const newDeck = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-cards')

let deckId

newDeck.addEventListener('click', () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
    })
})


drawCards.addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cards.children[0].innerHTML = `<img class='cards' src='${data.cards[0].image}'/> ` 
            cards.children[1].innerHTML = `<img class='cards' src='${data.cards[1].image}'/>`
        })
})