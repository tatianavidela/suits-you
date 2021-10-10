const url = "https://www.tatianavidela.online/wp-json/wp/v2/posts?_embed";
const slidesContainer = document.querySelector(".slider-track");

const nextButton = document.querySelector(".slider-button-right");
const prevButton = document.querySelector(".slider-button-left"); 
const sliderNav = document.querySelector(".slider-nav");
const dots= Array.from(sliderNav.children);



async function getPosts(url){

    try{
      const response = await fetch(url);
      const posts = await response.json();

      slidesContainer.innerHTML="";

        for(let i = 0; i < posts.length; i++) { 

            slidesContainer.innerHTML += 
            `<li class="slide current-slide">
                <a id="slide-${i + 1}" href="specific-post.html?id=${posts[i].id}">
                    <img src="${posts[i]._embedded['wp:featuredmedia']['0'].source_url}">
                    <div class="slide-text">
                      <h2 class="post-title">${posts[i].title['rendered']}</h2>
                      <h3>${posts[i]._embedded['wp:term']['0']['0'].name}</h3>
                      <h4> By ${posts[i]._embedded['author']['0'].name}</h4>
                      <p>${posts[i].excerpt['rendered']}</p>

                    </div> 
                </a>
              </li>
             `

            if (i === 3) {
                break;
            }

        } 

        const slides = Array.from(slidesContainer.children)
        
        const slideSize = slides[0].getBoundingClientRect();
        const slideWidth = slideSize.width;
        // console.log(slideWidth)

        //arrange the slides next to one another

        // slides[0].style.left= slideWidth * 0 + "px";
        // slides[1].style.left= slideWidth * 1 + "px";
        // slides[2].style.left= slideWidth * 2 + "px";
        // slides[3].style.left= slideWidth * 3 + "px";

        const setSlidePosition = (slide, index) => {
          slide.style.left = slideWidth * index + "px";
        };

        slides.forEach(setSlidePosition);

        const moveToSlide = (slidesContainer, currentSlide, targetSlide) => {
          slidesContainer.style.transform = "translateX( -"+ targetSlide.style.left +")";
          currentSlide.classList.remove("current-slide");
          targetSlide.classList.add("current-slide");
        }

        const updateDots = (currentDot, targetDot) => {

          currentDot.classList.remove("current-slide");
          targetDot.classList.add("current-slide");
        }

        const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
          if (targetIndex === 0) {
            prevButton.classList.add("is-hidden");
            nextButton.classList.remove("is-hidden");
          } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove("is-hidden");
            nextButton.classList.add("is-hidden");
          } else {
            prevButton.classList.remove("is-hidden");
            nextButton.classList.remove("is-hidden");
          }
        }

        //when i click left, move slides to left
        prevButton.addEventListener("click", e => {
          const currentSlide = slidesContainer.querySelector(".current-slide")
          const prevSlide = currentSlide.previousElementSibling;
          const currentDot = sliderNav.querySelector(".current-slide");
          const prevDot = currentDot.previousElementSibling;
          const prevIndex = slides.findIndex(slide => slide === prevSlide);

          moveToSlide(slidesContainer, currentSlide, prevSlide);
          updateDots(currentDot, prevDot);
          hideShowArrow (slides, prevButton, nextButton, prevIndex);
        })

        //when i click right, move slides to rigth
        nextButton.addEventListener("click", e => {
          const currentSlide = slidesContainer.querySelector(".current-slide");
          const nextSlide = currentSlide.nextElementSibling;
          const currentDot = sliderNav.querySelector(".current-slide");
          const nextDot = currentDot.nextElementSibling;
          const nextIndex = slides.findIndex(slide => slide === nextSlide);

          moveToSlide(slidesContainer, currentSlide, nextSlide);
          updateDots(currentDot, nextDot);
          hideShowArrow (slides, prevButton, nextButton, nextIndex);
        })


        //when i click the nav indicator, move to that slide

        sliderNav.addEventListener("click", e =>{
          // what indicator was clicked on?
          const targetDot = e.target.closest("button");

          
          if (!targetDot) return;

          const currentSlide = slidesContainer.querySelector(".current-slide");
          const currentDot = sliderNav.querySelector(".current-slide");
          const targetIndex = dots.findIndex(dot => dot === targetDot)
          const targetSlide = slides[targetIndex];

          moveToSlide(slidesContainer, currentSlide, targetSlide);
          updateDots(currentDot, targetDot);
          hideShowArrow (slides, prevButton, nextButton, targetIndex);

        })

    } catch(error){
      console.log(error);
      slidesContainer.innerHTML = displayError("Ops! something went wrong");
    }
  }
  
getPosts(url)



/* <div class="slide-text">
<h2 class="post-title">${posts[i].title['rendered']}</h2>
<h3>${posts[i]._embedded['wp:term']['0']['0'].name}</h3>
<h4> By ${posts[i]._embedded['author']['0'].name}</h4>
</div> */
