var tkit = angular.module( "tkit", [ "ngRoute", "ngAnimate" ] );

tkit.config( function( $routeProvider, $locationProvider ) {
	$routeProvider
	.when( "/", { templateUrl: "movie_selector.html", controller: "movieSelector" })
	.when( "/show", { templateUrl: "show_selector.html", controller: "showSelector" });
	$locationProvider.html5Mode( true );
});

tkit.controller( "movieSelector", function( $scope, $interval, $http ){

	//get movies from json file
	$http.get( "js/movies.json" )
	.then( function( response ){
		$scope.moviesRaw = response.data;
	});

	$scope.movies = [];

	//push movies one by one at interval
	$scope.pushMovies = function( i ){
		$scope.movies.push( $scope.moviesRaw[ i ] );
	}

	var i = 0;
	var pushInterval = $interval(function(){
		var totalMovies = $scope.moviesRaw.length
		$scope.pushMovies( i );
		i++;
		if( i==totalMovies ){
			$interval.cancel( pushInterval );
		}
	},100);

	//show movie details
	$scope.showMovieDetails = function( index, movie ){
		var $_thisMovie = $( ".movie-item-wrapper" ).eq( index );
		$( ".movie-item-wrapper" ).not($_thisMovie).removeClass( "movie-details-open" );
		$_thisMovie.toggleClass( "movie-details-open" );
	}

});

tkit.controller( "showSelector", function( $scope ){
	
});