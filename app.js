const searchMeal = document.getElementById("input");

function fetchMeal() {
  if (searchMeal.value) {
    console.log(searchMeal.value);
    let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;

    fetch(URL)
      .then((Response) => Response.json())
      .then((meals) => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
    document.querySelector(".meal-wrapper").innerHTML = "";
  } else {
    alert("Search Your Food First");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showMeal(meals) {
  console.log("Show Meal:~", meals);

  for (let meal of meals) {
    document.querySelector(".meal-wrapper").innerHTML += `
     <div class="meal-box border border-gray-400 rounded-xl">
          <img
            class="w-full rounded-tl-xl rounded-tr-xl h-[250px] object-cover"
            src=${meal.strMealThumb}
            alt=${meal.strMeal}
          />
          <div class="p-3">
            <h2 class="heading">${meal.strMeal}</h2>
            <p class="text-gray-300 my-2">${meal.strInstructions.slice(
              0,
              100
            )}...</p>
            <p class="italic text-gray-950">
              <span>${meal.strArea}</span> <span>${meal.strCategory}</span>
            </p>
            <div class="my-3">
              <a href=${meal.strYoutube} target="_blank" class="btn ">Watch</a>
              <button class="px-3 py-[5px] rounded-tl-3xl rounded-br-3xl bg-blue-500 cursor-pointer ml-1 text-white" onclick="lookUpDetails('${
                meal.idMeal
              }')">View Recipe Details</button>
            </div>
          </div>
        </div>
    `;
  }
}

function lookUpDetails(id) {
  console.log("LookUp", id);
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(URL)
    .then((Response) => Response.json())
    .then((meals) => showMealDetails(meals.meals[0]));
}

function showMealDetails(meal) {
  console.log(meal);
  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
    <div class="popup bg-white w-[70%] min-h-auto p-10 rounded-xl text-justify">
        <h2 class="text-2xl font-bold mb-4">${meal.strMeal}</h2>
        <p class="mb-6">${meal.strInstructions}</p>
        <a href=${meal.strYoutube} target="_blank"
            class="cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Watch Video</a>
        <button onclick="closeDetails()" class="rounded cursor-pointer bg-black text-white ml-3 px-4 py-[5px] hover:bg-red-500">Close</button>
    </div> 
  `;
}

function closeDetails() {
  details.classList.add("invisible");
  details.classList.remove("visible");
}

const searchBTN = document.getElementById("searchBTN");
searchBTN.addEventListener("click", () => {
  fetchMeal();
});
