let density_var = 0;
let eign_var = 0;
let betweenness_var = 0;
let closeness_var = 0;

let flag_community_size =1
let flag_community_degree =0
let flag_community_density=0
let flag_community_connections=0

//community ranking
function Community_ranking_size(){
  let height = 1200
  let width =1200
  let prepare_data = []
  unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  console.log("updated_version_degree")
  unique_communities.forEach(function(entry) {
    community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    prepare_data.push.apply(prepare_data,community_data)
  })
  console.log(prepare_data)

  flag_community_size =1
  flag_community_degree =0
  flag_community_density=0
  flag_community_connections=0
 
  community_size_data.sort(function(a,b){return d3.descending(a.size,b.size)})

//sort all other community files based on degree
let new_heighest_degree_data=[]
let new_connection_data =[]
let new_density_data =[]

community_size_data.forEach(function(d){
  //console.log(d.community)
  heighest_degree_data .forEach(function(degree_d){
    if (degree_d.community == d.community)
    new_heighest_degree_data.push(degree_d)})
  
  number_of_community_connections_data.forEach(function(connect_d){
    if (connect_d.community == d.community)
    new_connection_data.push(connect_d)})

  heighest_density_data.forEach(function(density_d){
    if (density_d.community == d.community)
    new_density_data.push(density_d)})   
})

heighest_degree_data= new_heighest_degree_data
number_of_community_connections_data = new_connection_data
heighest_density_data = new_density_data

console.log(community_size_data)
console.log(heighest_density_data )
console.log(heighest_degree_data )
console.log(number_of_community_connections_data)




  
  //calculate final x and y position for each point
  //computing_spiral_positions(center_positions_spiral, data, optimal_no_of_nodes, height, width)
  //prepare_data = computing_spiral_positions(center_positions_spiral, prepare_data, height, width)
  prepare_data = computing_spiral_positions(community_size_data, prepare_data,optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data


  d3.select("#chart").selectAll("svg").remove()


  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#community_ranking_tooltip").html("<b>Community Ranking:</b> Size ")

}
//
function Community_ranking_degree(){
  flag_community_size =0
  flag_community_degree =1
  flag_community_density=0
  flag_community_connections=0

  let height = 1200
  let width =1200

  // Pre-sort nodes within each community (same pattern as Community_ranking_size)
  let prepare_data = []
  let unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  unique_communities.forEach(function(entry) {
    let community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    prepare_data.push.apply(prepare_data,community_data)
  })

  heighest_degree_data.sort(function(a,b){return d3.descending(a.degree,b.degree)})
  console.log(heighest_degree_data)

  //sort all other community files based on degree
  let new_size_data=[]
  let new_connection_data =[]
  let new_density_data =[]

  heighest_degree_data.forEach(function(d){
    community_size_data.forEach(function(size_d){
      if (size_d.community == d.community)
        new_size_data.push(size_d)})
    number_of_community_connections_data.forEach(function(connect_d){
      if (connect_d.community == d.community)
        new_connection_data.push(connect_d)})
    heighest_density_data.forEach(function(density_d){
      if (density_d.community == d.community)
        new_density_data.push(density_d)})
  })

  community_size_data= new_size_data
  number_of_community_connections_data = new_connection_data
  heighest_density_data = new_density_data

  //calculate final x and y position for each point
  prepare_data = computing_spiral_positions(heighest_degree_data, prepare_data, optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data

  d3.select("#chart").selectAll("svg").remove()

  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#community_ranking_tooltip").html("<b>Community Ranking:</b> Heighest Degree ")
}
function Community_ranking_density(){
  flag_community_size =0
  flag_community_degree =0
  flag_community_density=1
  flag_community_connections=0

  let height = 1200
  let width =1200

  // Pre-sort nodes within each community (same pattern as Community_ranking_size)
  let prepare_data = []
  let unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  unique_communities.forEach(function(entry) {
    let community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    prepare_data.push.apply(prepare_data,community_data)
  })

  heighest_density_data.sort(function(a,b){return d3.descending(a.density,b.density)})
  console.log(heighest_density_data)

  //sort all other community files based on edge-density
  let new_size_data=[]
  let new_connection_data =[]
  let new_heighest_degree_data = []

  heighest_density_data.forEach(function(d){
    community_size_data.forEach(function(size_d){
      if (size_d.community == d.community)
        new_size_data.push(size_d)})
    number_of_community_connections_data.forEach(function(connect_d){
      if (connect_d.community == d.community)
        new_connection_data.push(connect_d)})
    heighest_degree_data.forEach(function(degree_d){
      if (degree_d.community == d.community)
        new_heighest_degree_data.push(degree_d)})
  })

  community_size_data= new_size_data
  number_of_community_connections_data = new_connection_data
  heighest_degree_data = new_heighest_degree_data

  //calculate final x and y position for each point
  prepare_data = computing_spiral_positions(heighest_density_data, prepare_data, optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data

  d3.select("#chart").selectAll("svg").remove()

  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#community_ranking_tooltip").html("<b>Community Ranking:</b> Edge-Density ")
}
function Community_ranking_connection(){
  flag_community_size =0
  flag_community_degree =0
  flag_community_density=0
  flag_community_connections=1

  let height = 1200
  let width =1200

  // Pre-sort nodes within each community (same pattern as Community_ranking_size)
  let prepare_data = []
  let unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  unique_communities.forEach(function(entry) {
    let community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    prepare_data.push.apply(prepare_data,community_data)
  })

  number_of_community_connections_data.sort(function(a,b){return d3.descending(a.connections,b.connections)})
  console.log(number_of_community_connections_data)

  //sort all other community files based on community connections
  let new_size_data=[]
  let new_density_data =[]
  let new_heighest_degree_data = []

  number_of_community_connections_data.forEach(function(d){
    community_size_data.forEach(function(size_d){
      if (size_d.community == d.community)
        new_size_data.push(size_d)})
    heighest_density_data.forEach(function(density_d){
      if (density_d.community == d.community)
        new_density_data.push(density_d)})
    heighest_degree_data.forEach(function(degree_d){
      if (degree_d.community == d.community)
        new_heighest_degree_data.push(degree_d)})
  })

  community_size_data= new_size_data
  heighest_density_data = new_density_data
  heighest_degree_data = new_heighest_degree_data

  //calculate final x and y position for each point
  prepare_data = computing_spiral_positions(number_of_community_connections_data, prepare_data, optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data

  d3.select("#chart").selectAll("svg").remove()

  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#community_ranking_tooltip").html("<b>Community Ranking:</b> Community Connections ")
}




//most connected node identification
//degree range_bar
function MostConnectedNodes(val) {
  //first set the flag
  flag_most_connected_nodes = 1
  document.getElementById('textInputConnecteddeg').value=val;
  //node data that are most connected
  most_connected_nodes_data = global_data_unchanged.filter(function(d){
        return d.centrality>=val
        })
  //most connected communities
  var list_of_communities = most_connected_nodes_data.map(function(d){return d.community})
  console.log([... new Set(list_of_communities)])
  var list_of_most_connected_communities = [... new Set(list_of_communities)]
  //filter the community data since you also want to show those communities
  var most_connected_community_data = global_data_unchanged.filter(function(d){
    if(list_of_most_connected_communities.includes(d.community))
      return d
  })
  console.log(most_connected_community_data)
  global_data = most_connected_community_data



  console.log(most_connected_nodes_data)
  var list_of_most_connected_nodes = most_connected_nodes_data.map(function(d){return d.node})
  console.log(list_of_most_connected_nodes)




 // g.call(brush.move, null);
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()

  d3.selectAll("circle")
.attr("opacity", function(d){
    if(list_of_most_connected_nodes.includes(d.node) ) return 1
    else return .05} )

}

//ranking button
//ranking based on degree
function degree_ranking(){
  let height = 1200
  let width =1200
  let prepare_data = []
  unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  console.log("updated_version_degree")
  unique_communities.forEach(function(entry) {
    community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    prepare_data.push.apply(prepare_data,community_data)
  })
  console.log(prepare_data)

  let positions_spiral
  if (flag_community_size ==1)
    positions_spiral = community_size_data
  else if (flag_community_degree ==1)
    positions_spiral = heighest_degree_data
  else if (flag_community_density==1)
    positions_spiral = heighest_density_data
  //else if (flag_community_connections==1)
    //positions_spiral = community_connection_data

  //calculate final x and y position for each point
  //computing_spiral_positions(center_positions_spiral, data, optimal_no_of_nodes, height, width)
  //prepare_data = computing_spiral_positions(center_positions_spiral, prepare_data, height, width)
  prepare_data = computing_spiral_positions(positions_spiral, prepare_data,optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data


  d3.select("#chart").select("svg").remove()


  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#ranking_tooltip").html("<b>Ranking:</b> Degree ")

}

// ranking based on closeness
function closeness_ranking(){
  let height = 1200
  let width =1200
  let prepare_data = []
  unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  console.log("updated_version_closeness")
  unique_communities.forEach(function(entry) {
    community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.closeness,b.closeness)})
    prepare_data.push.apply(prepare_data,community_data)
  })
  console.log(prepare_data)

  let positions_spiral
  if (flag_community_size ==1)
    positions_spiral = community_size_data
  else if (flag_community_degree ==1)
    positions_spiral = heighest_degree_data
  else if (flag_community_density==1)
    positions_spiral = heighest_density_data

  //calculate final x and y position for each point
  //prepare_data = computing_spiral_positions(center_positions_spiral, prepare_data, height, width)
  prepare_data = computing_spiral_positions(positions_spiral, prepare_data,optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data


  d3.select("#chart").select("svg").remove()


  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#ranking_tooltip").html("<b>Ranking:</b> Closeness ")

}

//ranking based on eign centrality
function eign_ranking(){
  let height = 1200
  let width =1200
  let prepare_data = []
  unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  console.log("updated_version_eign")
  unique_communities.forEach(function(entry) {
    community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.eign,b.eign)})
    prepare_data.push.apply(prepare_data,community_data)
  })
  console.log(prepare_data)

  let positions_spiral
  if (flag_community_size ==1)
    positions_spiral = community_size_data
  else if (flag_community_degree ==1)
    positions_spiral = heighest_degree_data
  else if (flag_community_density==1)
    positions_spiral = heighest_density_data

  //calculate final x and y position for each point
  //prepare_data = computing_spiral_positions(center_positions_spiral, prepare_data, height, width)
  prepare_data = computing_spiral_positions(positions_spiral, prepare_data,optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data


  d3.select("#chart").select("svg").remove()


  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#ranking_tooltip").html("<b>Ranking:</b> Eigen Centrality ")

}

//ranking based on betweenness centrality
function between_ranking(){
  let height = 1200
  let width =1200
  let prepare_data = []
  unique_communities = new Set(global_data_unchanged.map(function(d){return d.community}))
  console.log("updated_version_betweenness")
  unique_communities.forEach(function(entry) {
    community_data = global_data_unchanged.filter(function(d){ return d.community == entry});
    community_data.sort(function(a,b){return d3.descending(a.betwness,b.betwness)})
    prepare_data.push.apply(prepare_data,community_data)
  })
  console.log(prepare_data)

  let positions_spiral
  if (flag_community_size ==1)
    positions_spiral = community_size_data
  else if (flag_community_degree ==1)
    positions_spiral = heighest_degree_data
  else if (flag_community_density==1)
    positions_spiral = heighest_density_data

  //calculate final x and y position for each point
  //prepare_data = computing_spiral_positions(center_positions_spiral, prepare_data, height, width)
  prepare_data = computing_spiral_positions(positions_spiral, prepare_data,optimal_no_of_nodes, height, width)
  global_data = prepare_data
  global_data_unchanged = prepare_data


  d3.select("#chart").select("svg").remove()


  //assign height and width of svg
  let svg = d3.select("#chart")
  initializeSpiralChart(svg, height, width)
  draw_spiral_community()
  d3.select("#ranking_tooltip").html("<b>Ranking:</b> Betweenness ")

}

//radius range bar
function updateTextInputRadius(val) {
  console.log(val)
  console.log(global_data)
  document.getElementById('textInputradius').value=val;
  global_radius = val
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  //show only selected community in table
  table.selectAll("tr").remove()
  show_table_data(global_data)
}

//degree range_bar
function updateTextInputdeg(val) {
    document.getElementById('textInputdeg').value=val;
    density_var = val;
    console.log(val)
    global_data = global_data_unchanged.filter(function(d){
          return d.centrality>=density_var && d.betwness>=betweenness_var && d.eign>=eign_var && d.closeness>=closeness_var
          })
    console.log(global_data)
   // g.call(brush.move, null);
    g.select(".brush").call(brush.move, null);
    draw_spiral_community()
    //show only selected community in table
    table.selectAll("tr").remove()
    show_table_data(global_data)
  }


  //betweenness range_bar
  function updateTextInputbet(val) {
    document.getElementById('textInputbet').value=val;
    betweenness_var = val
    global_data = global_data_unchanged.filter(function(d){
        return d.centrality>=density_var && d.betwness>=betweenness_var && d.eign>=eign_var && d.closeness>=closeness_var
        })
  console.log(global_data)
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  //show only selected community in table
  table.selectAll("tr").remove()
  show_table_data(global_data)
  }


  //eign range_bar
  function updateTextInputeig(val) {
    document.getElementById('textInputeig').value=val;
    eign_var = val ;
    global_data = global_data_unchanged.filter(function(d){
        return d.centrality>=density_var && d.betwness>=betweenness_var && d.eign>=eign_var && d.closeness>=closeness_var
        })
  console.log(global_data)
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  //show only selected community in table
  table.selectAll("tr").remove()
  show_table_data(global_data)
  }
//closeness range_bar
  function updateTextInputclo(val) {
    document.getElementById('textInputclo').value=val;
    closeness_var =val
    global_data = global_data_unchanged.filter(function(d){
        return d.centrality>=density_var && d.betwness>=betweenness_var && d.eign>=eign_var && d.closeness>=closeness_var
        })
  console.log(global_data)
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  //show only selected community in table
  table.selectAll("tr").remove()
  show_table_data(global_data)
  }

//colorcoding
function colorNodesByDensity(){
   densityColFlag = 1
   degreeColFlag = 0
   closenessColFlag = 0
   betweennessColFlag = 0
   eignColFlag = 0
   g.select(".brush").call(brush.move, null);
   draw_spiral_community()
   d3.select("#color_tooltip").html("<b>Color-Coding:</b> Density ")
}

function colorNodesByDegree(){
  densityColFlag = 0
  degreeColFlag = 1
  closenessColFlag = 0
  betweennessColFlag = 0
  eignColFlag = 0
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  d3.select("#color_tooltip").html("<b>Color-Coding:</b> Degree ")
}

function colorNodesByCloseness(){
  densityColFlag = 0
  degreeColFlag = 0
  closenessColFlag = 1
  betweennessColFlag = 0
  eignColFlag = 0
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  d3.select("#color_tooltip").html("<b>Color-Coding:</b> Closeness ")
}

function colorNodesByBetweeness(){
  densityColFlag = 0
  degreeColFlag = 0
  closenessColFlag = 0
  betweennessColFlag = 1
  eignColFlag = 0
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  d3.select("#color_tooltip").html("<b>Color-Coding:</b> Betweenness ")
}

function colorNodesByEign(){
  densityColFlag = 0
  degreeColFlag = 0
  closenessColFlag = 0
  betweennessColFlag = 0
  eignColFlag = 1
  g.select(".brush").call(brush.move, null);
  draw_spiral_community()
  d3.select("#color_tooltip").html("<b>Color-Coding:</b> Eigen Centrality ")

}


  function find_node_by_label(){

    var node_community;
    var node_density,
    node_centrality,
    node_betweness,
    node_closeness,
    node_eign;

    find_node_id = document.getElementById('textInputNodeId').value
    g.select(".brush").call(brush.move, null);
    draw_spiral_community()



    //search data to find the node and then community and denstity of searched node
    for(i=0; i<global_data_unchanged.length; i++)
    {
      if (global_data_unchanged[i].node == find_node_id)
      {
        node_community = global_data_unchanged[i].community
        node_density = global_data_unchanged[i].density
        node_centrality = global_data_unchanged[i].centrality
        node_betweness = global_data_unchanged[i].betwness
        node_closeness = global_data_unchanged[i].closeness
        node_eign = global_data_unchanged[i].eign
        break;
      }
    }
    //highlighting the node and commun ijty in seperate window
    var node_community_data = global_data_unchanged.filter(function(client){return client.community==node_community})
    node_community_data.sort(function(a,b){return d3.descending(a.centrality,b.centrality)})
    find_node_draw_spiral(node_community_data)
    //node textbox
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 250 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

      d3.select("#community_histogram").select("svg").remove()
    d3.select("#node_textbox").select("svg").remove()
    d3.select("#community_piechart").html("")

  // append the svg object to the body of the page
    var csFieldClass = nodeFeatureLookup.hasOwnProperty(+find_node_id) ? nodeFeatureLookup[+find_node_id] : -1;
    var csFieldName = CS_FIELD_NAMES.hasOwnProperty(csFieldClass) ? CS_FIELD_NAMES[csFieldClass] : "Unknown";
    var svg = d3.select("#node_textbox")
      .html("<br/><b>NODE DATA</b><br/><b>Community: </b>"+ node_community +"<br/>" + 
      "<b>CS Field:</b> "+ csFieldName + "<br/>" +
      "<b>Degree:</b> "+ node_centrality + "<br/>" +
       "<b>Betweeness:</b> " + node_betweness + "<br/>" +
       "<b>Closeness:</b> " + node_closeness + "<br/>" +
       "<b>Eign:</b> " + node_eign )
       .style("font-size", "12px")
    //highlight the node in table also
    //introduce the reset button to reset the entire visualization again

    //highlight the searched node in table
      table.selectAll("tr").remove()
      show_table_data(global_data)

  }


//show and hide edges button
  function edge_visualization(){
    let opa =d3.selectAll(".spiral_edges").style("stroke-opacity")
    //console.log(active_community)
    if (opa ==1){
      d3.selectAll(".spiral_edges")
      .style("stroke-opacity", 0)
    }else{
      d3.selectAll(".spiral_edges")
      .style("stroke-opacity", 1)

    }
  }



  //show and hide edges button
  function reset_button(){
    //reset find node functionality
    find_node_id = -1
    document.getElementById('textInputNodeId').value = -1

    //most connected node functionality reset
    flag_most_connected_nodes = 0
    document.getElementById('textInputConnecteddeg').value= 0
    document.getElementById('MostConnected').value= 0

    // reseting filtering values
    //degree
    document.getElementById('textInputdeg').value= 0
    document.getElementById('Degree').value= 0
    //closeness
    document.getElementById('textInputclo').value= 0
    document.getElementById('Closeness').value= 0
    //eign
    document.getElementById('textInputeig').value= 0
    document.getElementById('Eign').value= 0
    //between
    document.getElementById('textInputbet').value= 0
    document.getElementById('Betweenness').value= 0

    //reset community filter
    document.getElementById('textInputCommunityFilter').value = ''

    //reset community range filter
    if (document.getElementById('commRangeMinSize')) {
      document.getElementById('commRangeMinSize').value = '';
      document.getElementById('commRangeMaxSize').value = '';
      document.getElementById('commRangeMinDensity').value = '';
      document.getElementById('commRangeMaxDensity').value = '';
      document.getElementById('commRangeMinDegree').value = '';
      document.getElementById('commRangeMaxDegree').value = '';
      document.getElementById('commRangeMinConn').value = '';
      document.getElementById('commRangeMaxConn').value = '';
    }

    //clearing the highlight window
    d3.select("#node_textbox").html("")
    d3.select("#community_textbox").html("")
    d3.select("#community_histogram").select("svg").remove()
    d3.select("#community_piechart").html("")
    d3.select("#community_spiral").select("svg").remove()


    global_data = global_data_unchanged
    g.select(".brush").call(brush.move, null);
    draw_spiral_community()
    //show only selected community in table
    table.selectAll("tr").remove()
    show_table_data(global_data)

  }

  // Community filter: show only selected communities
  function applyCommunityFilter() {
    var filterInput = document.getElementById('textInputCommunityFilter').value.trim();
    if (!filterInput) return;

    // Parse comma-separated community IDs
    var selectedCommunities = filterInput.split(',').map(function(s) { return +s.trim(); }).filter(function(n) { return !isNaN(n); });
    if (selectedCommunities.length === 0) return;

    console.log("Filtering to communities:", selectedCommunities);

    let height = 1200;
    let width = 1200;

    // Filter node data to only include selected communities
    var filteredData = global_data_unchanged.filter(function(d) {
      return selectedCommunities.includes(d.community);
    });

    if (filteredData.length === 0) {
      alert("No nodes found in the specified communities.");
      return;
    }

    // Filter community ranking data to only include selected communities
    var filtered_community_size = community_size_data.filter(function(d) {
      return selectedCommunities.includes(d.community);
    });

    // Sort by current ranking
    let positions_spiral;
    if (flag_community_size == 1)
      positions_spiral = filtered_community_size;
    else if (flag_community_degree == 1) {
      positions_spiral = heighest_degree_data.filter(function(d) {
        return selectedCommunities.includes(d.community);
      });
    } else if (flag_community_density == 1) {
      positions_spiral = heighest_density_data.filter(function(d) {
        return selectedCommunities.includes(d.community);
      });
    } else if (flag_community_connections == 1) {
      positions_spiral = number_of_community_connections_data.filter(function(d) {
        return selectedCommunities.includes(d.community);
      });
    } else {
      positions_spiral = filtered_community_size;
    }

    // Sort nodes within each community by degree
    let prepare_data = [];
    selectedCommunities.forEach(function(comm) {
      var comm_data = filteredData.filter(function(d) { return d.community == comm; });
      comm_data.sort(function(a, b) { return d3.descending(a.centrality, b.centrality); });
      prepare_data.push.apply(prepare_data, comm_data);
    });

    // Recompute positions
    prepare_data = computing_spiral_positions(positions_spiral, prepare_data, optimal_no_of_nodes, height, width);
    global_data = prepare_data;

    d3.select("#chart").selectAll("svg").remove();

    let svg = d3.select("#chart");
    initializeSpiralChart(svg, height, width);
    draw_spiral_community();

    // Update table
    table.selectAll("tr").remove();
    show_table_data(global_data);
  }

  // Reset community filter
  function resetCommunityFilter() {
    document.getElementById('textInputCommunityFilter').value = '';
    global_data = global_data_unchanged;
    
    let height = 1200;
    let width = 1200;

    let positions_spiral;
    if (flag_community_size == 1)
      positions_spiral = community_size_data;
    else if (flag_community_degree == 1)
      positions_spiral = heighest_degree_data;
    else if (flag_community_density == 1)
      positions_spiral = heighest_density_data;
    else if (flag_community_connections == 1)
      positions_spiral = number_of_community_connections_data;
    else
      positions_spiral = community_size_data;

    let prepare_data = [];
    let unique_communities = new Set(global_data_unchanged.map(function(d) { return d.community; }));
    unique_communities.forEach(function(entry) {
      var comm_data = global_data_unchanged.filter(function(d) { return d.community == entry; });
      comm_data.sort(function(a, b) { return d3.descending(a.centrality, b.centrality); });
      prepare_data.push.apply(prepare_data, comm_data);
    });

    prepare_data = computing_spiral_positions(positions_spiral, prepare_data, optimal_no_of_nodes, height, width);
    global_data = prepare_data;

    d3.select("#chart").selectAll("svg").remove();
    let svg = d3.select("#chart");
    initializeSpiralChart(svg, height, width);
    draw_spiral_community();

    table.selectAll("tr").remove();
    show_table_data(global_data);
  }


// ============================================================
// Community Range Filter
// Show only communities whose size, density, max-degree, and
// connections fall within the ranges set by the user.
// ============================================================

function applyCommunityRangeFilter() {
  var minSize = parseFloat(document.getElementById('commRangeMinSize').value) || 0;
  var maxSize = parseFloat(document.getElementById('commRangeMaxSize').value) || Infinity;
  var minDensity = parseFloat(document.getElementById('commRangeMinDensity').value) || 0;
  var maxDensity = parseFloat(document.getElementById('commRangeMaxDensity').value) || Infinity;
  var minDegree = parseFloat(document.getElementById('commRangeMinDegree').value) || 0;
  var maxDegree = parseFloat(document.getElementById('commRangeMaxDegree').value) || Infinity;
  var minConn = parseFloat(document.getElementById('commRangeMinConn').value) || 0;
  var maxConn = parseFloat(document.getElementById('commRangeMaxConn').value) || Infinity;

  // Build lookup maps for fast access
  var sizeMap = {};
  community_size_data.forEach(function(d) { sizeMap[d.community] = d.size; });
  var densityMap = {};
  heighest_density_data.forEach(function(d) { densityMap[d.community] = d.density; });
  var degreeMap = {};
  heighest_degree_data.forEach(function(d) { degreeMap[d.community] = d.degree; });
  var connMap = {};
  number_of_community_connections_data.forEach(function(d) { connMap[d.community] = d.connections; });

  // Find communities that pass all filters
  var passingCommunities = [];
  community_size_data.forEach(function(d) {
    var comm = d.community;
    var s = sizeMap[comm] !== undefined ? sizeMap[comm] : 0;
    var den = densityMap[comm] !== undefined ? densityMap[comm] : 0;
    var deg = degreeMap[comm] !== undefined ? degreeMap[comm] : 0;
    var con = connMap[comm] !== undefined ? connMap[comm] : 0;

    if (s >= minSize && s <= maxSize &&
        den >= minDensity && den <= maxDensity &&
        deg >= minDegree && deg <= maxDegree &&
        con >= minConn && con <= maxConn) {
      passingCommunities.push(comm);
    }
  });

  if (passingCommunities.length === 0) {
    alert("No communities match the specified ranges.");
    return;
  }

  console.log("Community range filter — passing communities:", passingCommunities);

  let height = 1200;
  let width = 1200;

  // Filter node data to only include passing communities
  var filteredData = global_data_unchanged.filter(function(d) {
    return passingCommunities.includes(d.community);
  });

  // Filter community ranking arrays
  var filtered_size = community_size_data.filter(function(d) {
    return passingCommunities.includes(d.community);
  });

  // Select the right ordering based on current ranking flag
  var positions_spiral;
  if (flag_community_size == 1)
    positions_spiral = filtered_size;
  else if (flag_community_degree == 1)
    positions_spiral = heighest_degree_data.filter(function(d) { return passingCommunities.includes(d.community); });
  else if (flag_community_density == 1)
    positions_spiral = heighest_density_data.filter(function(d) { return passingCommunities.includes(d.community); });
  else if (flag_community_connections == 1)
    positions_spiral = number_of_community_connections_data.filter(function(d) { return passingCommunities.includes(d.community); });
  else
    positions_spiral = filtered_size;

  // Sort nodes within each community by degree
  var prepare_data = [];
  passingCommunities.forEach(function(comm) {
    var comm_data = filteredData.filter(function(d) { return d.community == comm; });
    comm_data.sort(function(a, b) { return d3.descending(a.centrality, b.centrality); });
    prepare_data.push.apply(prepare_data, comm_data);
  });

  // Recompute positions
  prepare_data = computing_spiral_positions(positions_spiral, prepare_data, optimal_no_of_nodes, height, width);
  global_data = prepare_data;

  d3.select("#chart").selectAll("svg").remove();
  var svg = d3.select("#chart");
  initializeSpiralChart(svg, height, width);
  draw_spiral_community();

  table.selectAll("tr").remove();
  show_table_data(global_data);
}

function resetCommunityRangeFilter() {
  document.getElementById('commRangeMinSize').value = '';
  document.getElementById('commRangeMaxSize').value = '';
  document.getElementById('commRangeMinDensity').value = '';
  document.getElementById('commRangeMaxDensity').value = '';
  document.getElementById('commRangeMinDegree').value = '';
  document.getElementById('commRangeMaxDegree').value = '';
  document.getElementById('commRangeMinConn').value = '';
  document.getElementById('commRangeMaxConn').value = '';

  global_data = global_data_unchanged;

  let height = 1200;
  let width = 1200;

  var positions_spiral;
  if (flag_community_size == 1)
    positions_spiral = community_size_data;
  else if (flag_community_degree == 1)
    positions_spiral = heighest_degree_data;
  else if (flag_community_density == 1)
    positions_spiral = heighest_density_data;
  else if (flag_community_connections == 1)
    positions_spiral = number_of_community_connections_data;
  else
    positions_spiral = community_size_data;

  var prepare_data = [];
  var unique_communities = new Set(global_data_unchanged.map(function(d) { return d.community; }));
  unique_communities.forEach(function(entry) {
    var comm_data = global_data_unchanged.filter(function(d) { return d.community == entry; });
    comm_data.sort(function(a, b) { return d3.descending(a.centrality, b.centrality); });
    prepare_data.push.apply(prepare_data, comm_data);
  });

  prepare_data = computing_spiral_positions(positions_spiral, prepare_data, optimal_no_of_nodes, height, width);
  global_data = prepare_data;

  d3.select("#chart").selectAll("svg").remove();
  var svg = d3.select("#chart");
  initializeSpiralChart(svg, height, width);
  draw_spiral_community();

  table.selectAll("tr").remove();
  show_table_data(global_data);
}
