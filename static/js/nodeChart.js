var treeData =
    	{
		"name" : "Top Level",
		"children" : [
		{
			"name" : "Level 2 A",
			"children" : [
				{"name" : "A1"},
				{"name" : "A2"}
			]
		},
		{	"name" : "Level 2 B",
			"children" : [
				{"name" : "B1"},
				{"name" : "B2"},
				{"name" : "B3"}
			]
		},
		{
			"name" : "Level 2 C",
			"children" : [{"name" : "C1"}]
		}
		]
    	};

//Set canvas specs
//Set canvas size
var margin = {top: 20, right: 100, bottom: 20, left: 80};
var height = 620 + margin.top + margin.bottom;
var width = 780 + margin.left + margin.right;
var duration = 750;

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
                .call(d3.zoom()
                .scaleExtent([1 / 2, 4])
                .on("zoom", zoomed))
    .style("background-color","#f7f7f9");

// https://bl.ocks.org/mbostock/2a39a768b1d4bc00a09650edef75ad39
function zoomed() {
  var transform = d3.event.transform;
  node.attr("transform", function(d) {
      //console.log(d.x);
    return "translate(" + transform.applyX(d.x) + "," + transform.applyY(d.y) + ")";
  });
}

// append the svg to the html chrt
var g = svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//make the tree map object
var treemap = d3.tree().size([width,height]);

//links the data
var nodes = d3.hierarchy(treeData, function(d){
    return d.children;
});

//maps the nodes the the lay out
nodes = treemap(nodes);

//add the nodes
// adds each node as a group
var node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

// adds the circle to the node
node.append("circle").attr("r", 10);

//Tab functions
function showChartArea() {

    $("#chart-area").show();
    $("#log-tab").removeClass("inactive-tab");
    $("#log-tab").addClass("active-tab");

    $("#node-tab").addClass("inactive-tab");
    $("#node-tab").removeClass("active-tab");
}

function hideChartArea() {
    $("#chart-area").hide();
    $("#log-tab").removeClass("inactive-tab");
    $("#log-tab").addClass("active-tab");

    $("#node-tab").addClass("inactive-tab");
    $("#node-tab").removeClass("active-tab");
}


$(document).ready(function () {
    $("#node-tab").on('click',function () {
        showChartArea();
        hideTextArea();
    })
});