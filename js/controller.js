angular.module("Artistas").controller("ArtistasController", function($scope){
	$scope.artistas = [
		{
			nome: 'nothing',
			imagemUrl: '../img/no-image.png'

		}
	];

	$scope.novoArtista = {};

	$scope.adicionaArtista = function() {
		if($scope.validaNome()){
			$scope.validaImagem();

			var artista = angular.copy($scope.novoArtista);
			artista.id = Date.now();
			$scope.artistas.push(artista);
			$scope.novoArtista = {};

		}else {
			alert('Nome do artista já existe!');
		}
		/*
		var artista = angular.copy($scope.novoArtista);
			artista.id = Date.now();
			$scope.artistas.push(artista);

			$scope.novoArtista = {};*/
	}


	$scope.validaNome = function(){ 
		
		for(var i = 0; i < $scope.artistas.length; i++){
			if($scope.novoArtista.nome == $scope.artistas[i].nome){
				return false;
			}
		}
		
		/*
		angular.forEach($scope.artistas, function(artista){
			if(artista.nome == $scope.novoArtista.nome){
				return false;
			}
		});*/
		return true;
	}

	
	$scope.validaImagem = function() {
		if($scope.novoArtista.imagemUrl === undefined){
			$scope.novoArtista.imagemUrl = '../img/no-image.png';
		}
	}
});

