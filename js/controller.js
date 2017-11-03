angular.module("Artistas").controller("ArtistasController", function($scope){
	$scope.artistas = [
		{
			nome: 'nothing',
			imagemUrl: 'http://via.placeholder.com/300x300'

		}
	];

	$scope.novoArtista = {};

	$scope.adicionaArtista = function() {
		var artista = angular.copy($scope.novoArtista);
		artista.id = Date.now();
		$scope.artistas.push(artista);

		$scope.novoArtista = {};
	}
});

