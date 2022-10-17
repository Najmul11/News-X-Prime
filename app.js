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

  const loadNews = (id) => {
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayNews(data.data))
      .catch((err) => console.log(err));
  };
  const loadSpinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
      spinner.classList.remove("d-none");
    } else {
      spinner.classList.add("d-none");
    }
  };
  const displayNews = (datas) => {
    const newsFound = document.getElementById("message");
    newsFound.classList.remove("d-none");
    newsFound.innerHTML = `<h3 class=" text-center bg-white rounded py-3">${datas.length} recent news</h3>`;
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;
    for (const data of datas) {
      const { thumbnail_url, title, details, total_view, author, _id } = data;
      const div = document.createElement("div");
      div.classList.add("col-");
      div.innerHTML = `
              <div onclick="loadDetail('${_id}')" class="p-3 shadow-sm bg-white rounded d-flex flex-column flex-lg-row gap-4"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <div class="">
                      <img src=${thumbnail_url} class= d">
                  </div>
                  <div>
                      <h3>${title}</h3>
                      <p class="mt-5">${details.length>400?details.slice(0,400)+"...":details}</p>
                      <div class="d-flex  align-items-center justify-content-between  profile w-100">
                          <div class="d-flex gap-3 align-items-center">
                              <div>
                                  <img src="${author.img}" alt="" class="rounded-circle">
                              </div>
                              <div class="mt-3">
                                  <h5 class="">${author.name ? author.name : "No author" }</h5>
                              </div>
                          </div>
                          <div>
                              <p class="mt-4 fw-semibold"><i class="fa-regular fa-eye"></i> ${ total_view ?? "No data" }</p>
                          </div>
                          <div class="text-wrap d-flex">
                              <i class="fa-solid fa-star text-dark"></i>
                              <i class="fa-solid fa-star text-dark"></i>
                              <i class="fa-solid fa-star text-dark"></i>
                              <i class="fa-solid fa-star text-dark"></i>
                              <i class="fa-regular fa-star text-dark"></i>
                           </div>
                      </div>
                  </div>
              </div>
              `;
      newsContainer.appendChild(div);
    }
    loadSpinner();
  };
  const loadDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayDetail(data.data[0]))
      .catch((err) => console.log(err));
  };
  const displayDetail = (datas) => {
    const { image_url, title, details, author, total_view } = datas;
    const modalTitle = document.getElementById("title");
    modalTitle.innerText = `${title}`;
    const detail = document.getElementById("details");
    detail.innerHTML = `
          <img src=${image_url} class="img-fluid">
          <p class="mt-2">${details}</p>
          <div class="d-flex  align-items-center justify-content-between">
              <div class="d-flex gap-3 align-items-center">
                  <div>
                      <img src="${ author.img}" alt="" class="rounded-circle author">
                  </div>
                  <div class="mt-3">
                      <h5 class="">${ author.name ? author.name : "Unknown Author"}</h5>
                      <p>${author.published_date ? author.published_date : ""}</p> 
                  </div>
              </div>
              <div>
                  <p class="mt-4 fw-semibold"><i class="fa-regular fa-eye"></i> ${ total_view ?? "No data"}</p>
              </div>
          </div>
      `;
  };
  loadCatagories();  