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
        //Flot Earnings Chart Start
        $.plot($("#earninga-chart-1"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: true,
                fillColor: "#fff",
                lineWidth: 0
            },
            points: {
                show: false,
                radius: 3,
                fill: false,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#earninga-chart-2"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: true,
                fillColor: "#fff",
                lineWidth: 0
            },
            points: {
                show: false,
                radius: 3,
                fill: false,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#earninga-chart-3"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: true,
                fillColor: "#fff",
                lineWidth: 0
            },
            points: {
                show: false,
                radius: 3,
                fill: false,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#earninga-chart-4"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: true,
                fillColor: "#fff",
                lineWidth: 0
            },
            points: {
                show: false,
                radius: 3,
                fill: false,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);

        //Flot Crypto Chart Start
        $.plot($("#crypto-chart-1"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#ff4a00",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_ct);
        $.plot($("#crypto-chart-2"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
            ],
            color: "#62d493",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_ct);
        $.plot($("#crypto-chart-3"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#FF4961",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_ct);
        $.plot($("#crypto-chart-4"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
            ],
            color: "#f4ab55",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_ct);

        //Flot Ecommerce Chart Start
        $.plot($("#ecom-chart-1"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
                [5, 30],
                [6, 5],
                [7, 26],
                [8, 10],
            ],
            color: "#ff4a00",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#ecom-chart-2"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 1],
            ],
            color: "#62d493",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#ecom-chart-3"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
                [5, 30],
                [6, 5],
                [7, 26],
                [8, 10],
            ],
            color: "#FF4961",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#ecom-chart-4"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 1],
            ],
            color: "#f4ab55",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);

        //Flot Number Chart Start
        $.plot($("#num-chart-1"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 5],
                [9, 26],
                [10, 8],
                [11, 22],
                [12, 5],
                [13, 26],
                [14, 8],
                [15, 22],
                [16, 1],
            ],
            color: "#ff4a00",
            lines: {
                show: true,
                fill: 0.1,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_bt);
        $.plot($("#num-chart-2"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 5],
                [9, 26],
                [10, 8],
                [11, 22],
                [12, 5],
                [13, 26],
                [14, 8],
                [15, 22],
                [16, 1],
            ],
            color: "#62d493",
            lines: {
                show: true,
                fill: 0.1,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_bt);
        $.plot($("#num-chart-3"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 5],
                [9, 26],
                [10, 8],
                [11, 22],
                [12, 5],
                [13, 26],
                [14, 8],
                [15, 22],
                [16, 1],
            ],
            color: "#FF4961",
            lines: {
                show: true,
                fill: 0.1,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_bt);
        $.plot($("#num-chart-4"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 5],
                [9, 26],
                [10, 8],
                [11, 22],
                [12, 5],
                [13, 26],
                [14, 8],
                [15, 22],
                [16, 1],
            ],
            color: "#f4ab55",
            lines: {
                show: true,
                fill: 0.1,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_bt);

        //Flot Week Chart Start
        $.plot($("#week-chart-1"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#ff4a00",
            lines: {
                show: true,
                fill: true,
                fillColor: "#ff4a00",
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#week-chart-2"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 28],
            ],
            color: "#62d493",
            lines: {
                show: true,
                fill: true,
                fillColor: "#62d493",
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#week-chart-3"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
            ],
            color: "#FF4961",
            lines: {
                show: true,
                fill: true,
                fillColor: "#FF4961",
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);
        $.plot($("#week-chart-4"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
            ],
            color: "#f4ab55",
            lines: {
                show: true,
                fill: true,
                fillColor: "#f4ab55",
                lineWidth: 3
            },
            points: {
                show: false,
                radius: 3,
                fill: true,
            },
            curvedLines: {
                apply: true,
            }
        }], options_bt);

        //Flot Order Chart Start
        $.plot($("#order-chart-1"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
                [5, 30],
                [6, 5],
                [7, 26],
                [8, 10],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#order-chart-2"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 1],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 1],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#order-chart-3"), [{
            data: [
                [0, 30],
                [1, 5],
                [2, 26],
                [3, 10],
                [4, 22],
                [5, 30],
                [6, 5],
                [7, 26],
                [8, 10],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);
        $.plot($("#order-chart-4"), [{
            data: [
                [0, 1],
                [1, 26],
                [2, 8],
                [3, 22],
                [4, 5],
                [5, 26],
                [6, 8],
                [7, 22],
                [8, 1],
            ],
            color: "#fff",
            lines: {
                show: true,
                fill: false,
                lineWidth: 3
            },
            points: {
                show: true,
                radius: 4,
                fillColor: "#fff",
                fill: true,
            },
            curvedLines: {
                apply: false,
            }
        }], options_ct);

        //Flot bar Chart Start
        $.plot($("#bar-chart-1"), [{
            data: [
                [0, 27],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 24],
                [8, 16],
                [9, 18],
                [10, 10],
                [11, 20],
                [12, 16],
                [13, 18],
                [14, 10],
                [15, 20],
                [16, 27],
                [17, 15],
                [18, 20],
                [19, 24],
                [20, 20],
                [21, 10],
                [22, 20],
                [23, 27],
            ],
            color: "#ff4a00",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: "#ff4a00",
                barWidth: 0.7,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false
            },
        }], options_bt);
        $.plot($("#bar-chart-2"), [{
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
        $.plot($("#bar-chart-3"), [{
            data: [
                [0, 27],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 24],
                [8, 16],
                [9, 18],
                [10, 10],
                [11, 20],
                [12, 16],
                [13, 18],
                [14, 10],
                [15, 20],
                [16, 27],
                [17, 15],
                [18, 20],
                [19, 24],
                [20, 20],
                [21, 10],
                [22, 20],
                [23, 27],
            ],
            color: "#FF4961",
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: "#FF4961",
                barWidth: 0.7,
                align: 'center',
                horizontal: false
            },
            points: {
                show: false
            },
        }], options_bt);
        $.plot($("#bar-chart-4"), [{
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

    $(function() {
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
            labels: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4'],
            barColors: ['#ff4a00', '#FF4961', '#62d493', '#f4ab55']
        });
        var chartd = new Chart(document.getElementById('doughnut-chart-1').getContext("2d"), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [54, 46],
                    backgroundColor: ['#ff4a00', '#f9f9f9'],
                    hoverBackgroundColor: ['#ff4a00', '#f9f9f9'],
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                cutoutPercentage: 94,
                responsive: true,
                maintainAspectRatio: false
            }
        });
        var chartd = new Chart(document.getElementById('doughnut-chart-2').getContext("2d"), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [15, 18],
                    backgroundColor: ['#62d493', '#f9f9f9'],
                    hoverBackgroundColor: ['#62d493', '#f9f9f9'],
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                cutoutPercentage: 94,
                responsive: true,
                maintainAspectRatio: false
            }
        });
        var chartd = new Chart(document.getElementById('doughnut-chart-3').getContext("2d"), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [8, 40],
                    backgroundColor: ['#FF4961', '#f9f9f9'],
                    hoverBackgroundColor: ['#FF4961', '#f9f9f9'],
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                cutoutPercentage: 94,
                responsive: true,
                maintainAspectRatio: false
            }
        });
        var chartd = new Chart(document.getElementById('doughnut-chart-4').getContext("2d"), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [17, 40],
                    backgroundColor: ['#f4ab55', '#f9f9f9'],
                    hoverBackgroundColor: ['#f4ab55', '#f9f9f9'],
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                cutoutPercentage: 94,
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
    // tab am chart
    $(function() {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("tab-am-1", am4charts.XYChart);
        var data = [];
        var price1 = 1000,
            price2 = 1200;
        var quantity = 500;
        for (var i = 0; i < 360; i++) {
            price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
            data.push({
                date1: new Date(2018, 0, i),
                price1: price1
            });
        }
        chart.data = data;
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 60;

        var series = chart.series.push(new am4charts.LineSeries());
        series.name = "2016";
        series.dataFields.dateX = "date1";
        series.dataFields.valueY = "price1";
        series.tooltipText = "{valueY.value}";
        series.fill = am4core.color("#ff4a00");
        series.stroke = am4core.color("#ff4a00");
        series.strokeWidth = 3;
        series.tensionY = 1;
        series.tensionX = 0.8;

        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#ff4a00';
        series.filters.push(dropShadow);

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.startLocation = 0.5;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.endLocation = 0.5;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = chart.plotContainer;
        chart.legend.zIndex = 100;

        dateAxis.renderer.grid.template.strokeOpacity = 0.07;
        valueAxis.renderer.grid.template.strokeOpacity = 0.07;

        chart.events.on("datavalidated", function() {
            dateAxis.zoomToDates(
                new Date(2018, 1, 10),
                new Date(2018, 1, 27)
            );
        });
    });
    $(function() {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("tab-am-2", am4charts.XYChart);
        var data = [];
        var price1 = 1000,
            price2 = 1200;
        var quantity = 500;
        for (var i = 0; i < 360; i++) {
            price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
            data.push({
                date1: new Date(2018, 0, i),
                price1: price1
            });
        }
        chart.data = data;
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 60;

        var series = chart.series.push(new am4charts.LineSeries());
        series.name = "2016";
        series.dataFields.dateX = "date1";
        series.dataFields.valueY = "price1";
        series.tooltipText = "{valueY.value}";
        series.fill = am4core.color("#FF4961");
        series.stroke = am4core.color("#FF4961");
        series.strokeWidth = 3;
        series.tensionY = 1;
        series.tensionX = 0.8;

        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#FF4961';
        series.filters.push(dropShadow);

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.startLocation = 0.5;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.endLocation = 0.5;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = chart.plotContainer;
        chart.legend.zIndex = 100;

        dateAxis.renderer.grid.template.strokeOpacity = 0.07;
        valueAxis.renderer.grid.template.strokeOpacity = 0.07;

        chart.events.on("datavalidated", function() {
            dateAxis.zoomToDates(
                new Date(2018, 1, 10),
                new Date(2018, 1, 27)
            );
        });
    });
    $(function() {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("tab-am-3", am4charts.XYChart);
        var data = [];
        var price1 = 1000,
            price2 = 1200;
        var quantity = 500;
        for (var i = 0; i < 360; i++) {
            price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
            data.push({
                date1: new Date(2018, 0, i),
                price1: price1
            });
        }
        chart.data = data;
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.grid.template.location = 0.5;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 60;

        var series = chart.series.push(new am4charts.LineSeries());
        series.name = "2016";
        series.dataFields.dateX = "date1";
        series.dataFields.valueY = "price1";
        series.tooltipText = "{valueY.value}";
        series.fill = am4core.color("#f4ab55");
        series.stroke = am4core.color("#f4ab55");
        series.strokeWidth = 3;
        series.tensionY = 1;
        series.tensionX = 0.8;

        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#f4ab55';
        series.filters.push(dropShadow);

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.startLocation = 0.5;
        chart.scrollbarX.scrollbarChart.series.getIndex(0).xAxis.endLocation = 0.5;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = chart.plotContainer;
        chart.legend.zIndex = 100;

        dateAxis.renderer.grid.template.strokeOpacity = 0.07;
        valueAxis.renderer.grid.template.strokeOpacity = 0.07;

        chart.events.on("datavalidated", function() {
            dateAxis.zoomToDates(
                new Date(2018, 1, 10),
                new Date(2018, 1, 27)
            );
        });
    });
    $(function() {
        // Create chart instance
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("am-lines", am4charts.XYChart);

        // Add data
        chart.data = [{
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
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "period";
        categoryAxis.title.text = "Year";

        // First value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Value";


        // First series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "iphone";
        series.dataFields.categoryX = "period";
        series.name = "iphone";
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.strokeWidth = 3;
        series.tensionY = 1;
        series.tensionX = 0.8;
        series.fill = am4core.color("#62d493");
        series.stroke = am4core.color("#62d493");
        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#62d493';
        series.filters.push(dropShadow);


        // Second series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "ipad";
        series2.dataFields.categoryX = "period";
        series2.name = "ipad";
        series2.tooltipText = "{name}: [bold]{valueY}[/]";
        series2.strokeWidth = 3;
        series2.tensionY = 1;
        series2.tensionX = 0.8;
        series2.fill = am4core.color("#FF4961");
        series2.stroke = am4core.color("#FF4961");
        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#FF4961';
        series2.filters.push(dropShadow);

        // Second series
        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "itouch";
        series3.dataFields.categoryX = "period";
        series3.name = "itouch";
        series3.tooltipText = "{name}: [bold]{valueY}[/]";
        series3.strokeWidth = 3;
        series3.tensionY = 1;
        series3.tensionX = 0.8;
        series3.fill = am4core.color("#ff4a00");
        series3.stroke = am4core.color("#ff4a00");
        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#ff4a00';
        series3.filters.push(dropShadow);

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = 'top';

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        valueAxis.renderer.grid.template.strokeOpacity = 0;
    });
    $(function() {
        // Create chart instance
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("am-lines-1", am4charts.XYChart);

        // Add data
        chart.data = [{
            period: '2010',
            iphone: 0,
            itouch: 60
        }, {
            period: '2011',
            iphone: 50,
            itouch: 5
        }, {
            period: '2012',
            iphone: 20,
            itouch: 65
        }, {
            period: '2013',
            iphone: 60,
            itouch: 7
        }, {
            period: '2014',
            iphone: 20,
            itouch: 120
        }, {
            period: '2015',
            iphone: 60,
            itouch: 25
        }, {
            period: '2016',
            iphone: 10,
            itouch: 60
        }];

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "period";
        categoryAxis.title.text = "Year";

        // First value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Value";


        // First series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "iphone";
        series.dataFields.categoryX = "period";
        series.name = "iphone";
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.strokeWidth = 4;
        series.strokeDasharray = 10;
        series.tensionY = 1;
        series.tensionX = 0.8;
        series.fill = am4core.color("#C4C2C3");
        series.stroke = am4core.color("#C4C2C3");

        // Second series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "itouch";
        series2.dataFields.categoryX = "period";
        series2.name = "itouch";
        series2.tooltipText = "{name}: [bold]{valueY}[/]";
        series2.strokeWidth = 4;
        series2.tensionY = 1;
        series2.tensionX = 0.8;
        series2.fill = am4core.color("#ff4a00");
        series2.stroke = am4core.color("#ff4a00");
        var dropShadow = new am4core.DropShadowFilter();
        dropShadow.dy = 15;
        dropShadow.dx = 1;
        dropShadow.blur = 8;
        dropShadow.opacity = 0.5;
        dropShadow.color = '#ff4a00';
        series2.filters.push(dropShadow);

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = 'top';

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        categoryAxis.renderer.grid.template.strokeOpacity = 0;

    });
    $(function() {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chart-pie", am4charts.PieChart3D);
        // Add data
        chart.data = [{
                "sector": "Order",
                "size": 8
            },
            {
                "sector": "Stock",
                "size": 8
            },
            {
                "sector": "Profit",
                "size": 8
            }, {
                "sector": "Sale",
                "size": 8
            },
            {
                "sector": "Other",
                "size": 8
            }
        ];
        // Add label
        chart.innerRadius = 60;
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "size";
        pieSeries.dataFields.category = "sector";
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        // pieSeries.colors.step = 3;
        pieSeries.colors.list = [
            am4core.color("#ff4a00"),
            am4core.color("#62d493"),
            am4core.color("#FF4961"),
            am4core.color("#f4ab55"),
            am4core.color("#55a3f4"),
            am4core.color("#fff")
        ];

    });
}



//
// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end
//
// // Create chart instance
// var chart = am4core.create("chartdiv", am4charts.XYChart);
//
//
// chart.data = [{
//   "city": "1",
//   "facebook": 23.5,
//   "twitter": 40.5,
//   "youtube": 23.5,
// }, {
//   "city": "2",
//   "facebook": 26.2,
//   "twitter": 46.5,
//   "youtube": 26.2,
// }, {
//   "city": "3",
//   "facebook": 28.1,
//   "twitter": 48.5,
//   "youtube": 28.1,
// }, {
//   "city": "4",
//   "facebook": 28.9,
//   "twitter": 42.5,
//   "youtube": 28.9,
// }, {
//   "city": "5",
//   "facebook": 24.6,
//   "twitter": 52.5,
//   "youtube": 28.9,
// }, {
//   "city": "6",
//   "facebook": 25.2,
//   "twitter": 19.5,
//   "youtube": 25.2,
// }, {
//   "city": "7",
//   "facebook": 28.1,
//   "twitter": 22.5,
//   "youtube": 28.1,
// }];
//
// //create category axis for years
// var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "city";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.cellStartLocation = 0.15;
// categoryAxis.renderer.cellEndLocation = 0.85;
// categoryAxis.renderer.grid.template.strokeOpacity = 0;
// categoryAxis.renderer.inside = true;
// categoryAxis.renderer.labels.template.disabled = true;
//
// //create value axis for income and expenses
// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.renderer.grid.template.strokeOpacity = 0;
// valueAxis.renderer.grid.template.strokeOpacity = 0;
// valueAxis.renderer.inside = true;
// valueAxis.renderer.labels.template.disabled = true;
//
// //create columns
// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "youtube";
// series.dataFields.categoryX = "city";
// series.columns.template.height = am4core.percent(90);
// series.tooltipText = "youtube : {valueY.value}";
// series.columns.template.fill = am4core.color("#62d493");
// series.columns.template.stroke = am4core.color("#62d493");
// series.columns.template.column.fillOpacity = 1;
// series.columns.template.column.strokeOpacity = 1;
// // series.stacked = true;
//
// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "facebook";
// series.dataFields.categoryX = "city";
// series.columns.template.height = am4core.percent(90);
// series.tooltipText = "facebook : {valueY.value}";
// series.columns.template.fill = am4core.color("#FF4961");
// series.columns.template.stroke = am4core.color("#FF4961");
// // series.stacked = true;
//
// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "twitter";
// series.dataFields.categoryX = "city";
// series.columns.template.height = am4core.percent(90);
// series.tooltipText = "twitter : {valueY.value}";
// series.columns.template.fill = am4core.color("#55a3f4");
// series.columns.template.stroke = am4core.color("#55a3f4");
// series.columns.template.column.fillOpacity = 1;
// series.columns.template.column.strokeOpacity = 1;
// // series.stacked = true;
//
// //add chart cursor
// chart.cursor = new am4charts.XYCursor();
// chart.cursor.behavior = "zoomY";
// chart.padding(0, 0, 0, 0);
