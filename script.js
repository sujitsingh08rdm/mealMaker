console.log("test");

let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let allDish = document.querySelectorAll(".dishes");
let count = 0;
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let dishValue = document.querySelectorAll(".dishVal");

const getData = async (value) => {
  try {
    let datas = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );

    let jsonData = await datas.json();
    console.log(jsonData.meals);
    document.querySelector(".showMeal").innerHTML = "";

    jsonData.meals.forEach(function (data) {
      console.log(data);
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
  <img src="${data.strMealThumb}" alt="" />
  <p>${data.strMeal}</p>
  <button><a href="${data.strSource}" class="link" target="_blank">View More</a></button>`;
      document.querySelector(".showMeal").appendChild(div);
    });
  } catch (error) {
    document.querySelector(".showMeal").innerHTML =
      "<h1>Dish Not Found Try Different Ones While We Work on Adding the Desired Dish</h1>";
  }
};

searchBtn.addEventListener("click", function () {
  let searchValue = searchInput.value;
  if (searchValue === "") {
    alert("First Search Value");
  } else {
    getData(searchValue);
  }
});

dishValue.forEach(function (dishData) {
  dishData.addEventListener("click", function () {
    getData(dishData.value);
  });
});

//Slider
allDish.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

function myFun() {
  allDish.forEach(function (curVal) {
    curVal.style.transform = `translateX(-${count * 100}%)`;
  });
}

nextBtn.addEventListener("click", function () {
  count++;
  if (count == allDish.length) {
    count = 0;
  }
  myFun();
});

prevBtn.addEventListener("click", function () {
  count--;
  if (count == -1) {
    count = allDish.length - 1;
  }
  myFun();
});
