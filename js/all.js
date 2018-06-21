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
var goTopBtn = document.querySelector('#go-top');


window.addEventListener('scroll', function(e) {
    fn.trigger(e);
    if (window.scrollY > 300) {
        goTopBtn.classList.add('opened');
    } else {
        goTopBtn.classList.remove('opened');
    }

    if (window.scrollY > 50) {
        document.body.classList.add('is-not-on-top');
    } else {
        document.body.classList.remove('is-not-on-top');
    }
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
            if (isInViewport(elem, 90)) {
                if (!elem.getAttribute('data-animate')) {
                    elem.setAttribute('data-animate', true);
                }
            }
        });

    });
}());


(function() {
    var slider = document.querySelector('[data-slider]');

    var slides = slider.querySelectorAll('[data-slider-item]');
    var controls = slider.querySelector('.slider__controls');
    var wrapper = slider.querySelector('.slider__wrapper');
    var scroller = slider.querySelector('.slider__scroller');
    var controlLeft = slider.querySelector('.slider__arrows_left');
    var controlRight = slider.querySelector('.slider__arrows_right');

    var controlsArray = [];
    var width = slider.offsetWidth;
    var curSlide = 0;
    var prevSlide;
    var slidesToShow = 3;
    var isWorking = false;
    var TOTALCOUNT = 0;
    var interval;


    onResize();

    function getTotalCount() {
        TOTALCOUNT = Math.ceil((slides.length / slidesToShow));
    }

    function drowControls() {
        controls.innerHTML = '';
        for (var i = 0; i < TOTALCOUNT; i++) {
            var el = document.createElement('div');

            el.className = i === 0 ? 'slider__controls_item active' : 'slider__controls_item';
            el.setAttribute('data-id', i);
            el.addEventListener('click', function() {
                goTo(parseInt(this.getAttribute('data-id')));
            }, false);
            controlsArray.push(el);
            controls.appendChild(el);
        }
    }

    function goTo(index) {
        if (!isWorking) {
            isWorking = true;

            curSlide = index;

            var className = (prevSlide >= curSlide) ? 'slideOutUpRight' : 'slideOutUpLeft';

            if (curSlide >= TOTALCOUNT) {
                curSlide = 0;
                prevSlide = undefined;
            }
            if (curSlide < 0) {
                curSlide = TOTALCOUNT - 1;
                prevSlide = 0;
            }

            var control = controls.querySelector('[data-id="' + curSlide + '"]');
            controlsArray.forEach(function(r) { r.classList.remove('active') });
            control.classList.add('active');

            slides.forEach(function(slide, i) {
                if (i >= (curSlide * slidesToShow) && i < (curSlide * slidesToShow + slidesToShow)) {
                    slide.classList.add('active');
                } else {
                    slide.classList.add(className);
                    var timeout = setTimeout(function() {
                        slide.classList.remove('active');
                        slide.classList.remove(className);
                        isWorking = false;
                        clearTimeout(timeout);
                    }, 1000);
                }
            });

            prevSlide = curSlide;
        }
    }


    function refresh() {
        curSlide = 0;
        autoScroll();
        getTotalCount();
        drowControls();
        slides.forEach(function(slide, i) {
            if (i >= (curSlide * slidesToShow) && i < (curSlide * slidesToShow + slidesToShow)) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('slideOutUpRight');
                slide.classList.remove('active');
                slide.classList.remove('slideOutUpRight');
                isWorking = false;
            }
        });
    }

    function autoScroll() {
        if (interval) clearInterval(interval);
        interval = setInterval(function() {
            goTo(curSlide + 1);
        }, 6000);
    }

    slider.addEventListener('mouseenter', function() {
        clearInterval(interval);
    }, false);

    slider.addEventListener('mouseleave', function() {
        autoScroll();
    }, false);

    controlLeft.addEventListener('click', function() {
        goTo(curSlide - 1);
    }, false);
    controlRight.addEventListener('click', function() {
        goTo(curSlide + 1);
    }, false);


    function onResize() {
        if (window.innerWidth > 1440) {
            slidesToShow = 3;
            refresh();
        } else if (window.innerWidth > 1112) {
            slidesToShow = 2
            refresh();
        } else {
            slidesToShow = 1;
            refresh();
        }
    }

    window.addEventListener('resize', function() {
        onResize();
    }, false);


    swapInit();

    function swapInit() {
        let pageWidth = window.innerWidth || document.body.clientWidth;
        let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
        const gestureZone = slider; //document.getElementById('modalContent');

        gestureZone.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gestureZone.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture(event);
        }, false);

        function handleGesture(e) {
            let x = touchendX - touchstartX;
            let y = touchendY - touchstartY;
            let xy = Math.abs(x / y);
            let yx = Math.abs(y / x);
            if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
                if (yx <= limit) {
                    if (x < 0) {
                        // console.log("left");
                        goTo(curSlide + 1);
                    } else {
                        // console.log("right");
                        goTo(curSlide - 1);
                    }
                }
                if (xy <= limit) {
                    if (y < 0) {
                        console.log("top");
                    } else {
                        console.log("bottom");
                    }
                }
            } else {
                console.log("tap");
            }
        }
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
    var body = $("html, body");
    if (btn) {
        btn.addEventListener('click', function() {
            body.stop().animate({ scrollTop: 0 }, 500);
        }, false);
    }

}());

(function() {
    var popupBtn = document.querySelectorAll('.js-popup');
    var modalOverlay = document.querySelector('#modal-overlay');
    var modal = document.querySelector('#modal-popup');
    var closeBtns = document.querySelectorAll('.js-close-modal');

    if (popupBtn.length) {
        popupBtn.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                modalOverlay.classList.add('opened');
                modal.classList.add('opened');
            });
        });
    }

    if (closeBtns.length) {
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                modal.classList.remove('opened');
                modalOverlay.classList.remove('opened');
            });
        });
    }

    window.addEventListener('click', function(e) {
        if (!modal.contains(e.target)) {
            modal.classList.remove('opened')
            modalOverlay.classList.remove('opened')
        }
    }, false);
}());



(function() {
    var tabs = document.querySelectorAll('[data-navigation]');
    var links = document.querySelectorAll('[data-navigation-link]');

    window.addEventListener('scroll', function() {
        tabs.forEach(function(elem) {
            if (isInViewport(elem, 100)) {
                var id = elem.getAttribute('data-navigation');
                var links = document.querySelectorAll('[data-navigation-link');
                links.forEach(function(link) {
                    if (link.getAttribute('data-navigation-link') === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, false);

    // var interval;
    var body = $("html, body");

    $('[data-navigation-link]').on('click', function(e) {
        e.preventDefault();
        var id = this.getAttribute('data-navigation-link');
        var elem = document.querySelector('[data-navigation="' + id + '"]');
        var topOffset = this.getAttribute('data-navigation-offset') || 0;
        if (elem) {
            console.log(offset(elem).top - topOffset);
            body.stop().animate({ scrollTop: offset(elem).top - topOffset }, 500);
        }

    });

}());


fn.trigger();

$("html").easeScroll();