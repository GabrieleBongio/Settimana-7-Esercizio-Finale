const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + productId;

window.onload = () => {
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
    .then((product) => {
      const { _id, name, description, brand, imageUrl, price, userId, createdAt, updatedAt } =
        product;
      const row = document.querySelector(".row");
      row.innerHTML = `<div class="col-4 border-end border-2 border-info">
            <img
            src=${imageUrl}
            alt="immagine prodotto"
            class="img-fluid"
            />
        </div>
        <div class="col-8">
            <div>
                <h2 class="display-5 my-2">${name}<span class="fw-lighter fs-6"> - by ${brand}</span></h2>
                <p>${description}</p>
                <p class="my-5 display-6 text-success">${price}€</p>
            </div>
        </div>
        <div class="col-8">
            <h6 class="mt-5">Dettagli Server:</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <p>id:</p>
                        <p class="fw-lighter">${_id}</p>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <p>Userid:</p>
                        <p class="fw-lighter">${userId}</p>
                    </div>
                </li>
                <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <p>createdAt:</p>
                        <p class="fw-lighter">${createdAt}</p>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <p>updatedAt:</p>
                        <p class="fw-lighter">${updatedAt}</p>
                    </div>
                </li>
            </ul>
        </div>`;
    })
    .catch((error) => {
      const row = document.querySelector(".row");
      row.innerHTML = `<div class="col-12">
        <div class="alert alert-danger" role="alert">
          ${error}
        </div>
        </div>`;
    });
};
