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
            color: "#28D094",
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
    });
    // tab am chart
    $(function() {
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
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("crypto-chart", am4charts.XYChart);
        chart.paddingRight = 20;

        chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        var series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "close";
        series.dataFields.openValueY = "open";
        series.dataFields.lowValueY = "low";
        series.dataFields.highValueY = "high";
        series.simplifiedProcessing = true;
        series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

        // series.dataFields.valueY.fillColor = "#1b8bf9";
        // important!
        // candlestick series colors are set in states.
        series.riseFromOpenState.properties.fill = am4core.color("#ff4a00");
        series.dropFromOpenState.properties.fill = am4core.color("#FF4961");
        series.riseFromOpenState.properties.stroke = am4core.color("#ff4a00");
        series.dropFromOpenState.properties.stroke = am4core.color("#FF4961");

        series.riseFromPreviousState.properties.fillOpacity = 1;
        series.dropFromPreviousState.properties.fillOpacity = 0;

        chart.cursor = new am4charts.XYCursor();

        // a separate series for scrollbar
        var lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.dateX = "date";
        lineSeries.dataFields.valueY = "close";
        // need to set on default state, as initially series is "show"
        lineSeries.defaultState.properties.visible = false;

        // hide from legend too (in case there is one)
        lineSeries.hiddenInLegend = true;
        lineSeries.fillOpacity = 0.5;
        lineSeries.strokeOpacity = 0.5;

        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(lineSeries);
        chart.scrollbarX = scrollbarX;

        chart.data = [{
            "date": "2011-08-01",
            "open": "136.65",
            "high": "136.96",
            "low": "134.15",
            "close": "136.49"
        }, {
            "date": "2011-08-02",
            "open": "135.26",
            "high": "135.95",
            "low": "131.50",
            "close": "131.85"
        }, {
            "date": "2011-08-05",
            "open": "132.90",
            "high": "135.27",
            "low": "128.30",
            "close": "135.25"
        }, {
            "date": "2011-08-06",
            "open": "134.94",
            "high": "137.24",
            "low": "132.63",
            "close": "135.03"
        }, {
            "date": "2011-08-07",
            "open": "136.76",
            "high": "136.86",
            "low": "132.00",
            "close": "134.01"
        }, {
            "date": "2011-08-08",
            "open": "131.11",
            "high": "133.00",
            "low": "125.09",
            "close": "126.39"
        }, {
            "date": "2011-08-09",
            "open": "123.12",
            "high": "127.75",
            "low": "120.30",
            "close": "125.00"
        }, {
            "date": "2011-08-12",
            "open": "128.32",
            "high": "129.35",
            "low": "126.50",
            "close": "127.79"
        }, {
            "date": "2011-08-13",
            "open": "128.29",
            "high": "128.30",
            "low": "123.71",
            "close": "124.03"
        }, {
            "date": "2011-08-14",
            "open": "122.74",
            "high": "124.86",
            "low": "119.65",
            "close": "119.90"
        }, {
            "date": "2011-08-15",
            "open": "117.01",
            "high": "118.50",
            "low": "111.62",
            "close": "117.05"
        }, {
            "date": "2011-08-16",
            "open": "122.01",
            "high": "123.50",
            "low": "119.82",
            "close": "122.06"
        }, {
            "date": "2011-08-19",
            "open": "123.96",
            "high": "124.50",
            "low": "120.50",
            "close": "122.22"
        }, {
            "date": "2011-08-20",
            "open": "122.21",
            "high": "128.96",
            "low": "121.00",
            "close": "127.57"
        }, {
            "date": "2011-08-21",
            "open": "131.22",
            "high": "132.75",
            "low": "130.33",
            "close": "132.51"
        }, {
            "date": "2011-08-22",
            "open": "133.09",
            "high": "133.34",
            "low": "129.76",
            "close": "131.07"
        }, {
            "date": "2011-08-23",
            "open": "130.53",
            "high": "135.37",
            "low": "129.81",
            "close": "135.30"
        }, {
            "date": "2011-08-26",
            "open": "133.39",
            "high": "134.66",
            "low": "132.10",
            "close": "132.25"
        }, {
            "date": "2011-08-27",
            "open": "130.99",
            "high": "132.41",
            "low": "126.63",
            "close": "126.82"
        }, {
            "date": "2011-08-28",
            "open": "129.88",
            "high": "134.18",
            "low": "129.54",
            "close": "134.08"
        }, {
            "date": "2011-08-29",
            "open": "132.67",
            "high": "138.25",
            "low": "132.30",
            "close": "136.25"
        }, {
            "date": "2011-08-30",
            "open": "139.49",
            "high": "139.65",
            "low": "137.41",
            "close": "138.48"
        }, {
            "date": "2011-09-03",
            "open": "139.94",
            "high": "145.73",
            "low": "139.84",
            "close": "144.16"
        }, {
            "date": "2011-09-04",
            "open": "144.97",
            "high": "145.84",
            "low": "136.10",
            "close": "136.76"
        }, {
            "date": "2011-09-05",
            "open": "135.56",
            "high": "137.57",
            "low": "132.71",
            "close": "135.01"
        }, {
            "date": "2011-09-06",
            "open": "132.01",
            "high": "132.30",
            "low": "130.00",
            "close": "131.77"
        }, {
            "date": "2011-09-09",
            "open": "136.99",
            "high": "138.04",
            "low": "133.95",
            "close": "136.71"
        }, {
            "date": "2011-09-10",
            "open": "137.90",
            "high": "138.30",
            "low": "133.75",
            "close": "135.49"
        }, {
            "date": "2011-09-11",
            "open": "135.99",
            "high": "139.40",
            "low": "135.75",
            "close": "136.85"
        }, {
            "date": "2011-09-12",
            "open": "138.83",
            "high": "139.00",
            "low": "136.65",
            "close": "137.20"
        }, {
            "date": "2011-09-13",
            "open": "136.57",
            "high": "138.98",
            "low": "136.20",
            "close": "138.81"
        }, {
            "date": "2011-09-16",
            "open": "138.99",
            "high": "140.59",
            "low": "137.60",
            "close": "138.41"
        }, {
            "date": "2011-09-17",
            "open": "139.06",
            "high": "142.85",
            "low": "137.83",
            "close": "140.92"
        }, {
            "date": "2011-09-18",
            "open": "143.02",
            "high": "143.16",
            "low": "139.40",
            "close": "140.77"
        }, {
            "date": "2011-09-19",
            "open": "140.15",
            "high": "141.79",
            "low": "139.32",
            "close": "140.31"
        }, {
            "date": "2011-09-20",
            "open": "141.14",
            "high": "144.65",
            "low": "140.31",
            "close": "144.15"
        }, {
            "date": "2011-09-23",
            "open": "146.73",
            "high": "149.85",
            "low": "146.65",
            "close": "148.28"
        }, {
            "date": "2011-09-24",
            "open": "146.84",
            "high": "153.22",
            "low": "146.82",
            "close": "153.18"
        }, {
            "date": "2011-09-25",
            "open": "154.47",
            "high": "155.00",
            "low": "151.25",
            "close": "152.77"
        }, {
            "date": "2011-09-26",
            "open": "153.77",
            "high": "154.52",
            "low": "152.32",
            "close": "154.50"
        }, {
            "date": "2011-09-27",
            "open": "153.44",
            "high": "154.60",
            "low": "152.75",
            "close": "153.47"
        }, {
            "date": "2011-09-30",
            "open": "154.63",
            "high": "157.41",
            "low": "152.93",
            "close": "156.34"
        }, {
            "date": "2011-10-01",
            "open": "156.55",
            "high": "158.59",
            "low": "155.89",
            "close": "158.45"
        }, {
            "date": "2011-10-02",
            "open": "157.78",
            "high": "159.18",
            "low": "157.01",
            "close": "157.92"
        }, {
            "date": "2011-10-03",
            "open": "158.00",
            "high": "158.08",
            "low": "153.50",
            "close": "156.24"
        }, {
            "date": "2011-10-04",
            "open": "158.37",
            "high": "161.58",
            "low": "157.70",
            "close": "161.45"
        }, {
            "date": "2011-10-07",
            "open": "163.49",
            "high": "167.91",
            "low": "162.97",
            "close": "167.91"
        }, {
            "date": "2011-10-08",
            "open": "170.20",
            "high": "171.11",
            "low": "166.68",
            "close": "167.86"
        }, {
            "date": "2011-10-09",
            "open": "167.55",
            "high": "167.88",
            "low": "165.60",
            "close": "166.79"
        }, {
            "date": "2011-10-10",
            "open": "169.49",
            "high": "171.88",
            "low": "153.21",
            "close": "162.23"
        }, {
            "date": "2011-10-11",
            "open": "163.01",
            "high": "167.28",
            "low": "161.80",
            "close": "167.25"
        }, {
            "date": "2011-10-14",
            "open": "167.98",
            "high": "169.57",
            "low": "163.50",
            "close": "166.98"
        }, {
            "date": "2011-10-15",
            "open": "165.54",
            "high": "170.18",
            "low": "165.15",
            "close": "169.58"
        }, {
            "date": "2011-10-16",
            "open": "172.69",
            "high": "173.04",
            "low": "169.18",
            "close": "172.75"
        }];
        chart.events.on("datavalidated", function() {
            dateAxis.zoomToDates(
                new Date(2011, 8, 10),
                new Date(2011, 9, 10)
            );
        });
    });
}
