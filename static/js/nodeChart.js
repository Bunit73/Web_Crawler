// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Set canvas specs
//Set canvas size
var margin = {top: 40, right: 100, bottom: 20, left: 80};
var height = 600 + margin.top + margin.bottom;
var width = 960 + margin.left + margin.right;
var duration = 750;
var i = 0;


var tree = d3.layout.tree()
    .size([width - 20, height - 40]);

var root = {},
    nodes = tree(root);
root.parent = root;
root.px = root.x;
root.py = root.y;
var diagonal = d3.svg.diagonal();
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color","#f7f7f9")
    .append("g")
    .attr("transform", "translate(10,10)");
var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");
var duration = 750;
    //timer = setInterval(update, duration);

function setRootData(rootNode) {
    var p = nodes[0];
    p.url = rootNode.url;
    p.root = rootNode.root;
    p.children = rootNode.children;
    p.status = rootNode.status;
    p.title = rootNode.title;
    p.id = 0;
}

function update(newNode) {
  newNode.id = nodes.length;
  var n = newNode;
  var p = nodes[0];

  //console.log(nodes);

  if(p.hasOwnProperty('url')){
      for(var i = 0; i < nodes.length; i++){
        if(nodes[i].url === newNode.root){
            p = nodes[i];
            break;
        }
      }
  }

  if (p.children){
    p.children.push(n);
  }
  else{
    p.children = [n];
  }
  nodes.push(n);
  // Recompute the layout and data join.
  node = node.data(tree.nodes(root), function(d) { return d.id; });
  link = link.data(tree.links(nodes), function(d) { return d.source.id + "-" + d.target.id; });
  // Add entering nodes in the parent’s old position.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("r", 4)
      .attr("cx", function(d) { return d.parent.px; })
      .attr("cy", function(d) { return d.parent.py; })
      .on('mouseover',function (d) {
          console.log(d);
          div.transition()
                .duration(200)
                .style("opacity", .9);
          div.html('<b>Title:</b> ' + d.title)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      })
    .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
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

function clearChart() {
    d3.selectAll("svg").remove();
    root = {};
    nodes = tree(root);
    root.parent = root;
    root.px = root.x;
    root.py = root.y;
    diagonal = d3.svg.diagonal();
    svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color","#f7f7f9")
        .append("g")
        .attr("transform", "translate(10,10)");
    node = svg.selectAll(".node");
    link = svg.selectAll(".link");
    duration = 750;
}

$(document).ready(function () {
    $("#node-tab").on('click',function () {
        showChartArea();
        hideTextArea();
    });
});