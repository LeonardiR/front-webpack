'use strict';
function TypeJs(typeEl, speed) {
    this.typeEL = typeEl;
    this.speed = speed;
    this.index = 0;
}
TypeJs.prototype.startTyping = function () {
    var txt = this.typeEL.getAttribute('data-typejs'),
        index = this.index,
        typeEl = this.typeEL,
        speed = this.speed,
        now,
        then = Date.now(),
        delta;
    function type() {
        if (index < txt.length) {
            requestAnimationFrame(type);
            now = Date.now();
            delta = now - then;
            if (delta > speed) {
                then = now - (delta % speed);
                typeEl.innerHTML += txt.charAt(index);
                index++;
            }
        }
    }
    type();
};
function init() {
    var typeElements = document.querySelectorAll('[data-typejs]'),
        typeElementsArray = [];
    for (var i = 0; typeElements.length > i; i++){
        typeElementsArray[i] = new TypeJs(typeElements[i], 70);
        typeElementsArray[i].startTyping();
    }
}
    init();

