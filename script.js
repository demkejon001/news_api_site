$(document).ready(function() {

	var apiKey = 'apiKey=f1f8fc88ed4148ca9a13f39d5d49da78';	

	var searchResults = function(json) {
		var results = '';

		for (var i = 0; i < json.articles.length; i++) {
			results += '<div id="newsResult">'
			results += '<div id="article">'
			results += '<a id="article-title" href="' + json.articles[i].url + '">' + json.articles[i].title + '</a>'
			results += '<p id="author">' + json.articles[i].author + '</p>'
			results += '</div>'
			results += '<div id="article-info">'
			results += '<div>'
			results += '<h4>' + json.articles[i].source.name + '</h4>'
			results += '<p>' + json.articles[i].description + '</p>'
			results += '</div>'
			results += '<img src="' + json.articles[i].urlToImage + '"></img>'
			results += '</div>'
			results += '</div>'
		}
		return results;
	}

	var newsQuestion = function(e) {
		e.preventDefault();
		var value = $("#newsInput").val();
		values = value.split(' ')
		url_value = values.join('%')
		console.log(url_value);
		app.message = 'Search from top news sources: ' + value
		var myurl= 'https://newsapi.org/v2/everything?' + 'q=' + url_value + '&sources=abc-news,bbc-news,cbs-news,cnn,financial-times,fox-news,google-news,hacker-new,ign,msnbc,national-geographic,nbc-news,reddit-r-all,the-economist,the-new-york-times,time,the-washington-post,the-wall-street-journalbusiness-insider,reuters&language=en&sortBy=popularity&' + apiKey;
		console.log(myurl);

		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(json) {
				console.log(json);	
				var results = searchResults(json);
				$("#newsResults").html(results);				
			}
		});

	}



	console.log('Hello World');

	var myurl= 'https://newsapi.org/v2/top-headlines?country=us&' + apiKey;
	console.log(myurl);

	$.ajax({
		url : myurl,
		dataType : "json",
		success : function(json) {
			console.log(json);	
			var results = searchResults(json);
			$("#newsResults").html(results);	
		}
	});

	var submitButton = $("#newsSubmit")
	console.log(submitButton)
	$("#newsSubmit").click(newsQuestion);

	
});

var app = new Vue({
	el: '#app',
	data: {
		message: 'Welcome to Today\'s Top Headlines'
	}
})


