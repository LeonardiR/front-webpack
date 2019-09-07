/**
 * Loading component dependencies
 */
import { LitElement, html } from 'lit-element';
import { ChartService } from "../../services";
declare var google: any;

export class ChartComponent extends LitElement {
    public chartService = new ChartService();
    public chartData: [];

    static get properties() {
        return {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.getChartData();

    }

    renderChart(data: []) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            let dataChart = google.visualization.arrayToDataTable(data);

            const options = {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            };
            const chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(dataChart, google.charts.Bar.convertOptions(options));
        }
    }

    getChartData() {
        this.chartService.getChart().subscribe((res: any) => {
                this.chartData = res.response[0].data;
                this.renderChart(this.chartData);
            },
            err => {
                console.error('Something went wrong:', err.message);
            });
    }

    render() {
        return html`
           <div id="columnchart_material" class="c-chart"></div>
                    `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define('c-chart', ChartComponent);