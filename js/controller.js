app.controller("meuAppController", function($scope){
	$scope.artistas = [];
	$scope.artistasFavoritos = [];
	$scope.playlists = [];

	$scope.novoArtista = {};

	$scope.adicionaArtista = function() {
		if($scope.validaNome()){
			$scope.validaImagem();

			var artista = angular.copy($scope.novoArtista);
			artista.id = Date.now();
			artista.albuns = [];
			artista.nota = 'N/A';
			artista.ultimaMusica = 'N/A';
			$scope.artistas.push(artista);
			$scope.novoArtista = {};

			alert('Artista adicionado');

		}else {
			alert('Nome do artista já existe!');
		}
	}


	$scope.validaNome = function(){ 
		
		for(var indiceArtista = 0; indiceArtista < $scope.artistas.length; indiceArtista++){
			if($scope.novoArtista.nome == $scope.artistas[indiceArtista].nome){
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

	
	$scope.novaMusica = {};
	$scope.albumExiste = false;
	$scope.albumExistente = {};
	$scope.musicaExiste = false;
	$scope.artistaNaoExiste = true;

	
	$scope.adicionaMusica = function() {

		var musica = {};
		musica.nome = $scope.novaMusica.nome;
		musica.ano = $scope.novaMusica.ano;
		musica.duracao = $scope.novaMusica.duracao;

		$scope.validaMusica();

		if (!$scope.validaArtista()){
			alert('Artista não existe!');
		} else if($scope.musicaExiste) {
			alert('Música já existe!');
		} else if($scope.albumExiste){
			$scope.albumExistente.musicas.push(musica);
			alert('Música adicionada no álbum: ' + $scope.albumExistente.nome);
		} else {
			var novoAlbum = {};
			novoAlbum.nome = $scope.novaMusica.album;
			novoAlbum.musicas = [musica];
			for(var indiceArtista = 0; indiceArtista < $scope.artistas.length; indiceArtista++){
				if($scope.novaMusica.artista == $scope.artistas[indiceArtista].nome){
					$scope.artistas[indiceArtista].albuns.push(novoAlbum);
					alert('Música adicionada no álbum: ' + novoAlbum.nome);
				}
			}
		}

		$scope.novaMusica = {};
		$scope.albumExiste = false;
		$scope.albumExistente = {};
		$scope.musicaExiste = false;

		

	}

	$scope.validaMusica = function() {

		for(var indiceArtista = 0; indiceArtista < $scope.artistas.length; indiceArtista++){

			for(var indiceAlbum = 0; indiceAlbum < $scope.artistas[indiceArtista].albuns.length; indiceAlbum++){

				if($scope.novaMusica.artista == $scope.artistas[indiceArtista].nome && $scope.novaMusica.album == $scope.artistas[indiceArtista].albuns[indiceAlbum].nome){
					$scope.albumExiste = true;
					$scope.albumExistente = $scope.artistas[indiceArtista].albuns[indiceAlbum];


					for(var indiceMusica = 0; indiceMusica < $scope.artistas[indiceArtista].albuns[indiceAlbum].musicas.length; indiceMusica++){
						if($scope.novaMusica.nome == $scope.artistas[indiceArtista].albuns[indiceAlbum].musicas[indiceMusica].nome){
							$scope.musicaExiste = true;
							return;
						}
					}	
				}
				
			}
			
		}
	}

	$scope.validaArtista = function() {
		for(var indiceArtista = 0; indiceArtista < $scope.artistas.length; indiceArtista++){
			if($scope.novaMusica.artista == $scope.artistas[indiceArtista].nome){
				return true;
			}
		}
		return false;
	}

	$scope.adicionaFavorito = function(artista) {
		$scope.artistasFavoritos.push(artista);
	}

	$scope.removeFavorito = function(artista) {
		for(indiceArtista = 0; indiceArtista < $scope.artistasFavoritos.length; indiceArtista++){
			if(artista.nome == $scope.artistasFavoritos[indiceArtista].nome){
				$scope.artistasFavoritos.splice(indiceArtista);
			}
		}
	}

	$scope.estaEmFavoritos = function(artista) {
		for(indiceArtista = 0; indiceArtista < $scope.artistasFavoritos.length; indiceArtista++){
			if(artista.nome == $scope.artistasFavoritos[indiceArtista].nome){
				return true;
			}
		}

		return false;
	}


	$scope.novaPlaylist = {};

	$scope.adicionaPlaylist = function() {
		var playlist = {};
		if(!$scope.verificaNomePlaylist()){
			alert("A playlist já existe!");
		} else {
			playlist.nome = $scope.novaPlaylist.nome;
			playlist.id = Date.now();
			playlist.musicas = [];
			$scope.playlists.push(playlist);
		}
		
		$scope.novaPlaylist = {};
	}

	$scope.verificaNomePlaylist = function() {
		for(indicePlaylist = 0; indicePlaylist < $scope.playlists.length; indicePlaylist++){
			if($scope.playlists[indicePlaylist].nome == $scope.novaPlaylist.nome){
				return false;
			}
		}
		return true;
	}

	$scope.novaMusicaNaPlaylist = '';

	$scope.adicionaMusicaNaPlaylist = function(playlist) {
		for(indiceMusica = 0; indiceMusica < playlist.musicas.length; indiceMusica++) {
			if(play.list.musicas[indiceMusica] == $scope.novaMusicaNaPlaylist){
				alert('Música já está na playlist');
				return;
			}
		}

		playlist.musicas.push($scope.novaMusicaNaPlaylist);

		$scope.novaMusicaNaPlaylist = '';
		alert('Musica adicionada');
	}
	
	
	
});


