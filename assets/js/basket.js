const div = document.getElementById("bskcontainer");

function getProducts() {
  div.innerHTML = ``;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart)
  cart.map((item, index) => {
    const box = document.createElement("div");
    box.className = "myCard"
    console.log(item)
    box.innerHTML = ` 
    <img src="${item.image}" alt="">
    <h3>${item.name}</h3>
    <p>${item.describtoin}</p>
    <button onclick="removeItem(${index})">Remove</button>
    `;

    div.appendChild(box);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}
getProducts()