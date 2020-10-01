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
});

function buildchart() {
    $(function() {
        Morris.Line({
            element: 'line-moris',
            data: [{
                period: '2010',
                iphone: 0,
                ipad: 0,
                itouch: 0
            }, {
                period: '2011',
                iphone: 50,
                ipad: 15,
                itouch: 5
            }, {
                period: '2012',
                iphone: 20,
                ipad: 50,
                itouch: 65
            }, {
                period: '2013',
                iphone: 60,
                ipad: 45,
                itouch: 7
            }, {
                period: '2014',
                iphone: 20,
                ipad: 30,
                itouch: 120
            }, {
                period: '2015',
                iphone: 25,
                ipad: 80,
                itouch: 40
            }, {
                period: '2016',
                iphone: 10,
                ipad: 10,
                itouch: 10
            }],
            lineColors: ['#FF4961', '#62d493', '#ff4a00'],
            xkey: 'period',
            ykeys: ['iphone', 'ipad', 'itouch'],
            labels: ['Site A', 'Site B', 'Site C'],
            ymax: 140,
            pointSize: 0,
            lineWidth: 3,
            resize: true,
            fillOpacity: 0.8,
            behaveLikeLine: true,
            gridLineColor: '#d2d2d2',
            hideHover: 'auto'
        });
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
        //Flot Ecommerce Chart Start
        $.plot($("#ecom-chart-2"), [{
            data: [
                [0, 2],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 24],
                [8, 20],
                [9, 16],
                [10, 18],
                [11, 10],
                [12, 20],
                [13, 27],
                [14, 15],
                [15, 20],
                [16, 24],
                [17, 20],
                [18, 16],
                [19, 18],
                [20, 10],
                [21, 20],
                [22, 10],
                [23, 5],
            ],
            color: "#62d493",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: "#62d493",
                barWidth: 0.7,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false
            },
        }], options_bt);
        $.plot($("#ecom-chart-4"), [{
            data: [
                [0, 2],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 24],
                [8, 20],
                [9, 16],
                [10, 18],
                [11, 10],
                [12, 20],
                [13, 27],
                [14, 15],
                [15, 20],
                [16, 24],
                [17, 20],
                [18, 16],
                [19, 18],
                [20, 10],
                [21, 20],
                [22, 10],
                [23, 5],
            ],
            color: "#f4ab55",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: "#f4ab55",
                barWidth: 0.7,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false
            },
        }], options_bt);

    });
}
