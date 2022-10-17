const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => displayCatagories(data.data.news_category))
      .catch((err) => console.log(err));
  };
  const displayCatagories = (catagories) => {
    const catagoryContainer = document.getElementById("catagory-container");
    catagories.forEach((catagory) => {
      const { category_id, category_name } = catagory;
      const div = document.createElement("div");
      div.innerHTML = `<button onclick="loadNews('${category_id}')" class="btn btn-style border-0 ">${category_name}</button>`;
      catagoryContainer.appendChild(div);
    });
  };