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

// add Data
function addData(obj){
    data.push(obj)
}