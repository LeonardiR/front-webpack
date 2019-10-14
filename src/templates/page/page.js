import './main.scss';

class ResizeIframe  {
    constructor(){
        this.height = 0;
        this.iframe = null;
    }
    setIframeHeight() {
        setInterval(function() {
            if(window.frameElement){
                this.iframe = window.frameElement;
                this.height = document.body.scrollHeight;
                this.iframe.style.height = this.height + 'px';
            }else{
                window.top.postMessage(document.body.scrollHeight, "*");
            }
        }, 60);
    }
    init(){
        this.setIframeHeight();
    }
}
const resizeIframe = new ResizeIframe();
resizeIframe.init();
