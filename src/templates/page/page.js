import './main.scss';
import '@webcomponents/webcomponentsjs';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { FormComponent} from "../../web-components/form";
window.customElements.define('c-form', FormComponent);