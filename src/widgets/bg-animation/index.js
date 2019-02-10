(function () {
    "use strict";
   var  viewportHeight = window.innerHeight,
        lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop,
        ticking = false;
    function AnimationBg() {
        this.animBgElement = document.querySelector('.bg-anim');
        this.animBgElementRef = document.querySelectorAll('.bg-anim__ref');
        this.animationClassPrefix = new RegExp('\\b' + 'anim--color-' + '(.*)?\\b', 'g').toString().replace(/[|/&\[\]\\;$%@"bg<>()+,*.?]/g, "");

    }

    AnimationBg.prototype.addAnimationBg = function (currentRefEl, direction)  {
        var elDataAtt = currentRefEl.getAttribute('data-background-anim'),
            currentElIndex = elDataAtt.match(/\d/g).join(''),
            previousIndex,
            currentElIndexInt = parseInt(currentElIndex);
            console.log(currentElIndex);
        if(currentElIndex !== '0'){
            this.animBgElement.classList.add(this.animationClassPrefix + currentElIndex);
        }

        if(direction === 'down'){
            currentElIndexInt = parseInt(currentElIndex);
            previousIndex = currentElIndexInt - 1;

            this.animBgElement.classList.remove(this.animationClassPrefix + previousIndex);
        }else if (direction === 'up') {
            currentElIndexInt = parseInt(currentElIndex);
            previousIndex = currentElIndexInt + 1;

            this.animBgElement.classList.remove(this.animationClassPrefix + previousIndex);
        }else if(currentElIndex === '0'){
            this.animBgElement.classList.remove(this.animationClassPrefix+'1');
        }
    };
    AnimationBg.prototype.checkCurrentElPos = function (currentScrollPosition, viewportHeight, lastScrollPosition) {
        for(var i = 0; this.animBgElementRef.length > i; i++) {
            var viewportTop = window.pageYOffset || document.documentElement.scrollTop,
                viewportBottom = viewportTop + viewportHeight,
                direction,
                animationElementTop = this.animBgElementRef[i].getBoundingClientRect().top + viewportTop,
                animationElementMiddle = animationElementTop + this.animBgElementRef[i].clientHeight/2,
                isElementVisible = animationElementMiddle <= viewportBottom && animationElementMiddle >= viewportTop;
            if(!isElementVisible) {
            }
            if (isElementVisible && currentScrollPosition < lastScrollPosition) {
                direction = 'down';
                this.addAnimationBg(this.animBgElementRef[i], direction);

            } else if (isElementVisible && currentScrollPosition > lastScrollPosition) {
                direction = 'up';
                this.addAnimationBg(this.animBgElementRef[i], direction);
            }
        }
    };

    function initAnimBg() {
        var animBg = new AnimationBg(),
            currentScrollPosition = document.body.getBoundingClientRect().top;
        if (!ticking) {
                window.requestAnimationFrame(function() {
                    animBg.checkCurrentElPos(currentScrollPosition, viewportHeight, lastScrollPosition);
                    lastScrollPosition = currentScrollPosition;
                    ticking = false;
                });
                ticking = true;
        }
    }
    window.addEventListener('scroll', initAnimBg);
})();