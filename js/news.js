const fetchCategories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then((res) => res.json())
        .then((data) => showCategories(data.data))


};

const showCategories = data => {
    // console.log(data)

    const categoriesContainer = document.getElementById('categories-container');
    data.news_category.forEach(singleCategory => {
        // console.log(singleCategory)

        let linkContainer = document.createElement('p')
        linkContainer.innerHTML = ` <a class="nav-link" href="#" onclick ="fetchCategoriesNews('${singleCategory.category_id}','${singleCategory.category_name}')">${singleCategory.category_name}</a>`;
        categoriesContainer.appendChild(linkContainer);
    });
}
// fetch all newses

const fetchCategoriesNews = (category_id,category_name) => {
    // console.log(category_id)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => showAllNews(data.data,category_name));
}
const showAllNews =(data,category_name) =>{
    // console.log(data,category_name)

    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const newsContainer =document.getElementById('all-news');
    newsContainer.innerHTML="";
    data.forEach(singleNews =>{
      const {_id,image_url,title,details,author,total_view} =singleNews;
        // newsContainer.innerHTML += ``
        const card =document.createElement('div');
        card.classList.add("card","mb-3");
        card.innerHTML =`<div class="row g-0 ">
        <div class="col-md-4 ">
          <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0, 200)}....</p>
          </div>
          <div class ="card-footer border-0 bg-body d-flex justify-content-between ">
            <div class="d-flex gap-2">
             <img src="${author.img}" class="img-fluid rounded-circle" alt="..."  height ="40" width="40">
            </div>
            <div>
            <p class="m-0 p-0">${author.name  ? author.name :'Not aviable'}</p>
            <p class="m-0 p-0">${author.published_date}</p>
            </div>
            <div class"d-flex align-items-center>
            <i class="fa-solid fa-eye"></i>
            <p class="m-0 p-0">${total_view ? total_view :'Not avaiable'}</p>
            </div>
            <div>
            <i class="fa-solid fa-star"></i>
            </div>
            <div>
             <i class="fa-solid fa-arrow-right" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </div>
          </div>
        </div>
      </div>`;
      newsContainer.appendChild(card);
    })
}
const fetchNewsDetail = news_id =>{
  let url =`https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch (url)
  .then(res =>res.json())
  .then(data=>showNewsDetail(data.data[0]))
  
}
const showNewsDetail= newsDetail =>{

  const {_id,image_url,title,details,author,total_view,others_info} =newsDetail;
        // newsContainer.innerHTML += ``
        document.getElementById("modal-body").innerHTML =`<div class="card mb-3">
        <div class="row g-0 ">
        <div class="col-md-4 ">
          <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-12 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending?"Trending":"Not Trending" }</span></h5>
            <p class="card-text">${details}</p>
          </div>
          <div class ="card-footer border-0 bg-body d-flex justify-content-between ">
            <div class="d-flex gap-2">
             <img src="${author.img}" class="img-fluid rounded-circle" alt="..."  height ="40" width="40">
            </div>
            <div>
            <p class="m-0 p-0">${author.name ? author.name :'not aviable'}</p>
            <p class="m-0 p-0">${author.published_date}</p>
            </div>
            <div class"d-flex align-items-center>
            <i class="fa-solid fa-eye"></i>
            <p class="m-0 p-0">${total_view ? total_view :'Not avaiable'}</p>
            </div>
            <div>
            <i class="fa-solid fa-star"></i>
            </div>
            
          </div>
        </div>
      </div>
        </div>
        `;

}