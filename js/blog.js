const url = "https://www.tatianavidela.online/wp-json/wp/v2/posts?_embed";
const blogContainer = document.querySelector(".blog");

const perPage = document.querySelector(".view-all");


async function getPosts(url){

  try{
    const response = await fetch(url);
    const posts = await response.json();
 
    blogContainer.innerHTML="";

    posts.forEach(function (post) {
      let dateStr = post.date 

      let date = dateStr.slice(0, 10)

        blogContainer.innerHTML += `
      <a href="specific-post.html?id=${post.id}">
        <img src="${post._embedded['wp:featuredmedia']['0'].source_url}">
        <p>Posted ${date}</p>
        <h2 class="post-title">${post.title['rendered']}</h2>
        <h3>${post._embedded['wp:term']['0']['0'].name}</h3>
        <h4> By ${post._embedded['author']['0'].name}</h4>
        <div class="post-line"></div>
      </a>
      
      
      `;
      perPage.onclick = function(){
        const newUrl = url + "&per_page=12";
        blogContainer.innerHTML ="";
       getPosts(newUrl);
          }
      });
  }

  catch(error){
    console.log(error);
    blogContainer.innerHTML = displayError("Ops! something went wrong");
  }
}

getPosts(url);


