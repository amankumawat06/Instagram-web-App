document.addEventListener("DOMContentLoaded", () => {

  // loding while createing user
  const createBtn = document.querySelector("#creatUserbtn");
  if (createBtn) {
    const createForm = createBtn.closest("form");
    createForm.addEventListener("submit", () => {
      createBtn.innerText = "Creating user...";
      createBtn.disabled = true;
      createBtn.classList.add("create");
    });
  }

  // FILE INPUT 
  const fileInput = document.getElementById("fileInput");
  const fileName = document.getElementById("fileName");

  if (fileInput && fileName) {
    fileInput.addEventListener("change", () => {
      fileName.innerText = fileInput.files[0]
        ? fileInput.files[0].name
        : "No file chosen";
    });
  }

  // Confirm Delete
  const deleteForms = document.querySelectorAll(".deleteForm");
  const deleteModel = document.getElementById("deleteModal")
  const cancelBtn = document.querySelector(".modal-cancel")
  const confirmBtn = document.querySelector(".modal-delete")

  deleteForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      deleteModel.classList.remove("hidden")

      cancelBtn.addEventListener("click", () => {
        deleteModel.classList.add("hidden")
      })

      confirmBtn.addEventListener("click", () => {
        form.submit()
      })
    });
  })


});
