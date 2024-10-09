$(document).ready(function(){

    //top navigation bar that shows the things, this is the bar itself
     $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        //this is the nav bar, self explainatory but i'm dum so this is here for me to see
        $('.navbar').toggleClass('nav-toggle');
    });

    //for the whole window, given load event and scroll event, on these two events, do this
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

    //for each item that has the attribute .counter
    counters.forEach(counter => {
        //recursion to auto update the count value every few seconds
	const updateCount = () => {
		const target = +counter.getAttribute('data-target'); //stores the value of the target
		const count = +counter.innerText;
		const inc = target / speed;
		if (count < target) {
			counter.innerText = count + inc;
			setTimeout(updateCount, .5);
		} else {
			counter.innerText = target;
		}
	};
	  updateCount();
   });

   //defines the carousels 
   (function ($) {
    "use strict";
    
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        //this describes the sequence of steps that it should take as a response
        responsive: { 0: {items: 2}, 768: {items: 4}, 900: {items: 6} }
    });

    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4} }
    }).animate(
        [
            { opacity: 0 }, 
            { opacity: 0.1, offset: 0.7 }, 
            { opacity: 1 }
        ],
        2000,);

    
    
        //animations n stuff are done in the css
        //add interactive stuff like logic behind buttons here
    
    //optional expanding of the project carousel if you click on it
    //what the hell is the class of this object ;w;
    $(".container").click(function() {
        
    })
    
})(jQuery);

//applied to a button
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
