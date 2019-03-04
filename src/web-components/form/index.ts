/**
 * Form component
 */
import {UserService} from "../../services";

export class FormComponent extends HTMLElement {
public title = 'This is a web component form';
public userService = new UserService();

    constructor() {
        super();
    }

    connectedCallback() {
        this.getUsersCall();
        this.innerHTML = this.template()
    }

    getUsersCall(){
       this.userService.getUsers().subscribe(res=>{
        console.log(res);
       });
    }

    template() {
        return`
        <div class="c-form">
            <h1>${this.title}</h1>
            <form>
                <input type="text" placeholder="Name" >
                <input type="text" placeholder="Last Name" >
                <input type="email" placeholder="Email" >
                <button type="submit" value="Send">SEND</button>
            </form>
        </div>
        `;
    }
}
window.customElements.define('c-form', FormComponent);