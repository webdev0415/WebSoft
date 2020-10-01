'use strict';
$(document).ready(function() {
    buildchart()
    $(window).on('resize', function() {
        buildchart();
    });
    $('#mobile-collapse').on('click', function() {
        setTimeout(function() {
            buildchart();
        }, 700);
    });
    Morris.Bar({
        element: 'chart-bar-moris',
        data: [{
                y: '2008',
                a: 50,
                b: 40,
                c: 35,
                d: 40,
            },
            {
                y: '2009',
                a: 75,
                b: 65,
                c: 60,
                d: 75,

            },
            {
                y: '2010',
                a: 50,
                b: 40,
                c: 55,
                d: 45,
            },
            {
                y: '2011',
                a: 75,
                b: 65,
                c: 85,
                b: 60,
            },
            {
                y: '2012',
                a: 100,
                b: 90,
                c: 40,
                b: 80,
            }
        ],
        xkey: 'y',
        barSizeRatio: 0.70,
        barGap: 5,
        resize: true,
        responsive: true,
        ykeys: ['a', 'b', 'c', 'b'],
        labels: ['Payroll', 'HRM', 'E-commerce', 'Support'],
        barColors: ['#ff4a00', '#FF4961', '#62d493', '#f4ab55']
    });
});

function buildchart() {
    $(function() {
        //Flot Base Build Option for bottom join
        var options_bt = {
            legend: {
                show: false
            },
            series: {
                label: "",
                shadowSize: 0,
                curvedLines: {
                    active: true,
                    nrSplinePoints: 20
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0,
                margin: {
                    top: 5,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }
            },
            yaxis: {
                min: 0,
                max: 30,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        };

        //Flot Base Build Option for Center card
        var options_ct = {
            legend: {
                show: false
            },
            series: {
                label: "",
                shadowSize: 0,
                curvedLines: {
                    active: true,
                    nrSplinePoints: 20
                },
            },
            tooltip: {
                show: true,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 5,
                margin: {
                    top: 8,
                    left: 8,
                    bottom: 8,
                    right: 8,
                }
            },
            yaxis: {
                min: 0,
                max: 30,
                color: 'transparent',
                font: {
                    size: 0,
                }
            },
            xaxis: {
                color: 'transparent',
                font: {
                    size: 0,
                }
            }
        };

    });
}
