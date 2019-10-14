import './main.scss';

class ResizeIframe  {
    setIframeHeight() {
        setInterval(function() {
            if(window.frameElement){
                let iframe = window.frameElement;
                iframe.style.height = document.body.scrollHeight + 'px';
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
