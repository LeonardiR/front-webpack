/**
 * Card component dependencies
 */
import { html, render} from 'lit-html';
import { repeat } from "lit-html/directives/repeat";
import { UserService } from "../../services";

/**
 * Styles
 */
import './main.scss';


export class CardComponent extends HTMLElement {
    public userService = new UserService();
    public users:[];

        constructor() {
            super();
        }

        connectedCallback() {
            this.renderCard();
        }

        renderCard(){
           this.userService.getUsers().subscribe(res =>{
               this.users = res.response;
               render(this.template(this.users), this);
            });
        }

        template(users:any) {
            return html`
                ${repeat(users, (user: any) =>
                    html`
                        <div class="c-card">
                            <h1>${user.name} ${user.lastName}</h1>
                            <p><strong>Company:</strong> ${user.company}</p>
                            <p><strong>Department:</strong> ${user.department}</p>
                            <p><strong>Mobile:</strong> ${user.cellPhone}</p>
                        </div>
                        `
                )}
             `;
        }
}
window.customElements.define('c-card', CardComponent);