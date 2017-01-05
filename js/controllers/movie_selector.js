var tkit = angular.module( "tkit", ["ngRoute"] );

tkit.config( function( $routeProvider ) {
	$routeProvider
	.when("/", { templateUrl: "movie_selector.html", controller: "movieSelector" });
});