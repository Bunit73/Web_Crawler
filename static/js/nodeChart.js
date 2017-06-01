var treeData = {'root':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
                'name':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
                'children': [],
                'status': "Keyword Found"
            };

var root = {};

//Set canvas specs
//Set canvas size
var margin = {top: 20, right: 100, bottom: 20, left: 80};
var height = 620 + margin.top + margin.bottom;
var width = 780 + margin.left + margin.right;
var duration = 750;
var i = 0;

var tree = d3.layout.tree()
    .size([width - 20, height - 20]);

var root = {},
    nodes = tree(root);
root.parent = root;
root.px = root.x;
root.py = root.y;
var diagonal = d3.svg.diagonal();
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(10,10)");
var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");
var duration = 750,
    timer = setInterval(update, duration);

function update() {
  if (nodes.length >= 10) return clearInterval(timer);
  // Add a new node to a random parent.
  var n = {id: nodes.length},
      p = nodes[Math.random() * nodes.length | 0];
  if (p.children) p.children.push(n); else p.children = [n];
  nodes.push(n);
  // Recompute the layout and data join.
  node = node.data(tree.nodes(root), function(d) { return d.id; });
  link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  // Add entering nodes in the parent’s old position.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("cx", function(d) { return d.parent.px; })
      .attr("cy", function(d) { return d.parent.py; });
  // Add entering links in the parent’s old position.
  link.enter().insert("path", ".node")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: d.source.px, y: d.source.py};
        return diagonal({source: o, target: o});
      });
  // Transition nodes and links to their new positions.
  var t = svg.transition()
      .duration(duration);
  t.selectAll(".link")
      .attr("d", diagonal);
  t.selectAll(".node")
      .attr("cx", function(d) { return d.px = d.x; })
      .attr("cy", function(d) { return d.py = d.y; });
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

    //update();
    //
    // function addNode() {
    //     update({'root':"http://web.engr.oregonstate.edu/~mjb/cs575e/",
    //         'url':"test",
    //         'status': "OK"
    //    });
    // }

        // setTimeout(addNode,1000);



});