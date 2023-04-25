//Sélection de toutes les cartes
const cards = document.querySelectorAll(".card");

//fonction pour mélanger les cartes
function shuffleCards(){
    cards.forEach(card => {
        const randomPos = Math.trunc(Math.random() * 12);
        // console.log(randomPos);
        card.style.order = randomPos;
    });
}

shuffleCards()


//Pour faire pivoter les cartes
cards.forEach(card => card.addEventListener("click", flipAcard));

let locked = false; //pour vérouiller les bonnes cartes trouvées
let cardsPicked = [];
function flipAcard(e){
    if(locked) return;

    // console.log(e.target.children[0], e.target.getAttribute("data-attr"));

    saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

    //Pour empêcher de cliquer plus de 2 cartes
    if(cardsPicked.length ===2) result();
}

function saveCard(el, value){
    if(el === cardsPicked[0]?.el) return;

    el.classList.add("active");
    cardsPicked.push({el, value});
    console.log(cardsPicked);
}

function result(){
    if(cardsPicked[0].value === cardsPicked[1].value){
        cardsPicked[0].el.parentElement.removeEventListener("click", flipAcard);
        cardsPicked[1].el.parentElement.removeEventListener("click", flipAcard);
        cardsPicked = [];
        return;
    }
    locked = true;
    setTimeout(() => {
        cardsPicked[0].el.classList.remove("active");
        cardsPicked[1].el.classList.remove("active");
        cardsPicked = [];
        locked = false;
    }, 1000)
}