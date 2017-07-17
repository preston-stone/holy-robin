
function getWikiData() {
  var wURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&titles=List_of_exclamations_by_Robin&prop=revisions&rvprop=content&rvsection=2&indexpageids&callback=?';
  
 $.getJSON(wURL ,function(data) {
    var hash = data;
     var pageid = data["query"]["pageids"][0];
     var content = data["query"]["pages"][pageid]["revisions"][0]["*"];
      getSaying(content);  
  });
}

function getSaying(content){
 //$("#reload-link").click(function(){$("#rSaying").text(getSaying()+'!');});
 var scontent = content.split("{{div col|3}}").pop().split("{{div col end}}").shift();
 var rSayings = scontent.split("*")
 var saying = rSayings[Math.floor(Math.random() * rSayings.length)].trim();
  $("#rSaying").html(saying+'!');
}

$(document).ready(function() {
  getWikiData();
  $("#reload-link").click(function(){getWikiData();});
})