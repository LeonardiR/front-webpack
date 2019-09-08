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

    renderChart(data:any) {
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            let dataChart = google.visualization.arrayToDataTable(data);

            const options = {
                chart: {
                    title: 'Savar',
                    subtitle: 'Factory Income | Median Factory Savar | Median Factory Helper'
                },
                colors: ['#1b9e77', '#d95f02', '#7570b3']
            };
            const chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                console.log(selectedItem);
            }

            // Listen for the 'select' event, and call my function selectHandler() when
            // the user selects something on the chart.
            google.visualization.events.addListener(chart, 'select', selectHandler);
            chart.draw(dataChart, google.charts.Bar.convertOptions(options));
        }
    }

    getChartData() {
        this.chartService.getChart().subscribe((res: any) => {
                this.chartData = res.response[0].data;
                console.log(this.chartData)
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