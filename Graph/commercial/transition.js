d3.json("commercial.json",function(objdata){
  var values=[],names=[];var chartdata=[];
  for(var key in objdata){
    if(objdata.hasOwnProperty(key))
    {
      chartdata.push(objdata[key]);
      names.push(key);
    }
  }


var margin = {top: 30, right: 10, bottom: 30, left: 30}

var height = 500 - margin.top - margin.bottom,
    width = 700 - margin.left - margin.right,
    barWidth = 30,
    barOffset = 100;

var dynamicColor;

var yScale = d3.scale.linear()
    .domain([0, d3.max(chartdata)])
    .range([0, height])

var xScale = d3.scale.ordinal()
    .domain(d3.range(0, names.length))
    .rangeBands([0, width],0.8)

var colors = d3.scale.linear()
    .domain([0, chartdata.length])
    .range(['steelblue','steelblue'])

var awesome = d3.select('#bar-chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom+50)
    .style('background', 'white')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .selectAll('rect').data(chartdata)
    .enter().append('rect')
    .style({
        'fill': function (data, i) {
            return colors(i);
        }
    })
    .attr('width', xScale.rangeBand())
    .attr('x', function (data, i) {
        return xScale(i);
    })
    .attr('height', 0)
    .attr('y', height)
    .on('mouseover', function (data) {
        dynamicColor = this.style.fill;
        d3.select(this)
            .style('fill', '#ccc')
    })

    .on('mouseout', function (data) {
        d3.select(this)
            .style('fill', dynamicColor)
    })

awesome.transition()
    .attr('height', function (data) {
        return yScale(data);
    })
    .attr('y', function (data) {
        return height - yScale(data);
    })
    .delay(function (data, i) {
        return i * 100;
    })
    .duration(200)
    .ease('elastic')

var verticalGuideScale = d3.scale.linear()
    .domain([0, d3.max(chartdata)])
    .range([height, 0])


var vAxis = d3.svg.axis()
    .scale(verticalGuideScale)
    .orient('left')
    .ticks(10)

var verticalGuide = d3.select('svg').append('g')
vAxis(verticalGuide)
verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
verticalGuide.selectAll('path')
    .style({fill: 'none', stroke: "#3c763d"})
verticalGuide.selectAll('line')
    .style({stroke: "#3c763d"})
    verticalGuide.append("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-90)" )
        .attr("y",5)
        .attr("x",-100)
        .attr("dy", ".71em")
        .text("Production")
  verticalGuide.append("text")
        .text("in mn")
        .attr("x",-3)
        .attr("y",2)
        .attr("dx","-.71em")

var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(function(d){
      return names[d];
    })

var horizontalGuide = d3.select('svg').append('g')
hAxis(horizontalGuide)
horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
horizontalGuide.selectAll('path')
    .style({fill: 'none', stroke: "#3c763d"})

horizontalGuide.selectAll('text')
    .style("text-anchor", "end")
    .attr("dx", "1.8em")
    .attr("dy", ".55em")
    .attr("transform", "rotate(-60)" )

horizontalGuide.selectAll('line')
    .style({stroke: "#3c763d"});
  });
