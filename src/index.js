const garageName = "asdrubal"
const url = `https://garage.api.lewagon.com/${garageName}/cars`
const carsList = document.querySelector('.cars-list')
const form = document.querySelector('.car-form')

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const bodyValue = Object.fromEntries(new FormData(form))

  fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyValue)
  })
    .then(response => response.json())
    .then((data) => {
      refreshCars()
    })


})

const bindRemove = () => {
  removeBtns = document.querySelectorAll('.remove')
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

      const url = `https://garage.api.lewagon.com/cars/${btn.dataset.id}`
      fetch(url, {method: 'DELETE'})
        .then(() => {
          refreshCars()
        })
    })
  })
}


const refreshCars = () => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    carsList.innerHTML = ""
    data.forEach((car) => {

      const carHtml = `
      <div class="car">
      <div class="car-image">
      <img src="http://loremflickr.com/280/280/${car.brand}-${car.model}" />
      </div>
      <div class="car-info">
      <h4>${car.brand} ${car.model}</h4>
      <p><strong>Owner:</strong>${car.owner}</p>
      <p><strong>Plate:</strong>${car.plate}</p>
      <button class='btn btn-danger remove' data-id="${car.id}">Remove</button>
      </div>
      </div>
      `
      carsList.insertAdjacentHTML('beforeend', carHtml)

    })
    bindRemove();
  })

}

refreshCars()
