var treeData = {};
// var treeData =
//     	{
// 		"name" : "Top Level",
// 		"children" : [
// 		{
// 			"name" : "Level 2 A",
// 			"children" : [
// 				{"name" : "A1"},
// 				{"name" : "A2"}
// 			]
// 		},
// 		{	"name" : "Level 2 B",
// 			"children" : [
// 				{"name" : "B1"},
// 				{"name" : "B2"},
// 				{"name" : "B3"}
// 			]
// 		},
// 		{
// 			"name" : "Level 2 C",
// 			"children" : [{"name" : "C1"}]
// 		}
// 		]
//     	};

// var treeData2 =
//     	{
// 		"name" : "Top Level",
// 		"children" : [
// 		{
// 			"name" : "Level 2 A",
// 			"children" : [
// 				{"name" : "A1"},
// 				{"name" : "A2"}
// 			]
// 		},
// 		{	"name" : "Level 2 B",
// 			"children" : [
// 				{"name" : "B1"},
// 				{"name" : "B2"},
// 				{"name" : "B3"}
// 			]
// 		},
// 		{
// 			"name" : "Level 2 C",
// 			"children" : [{"name" : "C1"}]
// 		},
//             {
// 			"name" : "Level 2 D",
// 			"children" : []
// 		}
// 		]
//     	};

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
  //transform the nodes
    g.selectAll(".node").attr("transform", function(d) {
        return "translate(" + transform.applyX(d.x) + "," + transform.applyY(d.y) + ")";
  });
}

// append the svg to the html chart
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//make the node map object
var nodeMap = d3.tree().size([width,height]);

//links the data
var nodes = d3.hierarchy(treeData, function(d){
    return d.children;
});

//maps the nodes the the lay out
nodes = nodeMap(nodes);

//add the nodes
// adds each node as a group
var node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on("mouseover",function (d) {
            console.log(d);
    });

// adds the circle to the node
node.append("circle").attr("r", 10);


function update(newNode) {
    if(Object.keys(treeData).length === 0){
        treeData = newNode;
        nodes.data = newNode;
        nodes.children = [];
        nodes.id = newNode.url;
        //console.log(nodes);
    }
    else{
        //console.log(newNode);
        //console.log(search(nodes,newNode.root));
        var p = search(nodes,newNode.root);
        if(p){
            temp_node = d3.hierarchy(newNode, function(d){
                    return d.children;
            });

            temp_node.children = [];
            temp_node.id = newNode.url;
            //TODO: find level for spacing
            temp_node.x = 100;
            temp_node.y = 200;
            temp_node.parent = p;
            p.children.push(temp_node);

            node = g.selectAll(".node")
                .data(p.descendants())
                .enter().append("g")
                .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; })
                .on("mouseover",function (d) {
                        console.log(d);
                });

            node.append("circle").attr("r", 10);

        }
    }

}
//https://stackoverflow.com/questions/26317004/how-to-get-web-element-id-from-the-element-position-in-d3-js-force-graph
function search(root, id) {
  var found;
  function recurse(node) {
    if (node.id === id)
      found = node;
    !found && node.children && node.children.forEach(function(child) {
      recurse(child);
    });
  }
  recurse(root);
  return found;
}

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
    });
    //console.log(nodes)

    update({'root':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
            'url':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
            'status': "Keyword Found"
    });

    function addNode() {
        update({'root':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
            'url':"test",
            'status': "OK"
       });
    }

        setTimeout(addNode,1000);



});