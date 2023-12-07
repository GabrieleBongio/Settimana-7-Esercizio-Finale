const URL = "https://striveschool-api.herokuapp.com/api/product/";

const fetchData = () => {
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
    .then((products) => {
      const row = document.querySelector(".row");
      row.innerHTML = "";
      products.forEach((product) => {
        const { _id, name, imageUrl, price } = product;
        const productCard = document.createElement("div");
        productCard.classList = "col-4";
        productCard.innerHTML = `<div class="card border-0">
            <div class="card-img-top border-top border-2 border-info d-flex justify-content-center p-1" style= "height: 200px">
                <img
                    src=${imageUrl}
                    style="height: 100%"
                    alt="Immagine Prodotto"
                />
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${price}€</p>
                <a href="./details.html?productId=${_id}" class="btn btn-info d-block">Scopri di più</a>
            <a href="./back-office.html?productId=${_id}" class="btn btn-outline-warning d-block mt-1">Modifica</a>
                
            </div>
        </div>`;
        row.appendChild(productCard);
      });
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

fetchData();
