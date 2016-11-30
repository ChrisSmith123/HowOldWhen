var id = '';
var bday = '';
var movie = '';
//function moveBar(){
document.getElementById("searchButton").onclick = function() {
	var searching = document.getElementById('searchBox');
  if (searching.classList.contains('search')) { 
    (searching.classList.add('found'));
    getStarID();
  } else {
  getStarID(); 
  }
  }
  
function getStarID() {
  var jsonHTTP = new XMLHttpRequest();
	var api = 'api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/search/person?';
	var url2 = '&query=';
	var callback = '&callback=person'
	var name = encodeURIComponent(document.getElementById("starName").value);
	var url = url1 + api + url2 + name;

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
      var id = data.results[0].id;
      var name = data.results[0].name;
      var pic = 'https://image.tmdb.org/t/p/w500/' + data.results[0].profile_path;  
      getStarBday(id, name, pic);
}
}
jsonHTTP.send();
}

function getStarBday(id,name,pic) {
  var jsonHTTP = new XMLHttpRequest();
	var api = '?api_key=8bd29dde4b31287cd5579e4bd90c80b3';
	var url1 = 'https://api.themoviedb.org/3/person/';
	var url2 = '&language=en-US';
	var url = url1 + id + api + url2

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
        var bday = data.birthday;
        var milliseconds = Math.abs(new Date() - new Date(bday.replace(/-/g,'/')));
        var age = Math.floor(milliseconds / 31536000000)
        var imageBox = document.createElement('IMG');
        imageBox.setAttribute('src', pic);
        imageBox.className = 'star';
  document.getElementById('starImage').appendChild(imageBox);
        var description = document.createElement("P");
    		var l1 = document.createTextNode(name + " is " + age + " years old.");
        description.className = "bio";
    		description.appendChild(l1);
    		document.getElementById('nameAge').appendChild(description);
        getMovieList(id,bday)
}
}
jsonHTTP.send();
} 

function getMovieList(id,bday) {
  var jsonHTTP = new XMLHttpRequest();
	var api = '/movie_credits?api_key=8bd29dde4b31287cd5579e4bd90c80b3&language=en-US';
	var url1 = 'https://api.themoviedb.org/3/person/';
	var url = url1 + id + api

jsonHTTP.open("GET", url, true);

jsonHTTP.onreadystatechange=function() {
   if (jsonHTTP.readyState==4 && jsonHTTP.status==200) {
   		var data = JSON.parse(jsonHTTP.responseText);
        var movieArray = data;
            for (var i = 0; i < movieArray.cast.length; i++) { 
            var movie = (movieArray.cast[i].title);
            var releaseDate;
            if (movieArray.cast[i].release_date == null){
            releaseDate = '?';
           } else {
           releaseDate = (movieArray.cast[i].release_date);
            }
            var poster;
            if (movieArray.cast[i].poster_path == null) {
            	poster '?';
            } else {
            	poster = 'https://image.tmdb.org/t/p/w500/' + movieArray.cast[i].poster_path;}
            display(movie, releaseDate, bday, poster)
}
  }
}
jsonHTTP.send();
} 

function display(title,releaseDate,bday,poster) {
    var table = document.getElementById('results');
    var tbody = table.getElementsByTagName('tbody');
    var row1 = tbody[0].insertRow(0);
    var row2 = tbody[0].insertRow(1);
    var missingPoster ='https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png'
    row1.setAttribute("vertical-align","middle")
    var imageBox = document.createElement('IMG');
    imageBox.className = 'poster'
    if (imageBox == '?') {
    imageBox.setAttribute('src', missingPoster);
    row1.appendChild(missingPoster);
    } else {
    imageBox.setAttribute('src', poster);
    row1.appendChild(imageBox);
    }
    var cell2 = row1.insertCell(0);
    var age;
    var milliseconds = Math.abs(new Date(releaseDate.replace(/-/g,'/')) - new Date(bday.replace(/-/g,'/')));
     if (releaseDate == '?') {
     age = '?';
     } else {
     var age = Math.floor(milliseconds / 31536000000);
     }
    row2.innerHTML = title + " , age " + age;
    cell2.appendChild(imageBox)

}