var check;
function initialize () {
  check = true;
}
// google api - AIzaSyDRuqCbGZ1FivlBN9HIYn0qcsI07rXIh04
let map;
var marker;
function sendRequest () {
  if (check == true)
  { check=false;
   var xhr = new XMLHttpRequest();
   var find = document.getElementById("search").value;
   var words = find.split(' ');
   var max;
   xhr.open("GET", "proxy.php?term="+words[0]+"+"+words[1]+"&location=Arlington+Texas&limit=5");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
        var list=document.getElementById("list");
        var i=0;
        max =json.businesses;
        for(i=0;i<max.length;i++)
        {
            list.innerHTML =list.innerHTML+("<li>"+"<h3>"+json.businesses[i].name+"</h3><br>"+"<img src="+json.businesses[i].image_url+"/><br>"+"<a href="+json.businesses[i].url+">Link to Yelp</a><br>"+"<p> Rating -"+json.businesses[i].rating+"</p><br></li>");
        }
        mark(json.businesses);
       }
   };



var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDRuqCbGZ1FivlBN9HIYn0qcsI07rXIh04&callback=initMap';
script.async = true;


window.initMap = function() {

  map = new google.maps.Map(document.getElementById("map"), { center: { lat: 32.75, lng: -97.13 }, zoom: 16, });

};


document.head.appendChild(script);
 xhr.send(null);
}
else
  {
    check=true;
    document.getElementById("list").innerHTML="";
    marker.setMap(null);
    sendRequest();
  }
}
function mark(max){
  for(i=0;i<max.length;i++)
  {

    marker = new google.maps.Marker({position: { lat:max[i].coordinates.latitude , lng:max[i].coordinates.longitude }, map, title: max[i].name, label: i, });// myLatLng
    marker.setMap(map);
  }
}
