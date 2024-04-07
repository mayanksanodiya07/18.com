'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(element => {
  element.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  
  // console.log("&&&&&&&&&&&&&&&&&&&&&");
  console.log(btnScrollTo.getBoundingClientRect());
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll(X/Y) ', window.pageXOffset, window.pageYOffset);
  
  console.log(
    'height/width viewport ', 
    document.documentElement.clientHeight, 
    document.documentElement.clientWidth
    );

    // window.scrollTo(
    //   s1coords.left + window.pageXOffset, 
    //   s1coords.top + window.pageYOffset
    // );

    // window.scrollTo({
    //   left :s1coords.left + window.pageXOffset, 
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth'
    // });

    section1.scrollIntoView({behavior: 'smooth'});
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e){
//     e.preventDefault();   //prevent direct navigation to href of html code
    
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     // console.log(id);
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  console.log(e.target);

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
  
})

tabsContainer.addEventListener('click', function(e){
  // console.log(e.target);
  
  const clicked = e.target.closest('.operations__tab');
  
  if(!clicked) return 0;

  tabContent.forEach((el)=>{
    el.classList.remove('operations__content--active');
  })

  tabs.forEach((el)=>{
    el.classList.remove('operations__tab--active');
  })

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
  clicked.classList.add('operations__tab--active');
})

// menu fade 

const handleHover = function(e){

  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    sibling.forEach((el)=>{
      if(el!==link){
        el.style.opacity = this;
        console.log(this);
      }
      
      logo.style.opacity = this;
    })
    // console.log(link);
    // console.log(sibling);
    // console.log(logo);
  }
}

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const height = nav.getBoundingClientRect.height;

const obsCallback = function(entry){
  const [ent] = entry; 
  nav.classList.toggle('sticky', !ent.isIntersecting);
  // console.log(navHeight);
  // console.log(ent.isIntersecting);
}

const obsOptions = {
  root : null,
  threshold : 0,
  rootMargin: `-${navHeight}px`
  
}
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

headerObserver.observe(header);

// revealSection

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)
  }
  // console.log(entry.target);
  // console.log(entries);
}
 
const sectionObserver = new IntersectionObserver(revealSection, {
  root:null, 
  threshold: 0.15
});

allSections.forEach((entry)=>{
  sectionObserver.observe(entry);
  entry.classList.add('section--hidden');
});

//Lazy loading images

const loadImg = function(entries, observer){
  console.log(entries);
  const [entry] = entries;

  if(!entry.isIntersecting) return 0;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold:0,
  rootMargin: '200px'
})

const imgTargets = document.querySelectorAll('img[data-src]');

imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(slide){
  slides.forEach(
    (s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  })
}
goToSlide(0);

const nextSlide = function(){
  if(curSlide === maxSlide- 1){
    curSlide = 0;
  }
  else{
    curSlide++;
  }
  goToSlide(curSlide);
}

const preSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
}
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft'){
    preSlide();
  }
  e.key === 'ArrowRight' && nextSlide();
})

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Selection elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// const header = document.querySelector('header')
console.log(document.getElementsByTagName('button'));
// this gives HTMLCollection of all the buttons tag
// HTMLCollection live detect if any button is deletecd or not and update immediatey in HTMLCollection
// document.querySelectorAll gives() Nodelist


// Creating and Inserting elements, used in Bankist Website
// .insertAdjacentHTML

const message = document.createElement('div');  //div made but not iserted
message.classList.add('cookie-message');   //ading class to div/ noy realsead

// message.textContent = 'My name is mayank';

message.innerHTML = 'My name is Mayank <button class="btn btn--close-cookie"> Got it! </button>';
// till now we have only made a div with class 'cookie-message' and a button with innerHTML

// header.prepend(message);
// header.append(message);     //Can't be at multiple place at same time. So, message will be seen only at append

// header.prepend(message.cloneNode(true));     // to show on both the places, created clone.

// header.before(message.cloneNode(true))   //here also can't be at multiple place at same time. So, message will be seen only at append
// header.after(message)

// document
// .querySelector('.btn--close-cookie')
// .addEventListener('click', function () {
//   message.remove();
// })


// Style

message.style.backgroundColor = '#37383D';
message.style.width = '120%';

// console.log(message.style.height);   //we cant get the property which we have not declarde in JS
console.log(message.style.backgroundColor);
console.log(message.style.width);

console.log(getComputedStyle(message)); //this will give all style info 
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

console.log(document);
console.log(document.documentElement);
// document.documentElement.style.setProperty('--color-primary', 'orange');


//Attribute

const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful logo";   //change alt attribute.

// Non standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

//Classes

logo.classList.add('cls1');
logo.classList.remove('cls1');
logo.classList.toggle('cls1');    //remove if contain or add if not contain

logo.classList.contains('cls1');

console.log(logo.classList.contains('cls1'));

// false --> remove
// true --> add      //output of toggle
console.log(logo.classList.toggle('cls1'));
console.log(logo.classList.contains('cls1'));

const randInt = (min, max) => 
Math.floor(Math.random()*(max-min +1) + min);

const randColor = () => 
`rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;

console.log(randColor());
//Event propogation

// Capturing
// event propogate from parent --> child

// Bubbling
// event propogate from child --> parent

// addEventListener(event, function, useCapture);
// useCapture  (true) --> event happen at capture phase
//            (false) --> event happen at bubble phase
// by default false

// To stop propogation of event use this--> e.stopPropagation() //will target only clicked element.

// document.querySelector('.nav__link').addEventListener('click', function(e){
  //   this.style.backgroundColor = randColor();
  //   console.log('in .nav__link', e.target);
  //   // e.stopPropagation();
  
  // })
  
  // document.querySelector('.nav__links').addEventListener('click', function(e){
    //   this.style.backgroundColor = randColor();
    //   console.log('in .nav__links', e.target);
    //   // e.stopPropagation();
    // })
    
    // document.querySelector('.nav').addEventListener('click', function(e){
      //   this.style.backgroundColor = randColor();
      //   console.log('in .nav', e.target);  // here e is the element which is targated at first and here firstly .nav__link is activated therefore e is same for every event listner here i.e. .nav__link (in by default useCapture = false, otherwise .nav is activated)
      // })