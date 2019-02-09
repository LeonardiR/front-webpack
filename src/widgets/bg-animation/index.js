(function () {
    "use strict";
    function AnimationBg() {
        this.animBgElement = document.querySelector('.bg-anim');
        this.animBgElementRef = document.querySelectorAll('.bg-anim__ref');
        this.animationClassPrefix = new RegExp('\\b' + 'bg-anim--color-' + '(.*)?\\b', 'g');
    }

    AnimationBg.prototype.addAnimationBg = function (currentRefEl)  {
        var elDataAtt = currentRefEl.getAttribute('data-background-anim'),
            currentElIndex = elDataAtt.match(/\d/g),
            currentElIndex = currentElIndex.join('');
        this.animBgElement.classList.replace(this.animationClassPrefix, '');
        this.animBgElement.classList.add(this.animationClassPrefix + currentElIndex);
    };

    AnimationBg.prototype.currentRefEl = function () {
        for(var i = 0; this.animBgElementRef > i; i++) {

        }
    };


    function init() {
        var animBg = new AnimationBg();
        window.addEventListener('scroll', function () {

        });
    }
    init();
})();