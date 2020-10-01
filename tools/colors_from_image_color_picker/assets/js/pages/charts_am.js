'use strict';
$(function() {
    // [ pie-chart ] start
    $(function() {
        var chart = am4core.create("am-pie-1", am4charts.PieChart);
        am4core.useTheme(am4themes_animated);
        chart.data = [{
            "country": "Lithuania",
            "litres": 201.9
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }];
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        chart.legend = new am4charts.Legend();
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.step = 3;
    });
    // [ pie-chart ] end
    // [ pie-animate chart ] start
    $(function() {
        var chart = am4core.create("am-pie-6", am4charts.PieChart3D);
        am4core.useTheme(am4themes_animated);
        chart.innerRadius = am4core.percent(40);
        chart.data = [{
            "country": "Lithuania",
            "litres": 201.9
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries3D());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.strokeWidth = 0;
        pieSeries.slices.template.strokeOpacity = 0;
        pieSeries.colors.step = 3;
        pieSeries.slices.template.cornerRadius = 5;
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
        pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;
        chart.legend = new am4charts.Legend();
    });
    // [ pie-animate chart ] end
    // [ pie-Dragging chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);

        var data = [{
            "country": "Dummy",
            "disabled": true,
            "litres": 1000,
            "color": am4core.color("#dadada"),
            "opacity": 0.3,
            "strokeDasharray": "4,4"
        }, {
            "country": "Lithuania",
            "litres": 501.9
        }, {
            "country": "Czech Republic",
            "litres": 301.9
        }, {
            "country": "Ireland",
            "litres": 201.1
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "Austria",
            "litres": 128.3
        }];

        var container = am4core.create("am-pie-7", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";

        container.events.on("maxsizechanged", function() {
            chart1.zIndex = 0;
            separatorLine.zIndex = 1;
            dragText.zIndex = 2;
            chart2.zIndex = 3;
        })

        var chart1 = container.createChild(am4charts.PieChart);
        chart1.data = data;
        chart1.radius = am4core.percent(70);
        chart1.innerRadius = am4core.percent(40);
        chart1.zIndex = 1;
        var series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = "litres";
        series1.dataFields.category = "country";
        series1.colors.step = 3;
        series1.labels.template.disabled = true;
        series1.ticks.template.disabled = true;

        var sliceTemplate1 = series1.slices.template;
        sliceTemplate1.cornerRadius = 5;
        sliceTemplate1.draggable = true;
        sliceTemplate1.inert = true;
        sliceTemplate1.propertyFields.fill = "color";
        sliceTemplate1.propertyFields.fillOpacity = "opacity";
        sliceTemplate1.propertyFields.stroke = "color";
        sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
        sliceTemplate1.strokeWidth = 1;
        sliceTemplate1.strokeOpacity = 1;

        var zIndex = 5;

        sliceTemplate1.events.on("down", function(event) {
            event.target.toFront();

            var series = event.target.dataItem.component;
            series.chart.zIndex = zIndex++;
        })

        series1.labels.template.propertyFields.disabled = "disabled";
        series1.ticks.template.propertyFields.disabled = "disabled";

        sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

        sliceTemplate1.events.on("dragstop", function(event) {
            handleDragStop(event);
        })

        var separatorLine = container.createChild(am4core.Line);
        separatorLine.x1 = 0;
        separatorLine.y2 = 300;
        separatorLine.strokeWidth = 3;
        separatorLine.stroke = am4core.color("#dadada");
        separatorLine.valign = "middle";
        separatorLine.strokeDasharray = "5,5";

        var dragText = container.createChild(am4core.Label);
        dragText.text = "Drag slices over the line";
        dragText.rotation = 90;
        dragText.valign = "middle";
        dragText.align = "center";
        dragText.paddingBottom = 5;

        var chart2 = container.createChild(am4charts.PieChart);
        chart2.radius = am4core.percent(70);
        chart2.data = data;
        chart2.innerRadius = am4core.percent(40);
        chart2.zIndex = 1;

        var series2 = chart2.series.push(new am4charts.PieSeries());
        series2.dataFields.value = "litres";
        series2.dataFields.category = "country";
        series2.colors.step = 3;
        series2.labels.template.disabled = true;
        series2.ticks.template.disabled = true;

        var sliceTemplate2 = series2.slices.template;
        sliceTemplate2.copyFrom(sliceTemplate1);

        series2.labels.template.propertyFields.disabled = "disabled";
        series2.ticks.template.propertyFields.disabled = "disabled";

        function handleDragStop(event) {
            var targetSlice = event.target;
            var dataItem1;
            var dataItem2;
            var slice1;
            var slice2;

            if (series1.slices.indexOf(targetSlice) != -1) {
                slice1 = targetSlice;
                slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
            } else if (series2.slices.indexOf(targetSlice) != -1) {
                slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                slice2 = targetSlice;
            }

            dataItem1 = slice1.dataItem;
            dataItem2 = slice2.dataItem;

            var series1Center = am4core.utils.spritePointToSvg({
                x: 0,
                y: 0
            }, series1.slicesContainer);
            var series2Center = am4core.utils.spritePointToSvg({
                x: 0,
                y: 0
            }, series2.slicesContainer);

            var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
            var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

            var targetSlicePoint = am4core.utils.spritePointToSvg({
                x: targetSlice.tooltipX,
                y: targetSlice.tooltipY
            }, targetSlice);

            if (targetSlice == slice1) {
                if (targetSlicePoint.x > container.pixelWidth / 2) {
                    var value = dataItem1.value;

                    dataItem1.hide();

                    var animation = slice1.animate([{
                        property: "x",
                        to: series2CenterConverted.x
                    }, {
                        property: "y",
                        to: series2CenterConverted.y
                    }], 400);
                    animation.events.on("animationprogress", function(event) {
                        slice1.hideTooltip();
                    })

                    slice2.x = 0;
                    slice2.y = 0;

                    dataItem2.show();
                } else {
                    slice1.animate([{
                        property: "x",
                        to: 0
                    }, {
                        property: "y",
                        to: 0
                    }], 400);
                }
            }
            if (targetSlice == slice2) {
                if (targetSlicePoint.x < container.pixelWidth / 2) {

                    var value = dataItem2.value;

                    dataItem2.hide();

                    var animation = slice2.animate([{
                        property: "x",
                        to: series1CenterConverted.x
                    }, {
                        property: "y",
                        to: series1CenterConverted.y
                    }], 400);
                    animation.events.on("animationprogress", function(event) {
                        slice2.hideTooltip();
                    })

                    slice1.x = 0;
                    slice1.y = 0;
                    dataItem1.show();
                } else {
                    slice2.animate([{
                        property: "x",
                        to: 0
                    }, {
                        property: "y",
                        to: 0
                    }], 400);
                }
            }

            toggleDummySlice(series1);
            toggleDummySlice(series2);

            series1.hideTooltip();
            series2.hideTooltip();
        }

        function toggleDummySlice(series) {
            var show = true;
            for (var i = 1; i < series.dataItems.length; i++) {
                var dataItem = series.dataItems.getIndex(i);
                if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                    show = false;
                }
            }

            var dummySlice = series.dataItems.getIndex(0);
            if (show) {
                dummySlice.show();
            } else {
                dummySlice.hide();
            }
        }

        series2.events.on("datavalidated", function() {

            var dummyDataItem = series2.dataItems.getIndex(0);
            dummyDataItem.show(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;

            for (var i = 1; i < series2.dataItems.length; i++) {
                series2.dataItems.getIndex(i).hide(0);
            }
        })

        series1.events.on("datavalidated", function() {
            var dummyDataItem = series1.dataItems.getIndex(0);
            dummyDataItem.hide(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;
        })
    });
    // [ pie-Dragging chart ] end
    // [ XY-Stacked-1 chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("am-xy-1", am4charts.XYChart);
        chart.data = [{
            "country": "Lithuania",
            "research": 501.9,
            "marketing": 250,
            "sales": 199
        }, {
            "country": "Czech Republic",
            "research": 301.9,
            "marketing": 222,
            "sales": 251
        }, {
            "country": "Ireland",
            "research": 201.1,
            "marketing": 170,
            "sales": 199
        }, {
            "country": "Germany",
            "research": 165.8,
            "marketing": 122,
            "sales": 90
        }, {
            "country": "Australia",
            "research": 139.9,
            "marketing": 99,
            "sales": 252
        }, {
            "country": "Austria",
            "research": 128.3,
            "marketing": 85,
            "sales": 84
        }];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.title.text = "Local country offices";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 40;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Expenditure (M)";

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "research";
        series.dataFields.categoryX = "country";
        series.name = "Research";
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.columns.template.fill = am4core.color("#FF4961");
        series.columns.template.stroke = am4core.color("#FF4961");

        var series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "marketing";
        series2.dataFields.categoryX = "country";
        series2.name = "Marketing";
        series2.tooltipText = "{name}: [bold]{valueY}[/]";
        series2.columns.template.fill = am4core.color("#62d493");
        series2.columns.template.stroke = am4core.color("#62d493");

        var series3 = chart.series.push(new am4charts.ColumnSeries());
        series3.dataFields.valueY = "sales";
        series3.dataFields.categoryX = "country";
        series3.name = "Sales";
        series3.tooltipText = "{name}: [bold]{valueY}[/]";
        series3.columns.template.fill = am4core.color("#ff4a00");
        series3.columns.template.stroke = am4core.color("#ff4a00");
        var columnTemplate = series.columns.template;
        columnTemplate.width = '50%';
        var columnTemplate = series2.columns.template;
        columnTemplate.width = '50%';
        var columnTemplate = series3.columns.template;
        columnTemplate.width = '50%';
        chart.cursor = new am4charts.XYCursor();
    });
    // [ XY-Stacked-1 chart ] end
    // [ XY-Draggable-1 chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("am-xy-10", am4charts.XYChart);
        chart.data = [{
                country: "USA",
                visits: 3025
            },
            {
                country: "China",
                visits: 1882
            },
            {
                country: "Japan",
                visits: 1809
            },
            {
                country: "UK",
                visits: 1122
            },
            {
                country: "France",
                visits: 1114
            },
            {
                country: "India",
                visits: 984
            }
        ];

        chart.padding(40, 40, 0, 0);
        chart.maskBullets = false;

        var text = chart.plotContainer.createChild(am4core.Label);
        text.text = "Drag column bullet to change its value";
        text.y = 92;
        text.x = am4core.percent(98);
        text.horizontalCenter = "right";
        text.zIndex = 100;
        text.fillOpacity = 1;

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.minGridDistance = 50;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        valueAxis.strictMinMax = true;
        valueAxis.min = 0;
        valueAxis.max = 3400;
        valueAxis.renderer.minWidth = 60;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "visits";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.dy = -8;
        series.sequencedInterpolation = true;
        series.defaultState.interpolationDuration = 1500;
        series.columns.template.strokeOpacity = 0;

        var labelBullet = new am4charts.LabelBullet();
        series.bullets.push(labelBullet);
        labelBullet.label.text = "{valueY.value.formatNumber('#.')}";
        labelBullet.strokeOpacity = 0;
        labelBullet.stroke = am4core.color("#dadada");
        labelBullet.dy = -20;

        var bullet = series.bullets.create();
        bullet.stroke = am4core.color("#ffffff");
        bullet.strokeWidth = 3;
        bullet.opacity = 0;
        bullet.defaultState.properties.opacity = 0;

        bullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
        bullet.draggable = true;

        var hoverState = bullet.states.create("hover");
        hoverState.properties.opacity = 1;

        var circle = bullet.createChild(am4core.Circle);
        circle.radius = 8;

        bullet.events.on("drag", event => {
            handleDrag(event);
        });

        bullet.events.on("dragstop", event => {
            handleDrag(event);
            var dataItem = event.target.dataItem;
            dataItem.column.isHover = false;
            event.target.isHover = false;
        });

        function handleDrag(event) {
            var dataItem = event.target.dataItem;
            var value = valueAxis.yToValue(event.target.pixelY);
            dataItem.valueY = value;
            dataItem.column.isHover = true;
            dataItem.column.hideTooltip(0);
            event.target.isHover = true;
        }

        var columnTemplate = series.columns.template;
        columnTemplate.column.cornerRadiusTopLeft = 8;
        columnTemplate.column.cornerRadiusTopRight = 8;
        columnTemplate.fillOpacity = 1;
        columnTemplate.tooltipText = "drag me";
        columnTemplate.tooltipY = 0;

        var columnHoverState = columnTemplate.column.states.create("hover");
        columnHoverState.properties.fillOpacity = 1;

        columnHoverState.properties.cornerRadiusTopLeft = 35;
        columnHoverState.properties.cornerRadiusTopRight = 35;

        columnTemplate.events.on("over", event => {
            var dataItem = event.target.dataItem;
            var itemBullet = dataItem.bullets.getKey(bullet.uid);
            itemBullet.isHover = true;
        });

        columnTemplate.events.on("out", event => {
            var dataItem = event.target.dataItem;
            var itemBullet = dataItem.bullets.getKey(bullet.uid);

            setTimeout(() => {
                itemBullet.isHover = false;
            }, 1000);
        });

        columnTemplate.events.on("down", event => {
            var dataItem = event.target.dataItem;
            var itemBullet = dataItem.bullets.getKey(bullet.uid);
            itemBullet.dragStart(event.pointer);
        });

        columnTemplate.events.on("positionchanged", event => {
            var dataItem = event.target.dataItem;
            var itemBullet = dataItem.bullets.getKey(bullet.uid);

            var column = dataItem.column;
            itemBullet.minX = column.pixelX + column.pixelWidth / 2;
            itemBullet.maxX = itemBullet.minX;
            itemBullet.minY = 0;
            itemBullet.maxY = chart.seriesContainer.pixelHeight;
        });

        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });
    });
    // [ XY-Draggable-1 chart ] end
    // [ XY-3D chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("am-xy-5", am4charts.XYChart3D);
        chart.data = [{
            "country": "Lithuania",
            "litres": 501.9,
            "units": 450
        }, {
            "country": "Czech Republic",
            "litres": 301.9,
            "units": 222
        }, {
            "country": "Ireland",
            "litres": 401.1,
            "units": 300
        }, {
            "country": "Germany",
            "litres": 452,
            "units": 165.8
        }, {
            "country": "Australia",
            "litres": 439.9,
            "units": 299
        }, {
            "country": "Austria",
            "litres": 185,
            "units": 128.3
        }, {
            "country": "UK",
            "litres": 299,
            "units": 193
        }, {
            "country": "Belgium",
            "litres": 450,
            "units": 150
        }, {
            "country": "The Netherlands",
            "litres": 150,
            "units": 342
        }];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.title.text = "Countries";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Litres sold (M)";

        var series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "litres";
        series.dataFields.categoryX = "country";
        series.name = "Sales";
        series.columns.template.fill = am4core.color("#1de9b6");
        series.tooltipText = "{name}: [bold]{valueY}[/]";

        var series2 = chart.series.push(new am4charts.ColumnSeries3D());
        series2.dataFields.valueY = "units";
        series2.dataFields.categoryX = "country";
        series2.columns.template.fill = am4core.color("#04a9f5");
        series2.name = "Units";
        series2.tooltipText = "{name}: [bold]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
    });
    // [ XY-3D chart ] end
    // [ XY-break-1 chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("am-xy-8", am4charts.XYChart);

        chart.data = [{
                country: "USA",
                visits: 23725
            },
            {
                country: "China",
                visits: 22882
            },
            {
                country: "Japan",
                visits: 20809
            },
            {
                country: "Germany",
                visits: 1322
            },
            {
                country: "UK",
                visits: 1122
            },
            {
                country: "France",
                visits: 13114
            },
            {
                country: "India",
                visits: 22725
            },
            {
                country: "Spain",
                visits: 10711
            },
            {
                country: "Netherlands",
                visits: 665
            },
            {
                country: "Russia",
                visits: 580
            },
            {
                country: "South Korea",
                visits: 443
            },
            {
                country: "Canada",
                visits: 441
            }
        ];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "country";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 24000;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.minGridDistance = 30;
        // axis break
        var axisBreak = valueAxis.axisBreaks.create();
        axisBreak.startValue = 1500;
        axisBreak.endValue = 22900;
        axisBreak.breakSize = 0.005;
        axisBreak.defaultState.transitionDuration = 1000;

        // make break expand on hover
        var hoverState = axisBreak.states.create("hover");
        hoverState.properties.breakSize = 1;
        hoverState.properties.opacity = 0.1;
        hoverState.transitionDuration = 1500;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "visits";
        series.columns.template.tooltipText = "{valueY.value}";
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 0;

        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });
    });
    // [ XY-break-1 chart ] end
    // [ Line chart ] start
    $(function() {
        var chart = am4core.create("line-am-1", am4charts.XYChart);
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
    // [ Line chart ] End
    // [ Line chart 1 ] Start
    $(function() {
        // Create chart instance
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
    // [ Line chart 1 ] End
    // [ XY-Multi chart ] start
    $(function() {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("am-xy-12", am4charts.XYChart);
        var data = [];
        var price1 = 1000,
            price2 = 1200;
        var quantity = 30000;
        for (var i = 0; i < 360; i++) {
            price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
            data.push({
                date1: new Date(2018, 0, i),
                price1: price1
            });
        }
        for (var i = 0; i < 360; i++) {
            price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
            data.push({
                date2: new Date(2018, 0, i),
                price2: price2
            });
        }

        chart.data = data;

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.labels.template.fill = am4core.color("#FF4961");

        var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis2.renderer.grid.template.location = 0;
        dateAxis2.renderer.labels.template.fill = am4core.color("#ccc");

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.fill = am4core.color("#FF4961");

        valueAxis.renderer.minWidth = 60;

        var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.tooltip.disabled = true;
        valueAxis2.renderer.grid.template.strokeDasharray = "2,3";
        valueAxis2.renderer.labels.template.fill = am4core.color("#ccc");
        valueAxis2.renderer.minWidth = 60;

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

        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = "2017";
        series2.dataFields.dateX = "date2";
        series2.dataFields.valueY = "price2";
        series2.yAxis = valueAxis2;
        series2.xAxis = dateAxis2;
        series2.tooltipText = "{valueY.value}";
        series2.fill = am4core.color("#ccc");
        series2.stroke = am4core.color("#ccc");
        series2.strokeWidth = 3;
        series2.tensionY = 1;
        series2.tensionX = 0.8;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis2;

        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = chart.plotContainer;
        chart.legend.zIndex = 100;

        valueAxis2.renderer.grid.template.strokeOpacity = 0.06;
        dateAxis2.renderer.grid.template.strokeOpacity = 0.06;
        dateAxis.renderer.grid.template.strokeOpacity = 0.06;
        valueAxis.renderer.grid.template.strokeOpacity = 0.06;

        chart.events.on("datavalidated", function() {
            dateAxis.zoomToDates(
                new Date(2018, 1, 10),
                new Date(2018, 2, 15)
            );
            dateAxis2.zoomToDates(
                new Date(2018, 1, 10),
                new Date(2018, 2, 15)
            );
        });
    });
    // [ XY-Multi chart ] end
});
