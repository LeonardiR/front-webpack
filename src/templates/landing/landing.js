import './main.scss';

export class ResizeIframe  {
    constructor(){
        this.iframe = null;
    }

    getIframeHeight() {
        window.addEventListener('message', (e) => {
            let iframeHeight = e.data;
            this.iframe.style.height = iframeHeight + 'px';
        } , false);
    }

    isIframe() {
      this.iframe = document.getElementById('test-iframe');
      if(this.iframe) {
          this.getIframeHeight();
      }
    }

    init(){
        this.isIframe();
    }
}
const resizeIframe = new ResizeIframe();
resizeIframe.init();

/* Set this code inside iframe
* <script type="text/javascript">
		(function() {
			setInterval(function() {
            	window.top.postMessage(document.body.scrollHeight, "http://localhost:3000/");
            }, 60);
		})();
	</script>
*
* */
