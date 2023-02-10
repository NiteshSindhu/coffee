let url = `https://jsonserver-9kxc.onrender.com/api/books`;

let edit = false;
async function getAllData() {
  try {
    let res = await fetch(url);
    let data = await res.json();
    AppendAllBooks(data);
  } catch (err) {
    console.log(err);
  }
}
getAllData();

function AppendAllBooks(data) {
  const list = document.getElementById("tbody");
  list.innerHTML = "";
  data.forEach((elem) => {
    const tr1 = document.createElement("tr");
    const td1 = document.createElement("td");
    const img1 = document.createElement("img");
    img1.src = elem.image_url;
    img1.style.height = "40px";
    img1.style.width = "50px";
    td1.append(img1);
    const td2 = document.createElement("td");
    td2.innerText = elem.book_name;
    const td3 = document.createElement("td");
    td3.innerText = elem.author;
    const td4 = document.createElement("td");
    td4.innerText = elem.genre;
    const td5 = document.createElement("td");
    td5.innerText = elem.edition;
    const td6 = document.createElement("td");
    td6.innerText = elem.publisher;
    const td7 = document.createElement("td");
    td7.innerText = elem.cost;
    const td8 = document.createElement("td");
    td8.innerText = "Edit";
    td8.addEventListener("click", function () {
      UpdateBook(elem);
    });
    const td9 = document.createElement("td");
    td9.innerText = "Delete";
    td9.addEventListener("click", function () {
      DeleteBook(elem);
    });

    tr1.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
      list.append(tr1);
  });
}
let formdiv = document.getElementById("formdiv");
async function UpdateBook(elem) {
    // const btn = document.createElement("button");
    // btn.innerText = "Modifiy"
    // btn.setAttribute("type", "submit");
    // formdiv.append(btn);
    await fetch(`${url}/${elem.id}`, {
        method: "PATCH",

        headers: { "Content-type": "application/json" },
      });
        getAllData();
}
async function DeleteBook(elem) {
  await fetch(`${url}/${elem.id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
    getAllData();
}
document.getElementById("form").addEventListener("submit", AddBook);
async function AddBook(event) {
    event.preventDefault();
  let bookdata = {
    id: new Date().getTime(),
    image_url: document.getElementById("url").value,
    book_name: document.getElementById("name").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    edition: document.getElementById("edition").value,
    publisher: document.getElementById("publisher").value,
    cost: document.getElementById("cost").value,
    borrowed: false,
  };
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(bookdata),
      headers: { "Content-type": "application/json" },
    });
    getAllData();
  } catch (err) {
    console.log(err);
  }
}
