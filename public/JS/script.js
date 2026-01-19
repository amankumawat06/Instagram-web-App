let form = document.querySelector("form")
let createBtn = document.querySelector("#creatUserbtn")

form.addEventListener("submit",() =>{
    createBtn.innerText = "Creating user...";
    createBtn.disabled = true;
    createBtn.classList.add("create")
})

// Show selected file name
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

fileInput.addEventListener("change", () => {
  fileName.innerText = fileInput.files[0]
    ? fileInput.files[0].name
    : "No file chosen";
});
