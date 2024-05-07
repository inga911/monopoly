const body = document.querySelector('body')
const table = document.querySelector('.table')
const rollBtn = document.querySelector('.rollBtn')
const result = document.querySelector('h3')
const playerMoney = document.querySelector('.player-money')
const buyBtn = document.querySelector('.buy')
const payBtn = document.querySelector('.pay')
const boughtStreets = document.querySelector('.bought-streets')
const boughtStreetCountHtml = document.querySelector('.bought-street-count')
const goToJailBtn = document.querySelector('.go-to-jail')
const info = document.querySelector('.info')
const diceResult = document.querySelector('.dice-result')

let playerPosition = 1
let money = 1000
let bought = []
let boughtStreetCount = 0

goToJailBtn.classList.add('disable')

const dicesImg = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dice-1.svg/900px-Dice-1.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dice-2.svg/900px-Dice-2.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dice-3.svg/900px-Dice-3.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dice-4.svg/900px-Dice-4.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dice-5.svg/900px-Dice-5.svg.png?20231029125339',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dice-6.svg/900px-Dice-6.svg.png'
]

const cellArr1 = [
    1, 2, 3, 4, 5, 6, 7, 8,
    24, 0, 0, 0, 0, 0, 0, 9,
    23, 0, 0, 0, 0, 0, 0, 10,
    22, 0, 0, 0, 0, 0, 0, 11,
    21, 0, 0, 0, 0, 0, 0, 12,
    20, 19, 18, 17, 16, 15, 14, 13,
];




const items1 = {
    1: { color: '#d72e0500', price: '' },
    2: { color: '#906b5d', price: 50 },
    3: { color: '#906b5d', price: 50 },
    4: { color: '#d72e0500', price: -200, bonus: 'tax' },
    5: { color: '#906b5d', price: 250 },
    6: { color: '#d72e0500', price: 200, bonus: 'train' },
    7: { color: '#bdd9fd', price: 100 },
    8: { color: '#d72e0500', price: '' },
    9: { color: '#bdd9fd', price: 120 },
    10: { color: '#d72e0500', price: 200, bonus: 'train' },
    11: { color: '#c981d5', price: 140 },
    12: { color: '#c981d5', price: 180 },
    13: { color: '#d72e0500', price: '' },
    14: { color: '#fea25b', price: 180 },
    15: { color: '#D72E05', price: 200 },
    16: { color: '#d72e0500', price: 200, bonus: 'train' },
    17: { color: '#D72E05', price: 220 },
    18: { color: '#D72E05', price: 220 },
    19: { color: '#ECFA67', price: 200 },
    20: { color: '#d72e0500', price: '' },
    21: { color: '#ECFA67', price: 250 },
    22: { color: '#d72e0500', price: 200, bonus: 'train' },
    23: { color: '#38A170', price: 300 },
    24: { color: '#d72e0500', price: -200, bonus: 'tax' },
};

function shake() {
    diceResult.innerHTML = '';
    const randomNumb = Math.ceil(Math.random() * 6);
    result.innerHTML = `Result: ${randomNumb} `
    playerPosition += randomNumb;
    const img = document.createElement('img')
    img.className = 'dice-img shake'
    img.src = dicesImg[randomNumb - 1]
    diceResult.appendChild(img);
    setTimeout(() => {
        img.classList.remove('shake');
    }, 1500);
}


function appendMap() {
    table.innerHTML = '';
    cellArr1.forEach(cell => {
        const cellInfo = items1[cell];
        const cellClass = cell ? 'cell' : '';
        const backgroundColor = cellInfo ? `style="background-color: ${cellInfo.color}"` : '';
        const isBought = bought.includes(cell);
        const boughtBgColor = isBought ? `background-color: ${cellInfo.color}70;` : '';

        const cellStyle = cell === 8 ?
            `background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/211150c9-41cd-4ca6-b441-319618afe9bb/df2s8zo-23726de2-3dd8-45b6-8b34-ec8ddead8a38.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIxMTE1MGM5LTQxY2QtNGNhNi1iNDQxLTMxOTYxOGFmZTliYlwvZGYyczh6by0yMzcyNmRlMi0zZGQ4LTQ1YjYtOGIzNC1lYzhkZGVhZDhhMzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OZ9i6OoAFqa5iV2MHsnRPOKKu9j558hIOuYXO802uts');` :
            (cell === 13 ?
                `background-image: url('https://images.fineartamerica.com/images/artworkimages/medium/3/free-parking-monopoly-zee-designs-transparent.png');"` :
                cell === 20 ?
                    `background-image: url('https://d1w8c6s6gmwlek.cloudfront.net/partyhardtees.com/overlays/372/503/37250318.png');"` :
                    (cellInfo && cellInfo.bonus === 'train' ?
                        `background-image: url('https://lh3.googleusercontent.com/proxy/-lctFkVIDYyyu8wktsjSOtC-ZU8oAKbQQb_qaQaaTfmZp3Ul9sOSd072NU-G8tAWAzykPlmrfES8JdJBhtosLQ6Rq2xzrSBKPXHx1zwuu_x6NyLjmjwh2JO7P8VmtuKdiHRiFk8zOFjhftk_33F05-PmvuOPaeqThwIQzCvvEvAfACLlRu8a');"` :
                        boughtBgColor));

        table.innerHTML += `
            <div style="${cellStyle}" class="${cellClass}">
                ${cellInfo ? `<div ${backgroundColor} class="price-box">${cellInfo.price}</div>` : ''}
                ${cell ? cell : ''}
                ${cell === 1 ? '<div class="go1">GO &#8594;</div><div class="go">You get <b>$200</b></div>' : ''}
                ${cell === 4 ? '<div class="tax1">INCOME TAX</div><div  class="tax">You have pay <b>$200</b></div>' : ''}
                ${cell === 24 ? '<div class="tax1">LUXURY TAX</div><div  class="tax">You have pay <b>$200</b></div>' : ''}
                ${cell === playerPosition ? "<div class=\"player\"></div>" : ""}
            </div>
        `;
    });
    if (playerPosition === 20) {
        info.innerHTML = 'You have to go to jail'
        rollBtn.classList.add('disable')
        buyBtn.classList.add('disable')
        payBtn.classList.add('disable')
        goToJailBtn.classList.remove('disable')
    }
    if (playerPosition === 4 || playerPosition === 24) {
        info.innerHTML = 'You have to pay'
        rollBtn.classList.add('disable')
        buyBtn.classList.add('disable')
        goToJailBtn.classList.add('disable')
    }
}
appendMap()


function buyStreet() {
    const street = playerPosition
    const streetcolor = items1[playerPosition].color
    const cost = items1[playerPosition].price

    const eachStreet = document.createElement('div')
    eachStreet.className = 'each-street'
    eachStreet.style.backgroundColor = `${streetcolor}`
    eachStreet.textContent = `Street: ${street} | Cost: $${cost} `

    if (bought.includes(street)) {
        alert("This street has already been purchased.");
        return;
    }

    if (money >= cost) {
        money -= cost
        boughtStreets.appendChild(eachStreet)
        bought.push(street)
        updatePlayerMoney()
        return
    } else {
        alert('not enough money')
    }

    if (streetcolor === '#d72e0500') {
        console.log('street color');
    }
}


rollBtn.onclick = () => {
    shake()
    if (playerPosition > 24) {
        playerPosition -= 24
        money += 200
        updatePlayerMoney()
    }
    setTimeout(() => {
        appendMap()
    }, 1000)
}

buyBtn.onclick = () => {
    const street = playerPosition;

    if (street === 8 || street === 13 || street === 1) {
        alert('these properties cannot be bought');
    } else {
        buyStreet();
    }
    boughtStreetCount = bought.length
    boughtStreetCountHtml.innerHTML = `Bought streets: ${boughtStreetCount}`
}

payBtn.onclick = () => {
    money += Number(items1[playerPosition].price)
    updatePlayerMoney()
    rollBtn.classList.toggle('disable')
    buyBtn.classList.toggle('disable')
    goToJailBtn.classList.toggle('disable')
    info.innerHTML = ''
}

goToJailBtn.onclick = () => {
    playerPosition = 8
    appendMap()
    rollBtn.classList.toggle('disable')
    buyBtn.classList.toggle('disable')
    payBtn.classList.toggle('disable')
    goToJailBtn.classList.toggle('disable')
    info.innerHTML = ''
}

function updatePlayerMoney() {
    playerMoney.innerHTML = `Money: $${money} `
}
