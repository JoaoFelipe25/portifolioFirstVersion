// -------------- menu fixed ----------------------

const nav = document.getElementsByTagName('nav');
const topNav = nav.offsetTop;

window.onscroll = function(){
    fixedMenuOnTop();
}
function fixedMenuOnTop(){
    if(window.pageYOffset >= topNav){
        nav.classList.add("menuTop");       
    }
}

// --------------black background ----------------------

function isClose(){
  let open = document.querySelector('#door');
  open.style.left = "-400px"; 
 }

 
function isOpen(){
  let open = document.querySelector('#door');
  open.style.left = "1px";
}
  


window.onload = function(){
 menu = document.getElementById('iconMenu');
  back = document.getElementById('back');
  item = document.getElementsByClassName('menu-item');
  
  for (var i = 0; i < item.length; i++) {
      item[i].addEventListener('click', function(){ back.style.display = 'none'});
  }
  
  menu.addEventListener('click', function(){ back.style.display = 'block' });
  back.addEventListener('click', function(){ back.style.display = 'none' });
  }

// --------------Scroll soft ----------------------

const menuItems = document.querySelectorAll('.menu-soft a[href^="#"]');

menuItems.forEach(item => {
  item.addEventListener('click', scrollClick);
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 100;
  scrollToPosition(to);
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

// funçao para funcionar em todos os browser/oragamid
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 1000;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
};

// --------------DarkMode----------------------

const DarkMode = document.getElementById("darkMode");

DarkMode.addEventListener('change', () =>{
    document.body.classList.toggle('dark')
})

// --------------scroll animation----------------------

window.sr = ScrollReveal({ reset: true });

sr.reveal('.container-title', { duration: 2000});
 
sr.reveal('h3', { duration: 2000 })


// --------------scroll animation two----------------------

const debounce = function(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll(){
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
  target.forEach(function(element){
    if((windowTop) > element.offsetTop){
      element.classList.add(animationClass);
    }else{
      element.classList.remove(animationClass);
    }

  })
  
}

animeScroll();

if(target.length) {
  window.addEventListener('scroll', debounce(function() {
    animeScroll();
  }, 200));
}

// --------------Slide----------------------

class SlideStories{
  constructor(id){
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    this.active = index;
    
    this.items.forEach(item => item.classList.remove('active'));
    this.items[index].classList.add('active');

    this.thumbItems.forEach((item) => item.classList.remove('active'));
    this.thumbItems[index].classList.add('active');

    this.autoSlide();

  }

  prev(){
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
    
  }

  next(){
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
    
  }

  addNavigation(){
    const nextBtn = this.slide.querySelector('.slide-next');
    const prevBtn = this.slide.querySelector('.slide-prev');
    nextBtn.addEventListener('click', this.next);
    prevBtn.addEventListener('click', this.prev);
  }

  addThumbItems(){
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
    console.log(this.thumbItems)
  }

  autoSlide(){
    clearTimeout(this.timeout)
    this.timeout = setTimeout(this.next, 5000);
  }

  init(){
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll('.slide-items > *');
    this.thumb = this.slide.querySelector('.slide-thumb');
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }
}

new SlideStories('slide');