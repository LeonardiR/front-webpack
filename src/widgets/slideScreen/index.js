(function () {
    "use strict";
    var slideScreen = {
        cta: document.querySelectorAll('.screen-cta'),
        goToScreen: function () {
            for(var i=0; this.cta.length > i; i++){
                this.cta[i].addEventListener('click', function (e) {
                    slideScreen.hideScreens();
                    var id = e.target.getAttribute('data-screen'),
                        screen = document.getElementById(id);
                    if(id !== 'screen-main'){
                        screen.classList.add('visible');
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