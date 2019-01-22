(function () {
    "use strict";
    function SideDrawer() {
        this.drawer = document.querySelectorAll('.e-drawer');
        this.drawerBtn = document.querySelectorAll('.e-drawer__toggle-btn');
        this.drawerOpenClass = 'e-drawer--open';
        this.drawerOpenedBtn = 'e-drawer__toggle-btn--opened';
    }

    SideDrawer.prototype.toggleState = function () {
        var drawerOpenClass = this.drawerOpenClass,
            drawerOpenedBtn = this. drawerOpenedBtn;
        for (var i = 0; this.drawerBtn.length > i; i++) {
            this.drawerBtn[i].addEventListener('click', function (e) {
              e.stopPropagation();
              var currentDrawerId = e.currentTarget.getAttribute('data-drawer'),
                  currentDrawer = document.getElementById(currentDrawerId);
              e.currentTarget.classList.toggle(drawerOpenedBtn);
              currentDrawer.classList.toggle(drawerOpenClass);
          });
        }
    };
    SideDrawer.prototype.initDrawer = function () {
      if(this.drawer.length > 0){
          this.toggleState();
      }
    };
    function init() {
        var drawer = new SideDrawer();
        drawer.initDrawer();
    }
    init();
})();