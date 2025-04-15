# 🎵 Spotify Playlist Generator  

Quer ouvir só as músicas que você realmente curte de determinado artista? Esse projeto te ajuda a criar playlists no Spotify com base na sua playlist **"Músicas curtidas"**. Rápido, prático e sem precisar montar tudo na mão.  

---

# 💡 Sobre o Projeto
A ideia surgiu de um pedido específico da minha namorada, que queria criar playlists personalizadas no Spotify, mas com um detalhe: **somente com as músicas dos artistas que ela já tinha curtido alguma música.** Como o Spotify **não tem essa funcionalidade**, desenvolvi essa ferramenta para filtrar as músicas curtidas de determinados artistas e criar playlists automáticas. Agora, com apenas alguns artistas informados, ela pode gerar playlists com suas músicas favoritas, sem perder tempo com faixas que nunca curtiu.





# 🤖 O Que Este App Faz Que o Spotify Não Faz:

- Filtra músicas curtidas por artista — algo que o app oficial do Spotify **não** faz.

- Permite criar uma playlist só com as suas faixas favoritas de vários artistas ao mesmo tempo.

- Automatiza o processo chato de adicionar músicas manualmente.

---

## ✨ Funcionalidades  

✅ **Autenticação com o Spotify** – Conecte-se à sua conta.  
🎶 **Filtro por artistas** – Cria playlists com as músicas dos artistas que você já curtiu.  
🔄 **Criação automática** – Playlist gerada automaticamente com as faixas dos artistas escolhidos.  
🌐 **Interface simples** – Tudo feito via URL, sem necessidade de frontend.  

---

# 🔄 Fluxo do Sistema
**Usuário** → [Informa artistas desejados]

O usuário acessa a URL do app e fornece uma lista de artistas (separados por vírgulas) para criar a playlist personalizada.

**Sistema** → [Filtra músicas curtidas dos artistas informados]

O sistema utiliza a API do Spotify para acessar a conta do usuário e filtrar todas as músicas curtidas por cada artista informado.

**Spotify** → [Cria a playlist personalizada]

O Spotify gera a playlist automaticamente com base nas músicas que o usuário curtiu desses artistas.

**Sistema** → [Retorna sucesso ou erro]

Se o processo for bem-sucedido, a playlist é criada e o sistema retorna uma mensagem de sucesso com o nome da playlist e o número de músicas adicionadas. Caso contrário, exibe uma mensagem de erro, caso o usuário não tenha músicas suficientes ou haja algum outro problema.

---

# 💻 Exemplo de Uso

> $ node index.js

> Servidor rodando na porta 8888

> Playlist "Minhas Favoritas do Paramore" criada com sucesso!

> 27 músicas adicionadas

---

## 🛠️ Tecnologias  

| Tecnologia | Função |
|------------|--------|
| [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) | Ambiente de execução JavaScript no backend |
| [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) | Framework web para Node.js |
| [![Spotify API](https://img.shields.io/badge/Spotify_API-1ED760?style=for-the-badge&logo=spotify&logoColor=white)](https://github.com/thelinmichael/spotify-web-api-node) | Comunicação com a API oficial do Spotify |
| [![Ngrok](https://img.shields.io/badge/Ngrok-1F1F1F?style=for-the-badge&logo=ngrok&logoColor=white)](https://ngrok.com/) | Expõe sua aplicação local para acesso externo (callback do Spotify) |

---

## ⚡ Como Usar  

### **Pré-requisitos**  
- Node.js (v18+)  
- Conta no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)  
- Ngrok instalado ([Download](https://ngrok.com/download))  

# 1. **Configuração**  

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/gabrielfelip/LikedSongsMixer.git

   cd LikedSongsMixer
   
# 2. **Instale as dependências**

***npm install***

---

# 3 Configure o app no Spotify Developer

1. Crie um novo app no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Adicione o Redirect URI (ex: `https://xxxx.ngrok-free.app/callback`), substituindo pela URL gerada pelo Ngrok após iniciar o servidor.
3. Substitua as variáveis no código com as credenciais do seu app:
   ```javascript
   const clientId = 'SEU_CLIENT_ID';  // Obtido no Spotify Dashboard
   const clientSecret = 'SEU_CLIENT_SECRET';  // Obtido no Spotify Dashboard
   const redirectUri = 'https://xxxx.ngrok-free.app/callback';  // URL gerada pelo Ngrok


---

# 4. **Inicie o Ngrok**

***ngrok http 8888 ou .\ngrok http 8888***

**Obs:** Atualize o redirectUri no código e no Spotify Dashboard com o link gerado (ex: https://abcd1234.ngrok-free.app).

---

# 5. **Rode o servidor**

*node* **nome-do-arquivo.js**

Esse é o seu arquivo **principal**, contém a lógica principal da aplicação

---

# 🔄 **Como Gerar Playlists**
## 1. **Faça a Autenticação**

Acesse no navegador: http://localhost:8888/login

Siga os passos e autorize o app. Você verá a mensagem:

✅ Autenticado com sucesso!

## 2. **Gere sua playlist personalizada**

✔️ Formato para nomes **simples**: http://localhost:8888/generate-playlist?artists=Artista1,Artista2&name=NomeDaPlaylist

✔️ Formato para nomes **compostos**: http://localhost:8888/generate-playlist?artists=Harry%20Styles,Taylor%20Swift,Lorde&name=Nome%20da%20playlist

---

# 📂 Estrutura do Projeto

📦 raiz

├── 📄 index.js          → Código principal da aplicação

├── 📄 README.md         → Documentação

└── 📦 node_modules/     → Dependências

---

# ⚠️ Observações

O Spotify retorna até 50 músicas por vez, mas o sistema consegue buscar todas as músicas curtidas.

Nomes compostos devem usar %20 (ex: Harry%20Styles).

Sem frontend – tudo é feito via URL no navegador.

---










