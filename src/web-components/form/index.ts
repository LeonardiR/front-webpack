/**
 * Form component
 */
export class FormComponent extends HTMLElement {
public title = 'This is a web component form';
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }

    get template() {
        return`
        <div class="c-form">
            <h1>${this.title}</h1>
            <form>
                <input type="text" placeholder="Name" >
                <input type="text" placeholder="Last Name" >
                <input type="email" placeholder="Email" >
                <button type="submit" value="Send"></button>
            </form>
        </div>
        `;
    }
}