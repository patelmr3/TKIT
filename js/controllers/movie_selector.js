var tkit = angular.module( "tkit", [ "ngRoute", "ngAnimate" ] );

tkit.config( function( $routeProvider, $locationProvider ) {
	$routeProvider
	.when( "/", { templateUrl: "movie_selector.html", controller: "movieSelector" })
	.when( "/show", { templateUrl: "show_selector.html", controller: "showSelector" });
	$locationProvider.html5Mode( true );
});

tkit.controller( "movieSelector", function( $scope, $interval, $timeout, $http ){

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
		var $_thisMovie   = $( ".movie-item-wrapper" ).eq( index );
		var $_thisOverlay = $_thisMovie.find( ".movie-info-overlay" );
		$( ".movie-item-wrapper" ).not( $_thisMovie ).removeClass( "movie-details-open" );
		$( ".movie-info-overlay" ).not( $_thisOverlay ).removeClass( "movie-info-overlay-open" );
		$_thisMovie.find( ".movie-info-overlay" ).toggleClass( "movie-info-overlay-open" );
		$_thisMovie.toggleClass( "movie-details-open" );
		animateChildren( $_thisMovie.find( ".movie-info-inner" ) );
	}

	//animate movie info
	function animateChildren( parent ){
		var children = parent.children();
		$( "."+parent.attr( "class" ) ).not( parent ).children()
			.removeClass( "movie-info-animate-before" )
			.removeClass( "movie-info-animate-start" );
		children.toggleClass( "movie-info-animate-before" );
		var ctr = 0;
		var animInterval = $interval( function(){
			children.eq( ctr )
				.toggleClass( "movie-info-animate-start" );
			ctr++;
			if( ctr == children.length ){
				$interval.cancel( animInterval );
			}
		},150);
	}

	//book now
	$scope.bookNow = function(){

	}

});

tkit.controller( "showSelector", function( $scope ){
	
});