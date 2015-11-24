var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.category10;

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("fill","grey")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style('background', 'grey');




d3.json("stacked1.json",function(err,data){
  if(err){
    return console.log(err);
  }
  else{
    data.forEach(function(d){
      d.total = parseFloat(d.Andhra) + parseFloat(d.karnataka) + parseFloat(d.Kerala)+ parseFloat(d.Tamil);
    });
    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);
    console.log(data);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Rice Production");




          svg.selectAll('rect').data(data)
            .enter().append('rect')
            .style("fill",function(d,i){
              return color(0);
            })
            .attr('width', x.rangeBand())
            .attr('x', function (d) {
                return x(d["Andhra"]);
                console.log(x(d["Andhra"]));
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

        svg.transition()
            .attr('height', function (data) {
                return x(data);
            })
            .attr('y', function (data) {
                return height - x(data);
            })
            .delay(function (data, i) {
                return i * 150;
            })
            .duration(2000)
            .ease('elastic')


  }
})
