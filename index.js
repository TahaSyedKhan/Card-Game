
let deckId

document.getElementById('new-deck').addEventListener('click', () => {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
    })
})


document.getElementById('draw-cards').addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('cards').innerHTML = `
                <img src='${data.cards[0].image}'/>
                <img src='${data.cards[1].image}'/>
            `
        })
})