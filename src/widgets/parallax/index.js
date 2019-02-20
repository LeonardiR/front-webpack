(function () {
    "use strict";
    var viewportHeight = window.innerHeight,
        lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop,
        timeout,
        parallax = new Parallax();

    function Parallax() {
        this.parallaxEl = document.querySelectorAll('.parallax__el');
    }

    Parallax.prototype.setElementTranslateY = function(viewportTop, viewportBottom){
        for(var i = 0; this.parallaxEl.length > i; i++) {
            var animationElementTop = this.parallaxEl[i].getBoundingClientRect().top + viewportTop;
            if(animationElementTop < viewportTop){
                this.parallaxEl[i].style.transform = "translate3d(0px, -250px, -1px)";
            }else if(animationElementTop > viewportBottom) {
                this.parallaxEl[i].style.transform = "translate3d(0px, 250px, -1px)";
            }
        }
    };

    Parallax.prototype.runAnimationParallax = function (currentRefEl, direction, animationElementMd )  {
        var transformPx = animationElementMd/3;
        currentRefEl.style.transform = "translate3d(0px, "+ transformPx +"px, -1px)";
        currentRefEl.style.opacity = '1';

    };
    Parallax.prototype.checkCurrentElPos = function (currentScrollPosition, viewportHeight, lastScrollPosition) {
        for(var i = 0; this.parallaxEl.length > i; i++) {
            var viewportTop = window.pageYOffset || document.documentElement.scrollTop,
                viewportBottom = viewportTop + viewportHeight,
                direction,
                animationElementHeight = this.parallaxEl[i].clientHeight,
                animationElementTop = this.parallaxEl[i].getBoundingClientRect().top + viewportTop,
                animationElementBottom = animationElementTop + animationElementHeight,
                animationElementMd = this.parallaxEl[i].getBoundingClientRect().top + (this.parallaxEl[i].clientHeight/2) - (viewportHeight/2),
                isElementVisible = animationElementTop <= viewportBottom && animationElementBottom >= viewportTop;
            if(!isElementVisible) {

            }
            if (isElementVisible && currentScrollPosition < lastScrollPosition) {
                direction = 'down';
                this.runAnimationParallax(this.parallaxEl[i], direction, animationElementMd);

            } else if (isElementVisible && currentScrollPosition > lastScrollPosition) {
                direction = 'up';
                this.runAnimationParallax(this.parallaxEl[i], direction, animationElementMd);
            }
        }
    };

    function initParallax() {
        var currentScrollPosition = document.body.getBoundingClientRect().top;
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
            parallax.checkCurrentElPos(currentScrollPosition, viewportHeight, lastScrollPosition);
            lastScrollPosition = currentScrollPosition;
        });
    }
    parallax.setElementTranslateY(lastScrollPosition, lastScrollPosition + viewportHeight);
    window.addEventListener('scroll', initParallax);
})();