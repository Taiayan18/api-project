document.addEventListener("DOMContentLoaded", () => {
  const countryInput = document.getElementById("countryInput");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const getCoronaData = document.getElementById("getCoronaData");

  getCoronaData.addEventListener("click", () => {
    resultDiv.style.display = "none";
    errorDiv.textContent = "";

    const food = countryInput.value.trim();

    if (!food) {
      errorDiv.textContent = "Please Enter a food name";
      return;
    }

    const url = `http://localhost:3000/food`;

    fetch("https://api-project-red-kappa.vercel.app/recipes?pasta")

      .then((response) => response.json())
      .then((data) => {
    
        const filtered = data.filter(
          (item) => item.name.toLowerCase() === food.toLowerCase()
        );

        if (filtered.length === 0) {
          errorDiv.textContent = `No results found for "${food}"`;
          return;
        }

        resultDiv.innerHTML = "";

        filtered.forEach((item) => {
          resultDiv.innerHTML += `
           <div class="card" style="width: 20rem; d-flex justify-content-center">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">category: ${item.category}</p>
    <a href="#" class="btn btn-primary">View Recipes</a>
  </div>
</div>
            
          `;
        });

        resultDiv.style.display = "flex";
        resultDiv.style.flexWrap = "wrap";
      })
      .catch((error) => {
        resultDiv.style.display = "none";
        errorDiv.textContent = "Error fetching data";
        console.error(error);
      });
  });
});
