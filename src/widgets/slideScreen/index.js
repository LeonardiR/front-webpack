(function () {
    "use strict";
    var slideScreen = {
        cta: document.querySelectorAll('.screen-cta'),
        goToScreen: function () {
            for(var i=0; this.cta.length > i; i++){
                this.cta[i].addEventListener('click', function (e) {
                    var id = e.target.getAttribute('data-screen'),
                        screen = document.getElementById(id);
                    screen.classList.toggle('visible');
                });
            }
        },
        init:function () {
            this.goToScreen();
        }
    };
    slideScreen.init();
})();