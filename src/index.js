let addToy = false;
function updateLikes(id,newNumberOfLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    method: "PATCH",
    headers :{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes":newNumberOfLikes
    })
  })
}
function sendItOut(newToy){
  fetch("http://localhost:3000/toys",{
    method:"POST",
    headers :{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify({
      ...newToy,"likes":0
    }).then((Response)=>Response.json()).then((toyAdded)=>renderToys(toyAdded))
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");

  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
});
function getToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => renderToys(data));
}
getToys();

const form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", (event)=>{
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target));
    sendItOut(formData)
  
  })

  


   

function renderToys(toys) {
  const toyCollection = document.querySelector("#toy-collection");
  toys.forEach((toy) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    toyCollection.append(cardDiv);
    //console.log(toy.name)
    const h2Name = document.createElement("h2");
    h2Name.textContent = toy.name;
    const imageAdded = document.createElement("img");
    imageAdded.src = toy.image;
    imageAdded.className = "toy-avatar";
    const pTag = document.createElement("p");
    pTag.textContent = toy.likes;
    const button = document.createElement("button");
    button.className = "like-btn";
    button.id = toy.id
    button.textContent = "like";
    button.addEventListener("click",()=>{
      pTag.textContent = `${toy.likes +=1} Likes`
      updateLikes(toy.id,toy.likes)

    })
    cardDiv.append(h2Name, imageAdded, pTag, button);
    


  });
  //console.log(toys)
}
