let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://matsukiyuma.github.io/InfoVis2021/W12/nba_draft_combine_all_years.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.Draft_pick = +d.Draft_pick;
            d.Wingspan = +d.Wingspan;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['PG','SG','SF','PF','C']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Draft pick ',
            ylabel: 'Wingspan ',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Position',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.pos ) );
    }
    scatter_plot.update();
}
