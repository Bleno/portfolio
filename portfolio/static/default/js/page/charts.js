/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	// init dynamic bar charts
	$('.chars-dynamic-1').sparkline('html', {type: 'bar', barColor: $('.chars-dynamic-1').css('color'), barWidth: 8, height: 40, barSpacing: 3});
	$('.chars-dynamic-2').sparkline('html', {type: 'bar', barColor: $('.chars-dynamic-2').css('color'), barWidth: 8, height: 40, barSpacing: 3});
	$('.chars-dynamic-3').sparkline('html', {type: 'bar', barColor: $('.chars-dynamic-3').css('color'), barWidth: 8, height: 40, barSpacing: 3});
	
	/* char 1 */
	var sin = [], cos = [];
	for (var i = 0; i < 13; i += 0.4) {
		sin.push([i, Math.sin(i)]);
		cos.push([i, Math.cos(i)]);
	}
	
	if ($(".char").length > 0) {
		var plot = $.plot($(".char"),
			[{ data: sin, label: "sin(x)", color: '#ee7951'}, { data: cos, label: "cos(x)", color: '#6db6ee' } ], {
				series: {
					lines: { show: true },
					points: { show: true }
					},
				grid: { hoverable: true, clickable: true, borderWidth: 0 },
				yaxis: { min: -1.2, max: 1.2 }
			});
		
		$(".char").bind("plotclick", function (event, pos, item) {
			if (item) {
				plot.highlight(item.series, item.datapoint);
			}
		});
	}
	
	/* chart 2 */
	var data = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9], ["July", 9], ["August", 15], ["September", 14], ["October", 10] ];

	$.plot(".chart-2", [ data ], {
		series: {
			bars: {
				show: true,
				barWidth: 0.6,
				align: "center"
			}
		},
		grid: { hoverable: true, borderWidth: 0 },
		xaxis: {
			mode: "categories",
			tickLength: 0
		}
	});
	
	/* char 3 */
	var d1_1 = [
        [1325376000000, 120],
        [1328054400000, 70],
        [1330560000000, 100],
        [1333238400000, 60],
        [1335830400000, 35]
    ];
 
    var d1_2 = [
        [1325376000000, 80],
        [1328054400000, 60],
        [1330560000000, 30],
        [1333238400000, 35],
        [1335830400000, 30]
    ];
 
    var d1_3 = [
        [1325376000000, 80],
        [1328054400000, 40],
        [1330560000000, 30],
        [1333238400000, 20],
        [1335830400000, 10]
    ];
 
    var d1_4 = [
        [1325376000000, 15],
        [1328054400000, 10],
        [1330560000000, 15],
        [1333238400000, 20],
        [1335830400000, 15]
    ];
 
    var data1 = [
        {
            label: "Product 1",
            data: d1_1,
            bars: {
                show: true,
                barWidth: 12*24*60*60*300,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor:  "#AA4643"
            },
            color: "#AA4643"
        },
        {
            label: "Product 2",
            data: d1_2,
            bars: {
                show: true,
                barWidth: 12*24*60*60*300,
                fill: true,
                lineWidth: 1,
                order: 2,
                fillColor:  "#89A54E"
            },
            color: "#89A54E"
        },
        {
            label: "Product 3",
            data: d1_3,
            bars: {
                show: true,
                barWidth: 12*24*60*60*300,
                fill: true,
                lineWidth: 1,
                order: 3,
                fillColor:  "#4572A7"
            },
            color: "#4572A7"
        },
        {
            label: "Product 4",
            data: d1_4,
            bars: {
                    show: true,
                barWidth: 12*24*60*60*300,
                fill: true,
                lineWidth: 1,
                order: 4,
                fillColor:  "#80699B"
            },
            color: "#80699B"
        }
    ];
 
    $.plot($(".chart-3"), data1, {
        xaxis: {
            min: (new Date(2011, 11, 15)).getTime(),
            max: (new Date(2012, 4, 18)).getTime(),
            mode: "time",
            timeformat: "%b",
            tickSize: [1, "month"],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            tickLength: 0, // hide gridlines
            axisLabel: 'Month',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 5
        },
        yaxis: {
            axisLabel: 'Value',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 5
        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            labelBoxBorderColor: "none",
            position: "right"
        },
        series: {
            shadowSize: 1
        }
    });
	
	/* chart 4 */
	sin = [], cos = [];
    for (i = 0; i < 14; i += 0.1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }
	
	var plotScore;
	
	plotScore = $.plot($(".chart-4"),
	[ { data: sin, label: "sin(x) = -0.00"},
	{ data: cos, label: "cos(x) = -0.00" } ], {
	series: {
		lines: { show: true }
	},
	crosshair: { mode: "x" },
	grid: { hoverable: true, autoHighlight: false, 
            clickable: false,
            borderWidth: 0 },
	yaxis: { min: -1.2, max: 1.2 }
	});
	
    var legends = $(".chart-4 .legendLabel");
    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width());
    });

    var updateLegendTimeout = null;
    var latestPosition = null;
    
    function updateLegend() {
        updateLegendTimeout = null;
        
        var pos = latestPosition;
        
        var axes = plotScore.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
            return;
		}
        var i, j, dataset = plotScore.getData();
        for (i = 0; i < dataset.length; ++i) {
            var series = dataset[i];

            // find the nearest points, x-wise
            for (j = 0; j < series.data.length; ++j) {
				if (series.data[j][0] > pos.x) {
					break;
				}
			}
            // now interpolate
            var y, p1 = series.data[j - 1], p2 = series.data[j];
            if (p1 === null) {
                y = p2[1];
			}
            else if (p2 === null) {
                y = p1[1];
			}
            else {
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
			}
            legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
        }
    }
    
    $(".chart-4").bind("plothover",  function (event, pos) {
        latestPosition = pos;
        if (!updateLegendTimeout) {
            updateLegendTimeout = setTimeout(updateLegend, 50);
		}
    });

});