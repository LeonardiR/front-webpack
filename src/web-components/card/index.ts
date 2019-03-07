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
           this.userService.getUsers().subscribe((res: any) => {
               this.users = res.response;
               console.log(this.users);
               render(this.template(this.users), this);
            },
           err => {
               console.error('Something went wrong:', err.message);
           });
        }

        template(users:any) {
            return html`
                ${users.length > 0 ? html`
                    ${repeat(users, (user: any) =>
                        html`
                            <div class="c-card">
                                <div class="p-grid">
                                    <div class="p-grid__col p-grid__col--md-6 p-grid__col--sm-1">
                                        <img src="${user.avatar}">
                                    </div>
                                    <div class="p-grid__col">
                                        <h1>${user.name} ${user.lastName}</h1>
                                        <p><strong>Company:</strong> ${user.company}</p>
                                        <p><strong>Department:</strong> ${user.department}</p>
                                        <p><strong>Mobile:</strong> ${user.cellPhone}</p>
                                    </div>
                               </div>
                            </div>
                        `
                    )}
                `
                : html`<h1 style="text-align: center">NO USERS</h1>`
                }
            `;
        }
}
window.customElements.define('c-card', CardComponent);