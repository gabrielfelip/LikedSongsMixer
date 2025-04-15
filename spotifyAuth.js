const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const port = 8888;

// Credenciais do Spotify
const clientId = '89e5e68415ab42638fe2facb05bd9d56';
const clientSecret = '6c47314f322b44d4ab0bee448b082156';
const redirectUri = 'https://1f61-2804-41b8-22e-ef00-adc0-d119-1c23-f799.ngrok-free.app/callback';

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri
});

// Armazenamento temporário de tokens
let storedAccessToken = '';
let storedRefreshToken = '';

// Rota para redirecionar o usuário ao Spotify para login
app.get('/login', (req, res) => {
    const authorizeURL = spotifyApi.createAuthorizeURL(['user-library-read', 'playlist-modify-public']);
    res.redirect(authorizeURL);
});

// Rota de callback do Spotify
app.get('/callback', (req, res) => {
    const code = req.query.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const accessToken = data.body['access_token'];
            const refreshToken = data.body['refresh_token'];

            storedAccessToken = accessToken;
            storedRefreshToken = refreshToken;

            spotifyApi.setAccessToken(accessToken);
            spotifyApi.setRefreshToken(refreshToken);

            console.log('Access token:', accessToken);
            res.send('Autenticado com sucesso!');
        })
        .catch(error => {
            console.error('Erro na autenticação:', error);
            res.send('Falha na autenticação');
        });
});

// Função para buscar todas as músicas salvas do usuário (com paginação)
async function getAllSavedTracks(accessToken) {
    const limit = 50;
    let offset = 0;
    let allTracks = [];
    let hasMore = true;

    spotifyApi.setAccessToken(accessToken);

    while (hasMore) {
        try {
            const data = await spotifyApi.getMySavedTracks({ limit, offset });
            allTracks = allTracks.concat(data.body.items);
            if (data.body.items.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }
        } catch (error) {
            console.error('Erro ao buscar faixas salvas:', error);
            hasMore = false;
        }
    }

    return allTracks;
}

// Rota para gerar a playlist com base nos artistas e nome fornecidos
app.get('/generate-playlist', async (req, res) => {
    const artistsParam = req.query.artists;
    const playlistName = req.query.name;

    if (!artistsParam || !playlistName) {
        return res.send('Por favor, forneça os artistas e o nome da playlist na URL. Exemplo: ?artists=Lorde,Paramore&name=Favoritas');
    }

    const artists = artistsParam.split(',').map(a => a.trim());
    console.log(`Artistas escolhidos: ${artists.join(', ')}`);

    try {
        const allTracks = await getAllSavedTracks(storedAccessToken);

        const filteredTracks = allTracks.filter(item =>
            item.track.artists.some(artist =>
                artists.includes(artist.name)
            )
        );

        console.log(`Total de faixas encontradas: ${filteredTracks.length}`);

        if (filteredTracks.length === 0) {
            return res.send('Nenhuma faixa dos artistas fornecidos foi encontrada nas suas músicas salvas.');
        }

        // Criar nova playlist
        const playlistData = await spotifyApi.createPlaylist(playlistName, { public: true });
        const playlistId = playlistData.body.id;

        // Adicionar faixas em lotes de 100 (limite da API)
        const trackUris = filteredTracks.map(item => item.track.uri);
        for (let i = 0; i < trackUris.length; i += 100) {
            const batch = trackUris.slice(i, i + 100);
            await spotifyApi.addTracksToPlaylist(playlistId, batch);
        }

        res.send(`Playlist "${playlistName}" criada com sucesso com ${filteredTracks.length} músicas de ${artists.join(', ')}!`);
    } catch (error) {
        console.error('Erro ao gerar playlist:', error);
        res.send('Erro ao gerar a playlist');
    }
});

// Rota para listar playlists do usuário
app.get('/playlists', (req, res) => {
    if (!storedAccessToken) {
        return res.send('Erro: Usuário não autenticado!');
    }

    spotifyApi.setAccessToken(storedAccessToken);

    spotifyApi.getUserPlaylists()
        .then(data => {
            const playlists = data.body.items.map(playlist => ({
                name: playlist.name,
                url: playlist.external_urls.spotify,
                image: Array.isArray(playlist.images) && playlist.images.length > 0 ? playlist.images[0].url : null,
                trackCount: playlist.tracks.total
            }));

            res.json(playlists);
        })
        .catch(error => {
            console.error('Erro ao obter playlists:', error);
            res.send('Erro ao obter playlists');
        });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
