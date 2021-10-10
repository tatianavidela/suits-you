const specificPostContainer = document.querySelector(".specific-post-container")

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id")




const url = "https://www.tatianavidela.online/wp-json/wp/v2/posts/" + id + "?_embed"

async function fetchPost() {
    try {
        const response = await fetch(url);
        const post = await response.json();
        const changeMeta =  document.querySelector('meta[name="description"]');
        changeMeta.innerHTML = `${post.title['rendered']} `
        specificPostContainer.innerHTML="";

        let dateStr = post.date 
        let date = dateStr.slice(0, 10)
        
        specificPostContainer.innerHTML = 
         `<div class="specific-post-header">
            <h2>${post.title['rendered']}</h2>
            <h3>${post._embedded['wp:term']['0']['0'].name}</h3>
            <h4> By ${post._embedded['author']['0'].name}</h4>
            <p>Posted ${date}</p>
        </div>
        <div class="featured-img">
            <img src="${post._embedded['wp:featuredmedia']['0'].source_url}">
        </div>
        <section class="post-content">${post.content['rendered']}</section> `

        let modal= document.querySelector("#modal01")
        let img = document.querySelectorAll(".is-style-default > img")
        let modalImg = document.querySelector("#img01")
        for (let i = 0; i < img.length; i++) {
            img[i].onclick = function () {
                modal.style.display = "block";
                modalImg.src = this.src;
            }
        
        }


    } catch(error) {
      console.log(error);
      specificPostContainer.innerHTML = displayError("Ops! something went wrong");
    }
}

fetchPost();


