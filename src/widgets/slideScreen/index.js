(function () {
    "use strict";
    var slideScreen = {
        cta: document.querySelectorAll('.screen-cta'),
        goToScreen: function () {
            for(var i=0; this.cta.length > i; i++){
                this.cta[i].addEventListener('click', function (e) {
                    slideScreen.hideScreens();
                    var id = e.target.getAttribute('data-screen'),
                        screen = document.getElementById(id),
                        currentScreen = e.target.closest('.slide-screen__item');
                    if(id !== 'screen-main'){
                        screen.classList.add('visible');
                        currentScreen.classList.add('animating');
                        screen.addEventListener('transitionend', function () {
                            currentScreen.classList.remove('animating');
                        })
                    }
                });
            }
        },
        hideScreens: function(){
            for(var i=0; this.cta.length > i; i++){
                var id = this.cta[i].getAttribute('data-screen'),
                    screen = document.getElementById(id);
                screen.classList.remove('visible');
            }
        },
        init:function () {
            this.goToScreen();
        }
    };
    slideScreen.init();
})();