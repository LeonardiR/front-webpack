import './main.scss';

class ResizeIframe  {
    constructor() {
        this.height = 0;
        this.iframe = null;
        this.isIframe = window.self !== window.top;
    }

    setIframeHeight() {
        setInterval(function() {
            this.height = document.body.scrollHeight;
            if(window.frameElement){
                this.iframe = window.frameElement;
                this.iframe.style.height = this.height + 'px';
            }else{
                window.top.postMessage(this.height, "*");
            }
        }, 60);
    }

    init() {
        if(this.isIframe) {
            console.log('is iframe');
            this.setIframeHeight();
        }
    }
}
const resizeIframe = new ResizeIframe();
resizeIframe.init();
