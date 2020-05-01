main = document.getElementById('main')
addUserbtn = document.getElementById('add-user')
doublebtn = document.getElementById('double')
showMillibtn = document.getElementById('show-millionaires')
sortbtn = document.getElementById('sort')
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

// Sort users by richest
function sortByRich(){
    data.sort((a,b) => b.money - a.money)
    updateDOM()
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
sortbtn.addEventListener('click', sortByRich)