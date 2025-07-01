// const { data } = required("jquery");


// let heroes = null
let tbody = document.createElement("tbody")
var size = 20
let b = document.querySelector("body")
let s = document.createElement("select")
let op = ['5', '10', '20', '50', '100', 'all results']
let search1 = document.createElement("input")
let table = document.createElement("table")
let arr = ["Icon", "Name", "Full Name", "Powerstats", "Race", "Gender", "Height", "Weight", "Place Of Birth", "Alignment"]
let thead = document.createElement("thead")
let data
let choice = false //kat3ni rah dakchi msorti b ascending order

for (let i of arr) {
    var th = document.createElement("th")
    thead.appendChild(th)
    th.textContent = i
    let btn = document.createElement("button")
    btn.className = "sort"
    btn.textContent = "sort"
    th.append(btn)
    btn.addEventListener("click", () => {
        console.log("Sorting column:", i);
        let clickValue = globMap.get(i)
        sortAlpha(data, clickValue, choice)
        clearData();
        create(data, data.length);
    });
}


fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
    .then((heroesData => {
        loadData(heroesData);
    }));


op.forEach(o => {
    let e = document.createElement("option")
    e.value = o
    e.textContent = o
    s.appendChild(e)
});

b.appendChild(s)
b.appendChild(search1)

function clearData() {
    tbody.innerHTML = ""
}

function loadData(input) {
    data = input
    if (Array.isArray(data)) {
        create(data, size);

    } else {
        console.log("Data is not an array:", data);
    }
    s.addEventListener("input", () => {
        if (s.value == "all results") {
            size = data.length
        } else {
            size = Number(s.value)
        }
        clearData()
        create(data, size)

    })

    search1.addEventListener("input", () => {
        let res = search(data, search1.value)
        clearData();
        create(res, res.length)

    })

        // th.addEventListener("click", () => { 
        //     let clickContent = th.textContent
        //     let clickValue = globMap.get(clickContent);
        //     sortAlpha(data, clickValue)

        // })
};


function search(data, searchValue) {
    return data.filter((hero) => hero.name.includes(searchValue))
}


function create(data, size) {
    let pagination = 0
    data = data.slice(pagination, size);
    data.forEach((hero, idx) => {
        // console.log(size);

        let tr = document.createElement("tr")
        let tdI = document.createElement("td")
        let icon = document.createElement("img")
        icon.src = hero.images.xs
        tdI.appendChild(icon)
        tr.appendChild(tdI)

        let tdN = document.createElement("td")
        let name = document.createElement("div")
        name.textContent = hero.name
        tdN.appendChild(name)
        tr.appendChild(tdN)


        let tdF = document.createElement("td")
        let Fname = document.createElement("div")
        Fname.textContent = hero.biography.fullName
        tdF.appendChild(Fname)
        tr.appendChild(tdF)

        let tdP = document.createElement("td")
        let P = document.createElement("div")
        P.textContent = Object.values(hero.powerstats).join(',')
        tdP.appendChild(P)
        tr.appendChild(tdP)

        let tdR = document.createElement("td")
        let R = document.createElement("div")
        R.textContent = hero.appearance.race
        tdR.appendChild(R)
        tr.appendChild(tdR)

        let tdG = document.createElement("td")
        let G = document.createElement("div")
        G.textContent = hero.appearance.gender
        tdG.appendChild(G)
        tr.appendChild(tdG)

        let tdH = document.createElement("td")
        let H = document.createElement("div")
        H.textContent = hero.appearance.height[1]
        tdH.appendChild(H)
        tr.appendChild(tdH)

        let tdW = document.createElement("td")
        let W = document.createElement("div")
        W.textContent = hero.appearance.weight[1]
        tdW.appendChild(W)
        tr.appendChild(tdW)

        let tdPl = document.createElement("td")
        let Pl = document.createElement("div")
        Pl.textContent = hero.biography.placeOfBirth
        tdPl.appendChild(Pl)
        tr.appendChild(tdPl)

        let tdA = document.createElement("td")
        let A = document.createElement("div")
        A.textContent = hero.biography.alignment
        tdA.appendChild(A)
        tr.appendChild(tdA)
        tbody.appendChild(tr)
        pagination = idx
        // count++
    });

    table.append(tbody)
}


table.appendChild(thead)
b.appendChild(table)

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function sortAlpha(data, path, choice) {
    let alphabet = 'abcdefjhigklmnopqrstuvwxyz'
    data.sort((heroA, heroB) => {
        heroA = getNestedValue(heroA, path)
        heroB = getNestedValue(heroB, path)
            if (heroA == "" && heroB == ""){
                choice = true
                return 0
            }else if (heroA == ""){
                choice = true
                return 1
            }else if (heroB == ""){
                choice = true
                return -1
            }
            if (!choice){
                let diff = alphabet.indexOf(heroA[0].toLowerCase()) - alphabet.indexOf(heroB[0].toLowerCase())
            }else{
                let diff = alphabet.indexOf(heroB[0].toLowerCase()) - alphabet.indexOf(heroA[0].toLowerCase())
            }
            return diff
    })
}

let globMap = new Map([
    ["Name", "name"],
    ["Full Name", "biography.fullName"],
    ["Powerstats", "powerstats"],
    ["Race", "appearance.race"],
    ["Gender", "appearance.gender"], 
    ["Height", "appearance.height[1]"], 
    ["Weight", "appearance.weight[1]"],
    ["Place Of Birth", "biography.placeOfBirth"],
    ["Alignment", "biography.alignment"],
])


