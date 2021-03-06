main = document.getElementById('main')
addUserbtn = document.getElementById('add-user')
doublebtn = document.getElementById('double')
showMillibtn = document.getElementById('showmillionaires')
sortRichbtn = document.getElementById('sort-rich')
sortPoorbtn = document.getElementById('sort-poor')
calculateWealthbtn = document.getElementById('calculate-wealth')

// put all the people in an array
let data = []
getRandomUser()
getRandomUser()
getRandomUser()
// fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    // console.log(data)
    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    // console.log(newUser)
    addData(newUser)
}

// Double everyone's money(map method)
function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2}
    })
    updateDOM()
}

// Sort users by richest & poorest
function sortByRich(){
    data.sort((a,b) => b.money - a.money)
    updateDOM()
}
function sortByPoor(){
    data.sort((a,b) => a.money - b.money)
    updateDOM()
}
// Filter only millionaires
function showMilli(){
    data = data.filter(user => user.money > 1000000)
    updateDOM()
}

// calculate total wealth
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)
    const wealthEle= document.createElement('div')
    wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEle)
}
// add Data
function addData(obj){
    data.push(obj)
    updateDOM()
}

function updateDOM(providedData = data){
    // Clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item=>{
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}
// Format number as money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}


// EventListeners
addUserbtn.addEventListener('click', getRandomUser)
doublebtn.addEventListener('click', doubleMoney)
sortRichbtn.addEventListener('click', sortByRich)
sortPoorbtn.addEventListener('click', sortByPoor)
showMillibtn.addEventListener('click', showMilli)
calculateWealthbtn.addEventListener('click', calculateWealth)