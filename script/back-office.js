const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = productId ? "PUT" : "POST";

window.onload = () => {
  const submitBtn = document.querySelector("button[type='submit']");
  const buttonDiv = document.querySelector("#buttonDiv");
  const subtitle = document.querySelector("#subtitle");
  if (productId) {
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Modifica Prodotto";
    subtitle.innerText = " -Modifica Prodotto";
    const deleteBtn = document.createElement("button");
    deleteBtn.classList = "btn btn-danger";
    deleteBtn.type = "button";
    deleteBtn.innerHTML = "Rimuovi Prodotto";
    deleteBtn.addEventListener("click", handleDelete);
    buttonDiv.appendChild(deleteBtn);
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc4ZDBkOGEyMDAwMThhNDhhMzYiLCJpYXQiOjE3MDE5NTU1MjcsImV4cCI6MTcwMzE2NTEyN30.bJ2GtTZWehfFhOGoav3DfM9k2cYB6mkzZzywPQ0O87I",
      },
    })
      .then((responseObj) => {
        if (responseObj.status === 404) {
          throw new Error(`${responseObj.status}: risorsa non trovata`);
        } else if (responseObj.status >= 400 && responseObj.status < 500) {
          throw new Error(`${responseObj.status}: errore lato client`);
        } else if (responseObj.status >= 500 && responseObj.status < 600) {
          throw new Error(`${responseObj.status}: errore lato server`);
        } else if (responseObj.ok) {
          return responseObj.json();
        } else {
          throw new Error(`Error ${responseObj.status}: errore`);
        }
      })
      .then(({ name, brand, description, imageUrl, price }) => {
        document.getElementById("name").value = name;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price ? price : "€";
        document.getElementById("brand").value = brand;
      })
      .catch((error) => showAlert(error, "danger"));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc4ZDBkOGEyMDAwMThhNDhhMzYiLCJpYXQiOjE3MDE5NTU1MjcsImV4cCI6MTcwMzE2NTEyN30.bJ2GtTZWehfFhOGoav3DfM9k2cYB6mkzZzywPQ0O87I",
    },
  })
    .then((responseObj) => {
      if (responseObj.status === 404) {
        throw new Error(`${responseObj.status}: risorsa non trovata`);
      } else if (responseObj.status >= 400 && responseObj.status < 500) {
        throw new Error(`${responseObj.status}: errore lato client`);
      } else if (responseObj.status >= 500 && responseObj.status < 600) {
        throw new Error(`${responseObj.status}: errore lato server`);
      } else if (responseObj.ok) {
        return responseObj.json();
      } else {
        throw new Error(`Error ${responseObj.status}: errore`);
      }
    })
    .then((createdObj) => {
      if (productId) {
        showAlert("Prodotto con id: " + createdObj._id + " modificato con successo!", "success");
      } else {
        showAlert("Prodotto con id: " + createdObj._id + " creato con successo!");
      }
      console.log(createdObj);
      document.getElementById("name").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      document.getElementById("imageUrl").value = "";
    })
    .catch((error) => {
      showAlert(error, "danger");
    });
};

const showAlert = (message, colorCode = "primary") => {
  const alertBox = document.querySelector("#alert-box");
  alertBox.innerHTML = `<div class="alert alert-${colorCode}" role="alert">${message}</div>`;

  setTimeout(function () {
    alertBox.innerHTML = "";
  }, 3000);
};

const handleDelete = () => {
  const hasConfirmed = confirm("sei sicuro di voler eliminare il prodotto?");

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc4ZDBkOGEyMDAwMThhNDhhMzYiLCJpYXQiOjE3MDE5NTU1MjcsImV4cCI6MTcwMzE2NTEyN30.bJ2GtTZWehfFhOGoav3DfM9k2cYB6mkzZzywPQ0O87I",
      },
    })
      .then((responseObj) => {
        if (responseObj.status === 404) {
          throw new Error(`${responseObj.status}: risorsa non trovata`);
        } else if (responseObj.status >= 400 && responseObj.status < 500) {
          throw new Error(`${responseObj.status}: errore lato client`);
        } else if (responseObj.status >= 500 && responseObj.status < 600) {
          throw new Error(`${responseObj.status}: errore lato server`);
        } else if (responseObj.ok) {
          return responseObj.json();
        } else {
          throw new Error(`Error ${responseObj.status}: errore`);
        }
      })
      .then((deletedObj) => {
        showAlert(
          "hai eliminato il prodotto " + deletedObj.name + " che aveva id: " + deletedObj._id,
          "danger"
        );
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 3000);
      })
      .catch((error) => showAlert(error, "danger"));
  }
};

const handleReset = (event) => {
  event.preventDefault;
  const hasConfirmed = confirm("sei sicuro di voler resettare il form?");
  if (hasConfirmed) {
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("imageUrl").value = "";
  }
};
