function handleColor(event, type) {
    const elements = Array.from(document.getElementsByClassName(type))

    elements.forEach(element => {
        element.style.backgroundColor = event.target.value;
    })
}

function checkValues() {
    const rowSelector = ".accounting-row"

    document.querySelectorAll(".price").forEach(input => {
        const row = input.closest(rowSelector)
        const isBiggerThanThousand = parseFloat(input.value) > 1000

        row.classList.toggle("green", isBiggerThanThousand)
    })
}

function addCountingListeners() {
    const rowSelector = ".accounting-row"
    const inputs = document.querySelectorAll(".input-element")

    inputs.forEach(input => {
        const row = input.closest(rowSelector)

        input.addEventListener("change", () => count(row))
    })
}

function count(row) {
    const priceInput = row.querySelector(".price")
    const amountInput = row.querySelector(".amount")
    const taxInput = row.querySelector(".tax")

    const price = parseFloat(priceInput.value)
    const amount = parseFloat(amountInput.value)
    const tax = parseFloat(taxInput.value)

    const gross = (price * tax / 100) + price
    const netValue = price * amount
    const grossValue = gross * amount

    const grossPriceElement = row.querySelector(".grossPrice")
    const netValueElement = row.querySelector(".netValue")
    const grossValueElement = row.querySelector(".grossValue")

    grossPriceElement.innerText = gross.toFixed(2)
    netValueElement.innerText = netValue.toFixed(2)
    grossValueElement.innerText = grossValue.toFixed(2)
}
    
function populateModal(id, nip, regon, name, isVat, street, house, flat) {
    const a = document.getElementById("id-holder")
    a.dataset.indexNumber = id
    document.getElementById("nip-edit").value = nip
    document.getElementById("regon-edit").value = regon
    document.getElementById("name-edit").value = name
    document.getElementById("is-vat-edit").checked = isVat
    document.getElementById("street-edit").value = street
    document.getElementById("house-edit").value = house
    document.getElementById("flat-edit").value = flat
}

function editContractor(){
    const insertData = {
        id: document.getElementById("id-holder").dataset.indexNumber,
        nip: document.getElementById("nip-edit").value,
        regon: document.getElementById("regon-edit").value,
        name: document.getElementById("name-edit").value,
        isVat: document.getElementById("is-vat-edit").checked,
        street: document.getElementById("street-edit").value,
        house: document.getElementById("house-edit").value,
        flat: document.getElementById("flat-edit").value
    }


    const url = "/edit"
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: JSON.stringify(insertData),
    })
    .then(res => res.status === 200 ? location.reload() : null)
}

function insertContractor() {    
    const insertData = {
        nip: document.getElementById("nip-create").value,
        regon: document.getElementById("regon-create").value,
        name: document.getElementById("name-create").value,
        isVat: document.getElementById("is-vat-create").checked,
        street: document.getElementById("street-create").value,
        house: document.getElementById("house-create").value,
        flat: document.getElementById("flat-create").value
    }


    const url = "/insert"
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: JSON.stringify(insertData),
    })
    .then(res => res.status === 200 ? location.reload() : null)
}


function deleteEntry(id) {
    const url = "/delete"
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const insertData = {
        id
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: JSON.stringify(insertData),
    })
    .then(res => res.status === 200 ? location.reload() : null)
}

addCountingListeners()

document.getElementById("submit-insert")?.addEventListener("click", insertContractor)
document.getElementById("submit-edit")?.addEventListener("click", editContractor)
document.getElementById("check-value-button")?.addEventListener("click", checkValues)