let container = document.getElementById('container');
let loadBtn = document.getElementById('loadBtn');
let search = document.getElementById('search');


let page = 1;
let limit = 3;

const renderData = async () => {
    let skip = (page - 1) * limit;
    const res = await fetch(`https://65745c66f941bda3f2afa6af.mockapi.io/products?page=${page}&limit=${limit}&skip=${skip}`)
    const data = await res.json()
    db = data;
    db.forEach(item => {
        let cart = document.createElement('div')
        cart.className = "cart"
        cart.innerHTML = `
        <img src="${item.image}" alt="">
        <h3>${item.name}</h3>
        <p>${item.describtoin}</p>
        <button onclick="addToBasket(${item.id})">$ ${item.price}</button>
        `;
        container.append(cart)
    });
    page++
}

loadBtn.addEventListener('click', renderData)
renderData()


const searchByName = async (name) => {

    const res = await fetch(`https://65745c66f941bda3f2afa6af.mockapi.io/products`)
    const data = await res.json()
    let flteddata = data.filter(item => item.name.toLowerCase().includes(name))
    container.innerHTML = " "
    flteddata.forEach(item => {
        let cart = document.createElement('div')
        cart.className = "cart"
        cart.innerHTML = `
        <img src="${item.image}" alt="">
        <h3>${item.name}</h3>
        <p>${item.describtoin}</p>
        <button>$ ${item.price}</button>
        `;
        container.append(cart)
    });

}

search.addEventListener('input', (e) => {
    searchByName(e.target.value)
})


function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(db.find((item) => item.id == id));
    localStorage.setItem("cart", JSON.stringify(cart));
}


let form = document.getElementById('formsb');
let inpEmail = document.getElementById('inpEmail');
let inpPhone = document.getElementById('inpPhone');
let inpName = document.getElementById('inpName');
let inpPeople = document.getElementById('inpPeople');
let inpTime = document.getElementById('inpTime');
let inpDate = document.getElementById('inpDate');



const postForm = async () => {
    try {
        const response = await fetch("https://65745c66f941bda3f2afa6af.mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inpName.value,
                email: inpEmail.value,
                phone: inpPhone.value,
                people: inpPeople.value,
                // date: inpDate,
                time: inpTime.value,
            }),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    postForm();
})



