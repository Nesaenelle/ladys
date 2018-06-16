var Events = function() {
    this.coll = [];
    this.on = function(func) {
        this.coll.push(func)
    }
    this.trigger = function(e) {
        this.coll.forEach(function(func) {
            func(e);
        })
    }
};

var fn = new Events();


window.addEventListener('scroll', function(e) {
    fn.trigger(e);
});





function isScrolledIntoView(elem, offsetVal = 0) {
    var docViewTop = window.pageYOffset;
    var docViewBottom = docViewTop + window.innerHeight;
    var elemTop = offset(elem).top;
    var elemBottom = elemTop + elem.clientHeight;
    return ( /*(elemBottom + offsetVal <= docViewBottom) && */ (elemTop >= docViewTop));

    // docViewTop >= elemTop - (offsetVal ) /*- window.innerHeight*/ ; // /
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function isInViewport(el, offset = 0) {
    var top = el.offsetTop + offset;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};

(function() {
    var elements = document.querySelectorAll('[data-animate]');

    fn.on(function(e) {
        elements.forEach(function(elem) {
            if (isInViewport(elem, 100)) {
                if (!elem.getAttribute('data-animate')) {
                    elem.setAttribute('data-animate', true);
                }
            }
        });

    });
}());


(function() {
    var slider = document.querySelector('[data-slider]');
    if (slider) {
        var slides = slider.querySelectorAll('[data-slider-item]');
        var groups = slider.querySelectorAll('[data-slider-group]');
        var controls = slider.querySelector('.slider__controls');
        var wrapper = slider.querySelector('.slider__wrapper');
        var scroller = slider.querySelector('.slider__scroller');
        var controlLeft = slider.querySelector('.slider__arrows_left');
        var controlRight = slider.querySelector('.slider__arrows_right');

        var controlsArray = [];
        var width = slider.offsetWidth;
        var curSlide = 0;
        var slidesToShow = 3;
        var isWorking = false;


        for (var i = 0; i < (slides.length / slidesToShow); i++) {
            var el = document.createElement('div');


            el.className = i === 0 ? 'slider__controls_item active' : 'slider__controls_item';
            // slide.setAttribute('data-id', index);
            el.setAttribute('data-id', i);

            el.addEventListener('click', function() {
                goTo(+this.getAttribute('data-id'));
            }, false);

            controlsArray.push(el);
            controls.appendChild(el);
        }

        showSlides();

        function showSlides() {
            groups.forEach(function(group) {
                var slides = group.querySelectorAll('[data-slider-item]');
                slides.forEach(function(slide, i) {
                    slide.style.zIndex = slides.length * 10 - i;
                    if (i === curSlide) {
                        slide.classList.add('active');
                    }
                });
            });
        }

        function goTo(index) {
            if (index > slidesToShow - 1) {
                index = 0;
            }
            if (index < 0) {
                index = slidesToShow - 1;
            }

            if (!isWorking) {
                isWorking = true;

                var control = controls.querySelector('[data-id="' + index + '"]');
                controlsArray.forEach(function(r) { r.classList.remove('active') });
                control.classList.add('active');

                var time = 0;

                groups.forEach(function(group) {
                    var slides = group.querySelectorAll('[data-slider-item]');

                    // slides[0].classList.add('slideOutUp');
                    // setTimeout(function() {
                    //     slides[0].classList.remove('active');
                    //     slides[1].classList.add('slideOutUp');
                    //     slides[1].classList.add('active');
                    // }, 1000);
                    // setTimeout(function() {
                    //     slides[1].classList.remove('active');
                    //     slides[2].classList.add('slideOutUp');
                    //     slides[2].classList.add('active');
                    // }, 2000);
                    // setTimeout(function() {
                    //     slides[0].classList.remove('active');
                    //     slides[1].classList.add('slideOutUp');
                    //     slides[1].classList.add('active');
                    // }, 3000);


                    // slides.forEach(function(slide, i) {
                    //     if (i === curSlide) {
                    //         slide.classList.add('slideOutUp');
                    //         setTimeout(function() {
                    //             slide.classList.remove('active');
                    //             slide.classList.remove('slideOutUp');
                    //             isWorking = false;
                    //         }, 2000);  
                    //         if(i >= slides.length-1) {
                    //                slides[0].classList.add('active');
                    //         }
                    //     } 

                    //      if(slides[curSlide+1]) {
                    //         slides[curSlide+1].classList.add('active');
                    //     }
                    // });
                });

                curSlide = index;
            }

        }

        controlLeft.addEventListener('click', function() {
            goTo(curSlide - 1);
        }, false);
        controlRight.addEventListener('click', function() {
            goTo(curSlide + 1);
        }, false);

        // setInterval(function() {
        //     goTo(curSlide + 1);
        // }, 5000);
    }
}());



(function() {
    var burger = document.querySelector('[data-burger]');
    var menuContainer = document.querySelector('.dropdown-menu');

    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (burger.classList.contains('active')) {
            burger.classList.remove('active');
        } else {
            burger.classList.add('active');
        }

    }, false);

    window.addEventListener('click', function(e) {
        if (!menuContainer.contains(e.target)) {
            burger.classList.remove('active');
        }
    }, false);

}());


(function() {
    var counterItems = document.querySelectorAll('[data-counter]');
    var trigerred = 0;



    function animateValue(element, start, end, duration, value = '') {
        var range = end - start;
        var current = start;
        var increment = (end / duration) * 10; //;end > start ? (duration/end) : (-1);
        var stepTime = 20; //Math.abs(Math.floor(duration / range));
        var timer = setInterval(function() {
            current += increment;
            element.innerHTML = Math.round(current) + value;
            if (current >= end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    fn.on(function(e) {
        counterItems.forEach(function(elem) {
            if (isInViewport(elem, 100)) {
                if (!elem.getAttribute('data-init')) {
                    elem.setAttribute('data-init', true)
                    var count = elem.getAttribute('data-counter');
                    var counter = elem.querySelector('[data-counter-value]');
                    animateValue(counter, 0, parseInt(count), 2000);
                }
            }
        });
    });


}());

(function() {
    var btn = document.querySelector('#go-top');

    if (btn) {
        btn.addEventListener('click', function() {

            var interval = window.setInterval(function() {
                var scrollTop = document.documentElement.scrollTop;
                if (scrollTop <= 0) {
                    clearInterval(interval);
                } else {
                    window.scrollTo(0, scrollTop - 35);
                }
            });
        }, false);
    }

}());



fn.trigger();