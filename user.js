let url = `https://jsonserver-9kxc.onrender.com/api/books`;

let alldata;
async function getAllData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    alldata =data
    AppendAllBooks(data);
  } catch (err) {
    console.log(err);
  }
}
getAllData(url);
function AppendAllBooks(data) {
    const bookbox = document.getElementById("books");
    bookbox.innerHTML = "";
  console.log(data);
  data.forEach((elem) => {
      const div1 = document.createElement("div");
      div1.style.marginTop="5px"
    const div11 = document.createElement("div");
    const img1 = document.createElement("img");
    img1.setAttribute("src", elem.image_url);

    div11.append(img1);
    const div12 = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = elem.book_name;
    const p1 = document.createElement("p");
    p1.innerText = "Author : " + elem.author;
    const p2 = document.createElement("p");
    p2.innerText = "Genre : " + elem.genre;
    const p3 = document.createElement("p");
    p3.innerText = "Edition : " + elem.edition;
    const p4 = document.createElement("p");
    p4.innerText = "Publisher : " + elem.publisher;
    const p5 = document.createElement("p");
    p5.innerText = "Cost : " + elem.cost;
    const btn = document.createElement("button");
    btn.innerText = "Borrow";
    btn.setAttribute("class", "btn");

    div12.append(h1, p1, p2, p3, p4, p5, btn);
    div1.append(div11, div12);

    bookbox.append(div1);
  });
}
document.getElementById("sort").addEventListener("change", FillterAlldata)
function FillterAlldata() {
  let lower = document.getElementById("sort").value;
  let filterdata;
  if (lower === "LTH") {
    filterdata = alldata.sort((a, b) => a.cost - b.cost);
  }
  if (lower ==="HTL") {
      filterdata = alldata.sort((a, b) => b.cost - a.cost);
    }
  AppendAllBooks(filterdata);
}
