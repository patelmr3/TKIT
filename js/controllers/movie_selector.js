var tkit = angular.module( "tkit", [ "ngRoute", "ngAnimate" ] );

tkit.config( function( $routeProvider, $locationProvider ) {
	$routeProvider
	.when( "/", { templateUrl: "movie_selector.html", controller: "movieSelector" })
	.when( "/show", { templateUrl: "show_selector.html", controller: "showSelector" });
	$locationProvider.html5Mode( true );
});

tkit.controller( "movieSelector", function( $scope, $interval ){
	$scope.moviesRaw = [
		{
			title		: 	"Movie Title 1",
			showTimes	: 	[ '9:00 AM', '9:45 AM', '3:00 PM', '6:00 PM' ],
			summary		: 	"This is a movie summary 1", 
			poster		: 	"https://drnorth.files.wordpress.com/2015/02/divergent-2014-movie-posters-and-trailer.jpg"
		},
		{
			title		: 	"Movie Title 2",
			showTimes	: 	[ '9:00 AM', '9:45 AM', '6:00 PM' ],
			summary		: 	"This is a movie summary 2", 
			poster		: 	"https://drnorth.files.wordpress.com/2015/02/divergent-2014-movie-posters-and-trailer.jpg"
		},
		{
			title		: 	"Movie Title 3",
			showTimes	: 	[ '9:00 AM', '9:45 AM', '3:00 PM' ],
			summary		: 	"This is a movie summary 3", 
			poster		: 	"https://drnorth.files.wordpress.com/2015/02/divergent-2014-movie-posters-and-trailer.jpg"
		}
	];

	$scope.movies = [];

	$scope.pushMovies = function(i){
		$scope.movies.push( $scope.moviesRaw[i] );
	}

	var i = 0;
	var pushInterval = $interval(function(){
		var totalMovies = $scope.moviesRaw.length
		$scope.pushMovies(i);
		i++;
		if(i==totalMovies){
			$interval.cancel(pushInterval);
		}
	},100);
	

});

tkit.controller( "showSelector", function( $scope ){
	
});