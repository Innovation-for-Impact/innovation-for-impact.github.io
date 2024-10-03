$(document).ready(function(){

     $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(window).scrollTop()>35)
        {
            $('.header').css({'background':'#002e5f','box-shadow':'0 .2rem .5rem rgba(0,0,0,.4)'});
        }
        else
        {
            $('.header').css({'background':'none','box-shadow':'none'});
        }
    });

    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;
		const inc = target / speed;
		if (count < target) {
			counter.innerText = count + inc;
			setTimeout(updateCount, 1);
		} else {
			counter.innerText = target;
		}
	};
	  updateCount();
   });

   (function ($) {
    "use strict";
    
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 2}, 768: {items: 4}, 900: {items: 6} }
    });

    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 1500,
        autoplaySpeed: 800, 
        dots: true,
        loop: true,
        responsive: { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4} }
    });
    
})(jQuery);

$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
});

$('.accordion-header').click(function(){
    $('.accordion .accordion-body').slideUp(500);
    $(this).next('.accordion-body').slideDown(500);
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
});

});

document.addEventListener("DOMContentLoaded", function() {
    const text = "Innovation For Impact";
    const typingSpeed = 100; 
    let i = 0;
  
    function typeEffect() {
      if (i < text.length) {
        const span = document.createElement("span");
        span.innerHTML = text.charAt(i);
        document.getElementById("innovation").appendChild(span);
        i++;
        setTimeout(typeEffect, typingSpeed);
      }
    }
  
    typeEffect();
  });
  
  

  document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section'); // Select all sections

    function handleScroll() {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top; // Position of the section
            const screenPosition = window.innerHeight / 1.3; // Trigger point for animation

            if (sectionPosition < screenPosition) {
                section.classList.add('in-view'); // Add class to make it visible
            } else {
                section.classList.remove('in-view'); // Remove class when out of view
            }
        });
    }

    window.addEventListener('scroll', handleScroll); // Listen for scroll events
    handleScroll(); // Initial check on page load
});
