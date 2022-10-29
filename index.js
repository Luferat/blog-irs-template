/**
 * JavaScript do aplicativo.
 * Depende de "jQuery" (https://jquery.com/).
 *
 * OBS 1: Este é o aplicativo principal, para que o tema (template) do site
 * opere. Posteriormente, quando necessário, cada página (conteúdo) terá seu
 * próprio JavaScript, assim, somente o JavaScript necessário será carregado.
 *
 * OBS 2: Todas as instruções que iniciam com um cifrão ($) são da biblioteca
 * jQuery, ou seja, não são JavaScript "puro" (vanilla).
 *
 * Para saber mais:
 *   • https://www.w3schools.com/js/
 *   • https://www.w3schools.com/jsref/
 *   • https://www.w3schools.com/jquery/
 */

// Executa aplicativo "runApp" quando o documento estiver pronto.
$(document).ready(runApp);

function runApp() {
  // Limpa mensagens do console.
  console.clear();

  // Exibe uma mensagem no console do navegador.
  console.log("Blog IRS");

  /**
   * Carrega a página inicial ao entrar no aplicativo.
   **/
  loadPage('home');

  /**
   * Monitora cliques nos links (tags <a>...</a>).
   * Quando ocorre um clique, chama a função routerLink.
   **/
  $(document).on("click", "a", routerLink);
}

/**
 * Função que processa clique em um link.
 */
function routerLink() {
  /**
   * Lê o valor do atributo "href" do elemento clicado e armazena na
   * variável "href".
   **/
  let href = $(this).attr("href");

  /**
   * Lê o valor do atributo "target" do elemento clicado e armazena na
   * variável "target".
   */
  let target = $(this).attr("target");

  /**
   * Detecta se o link clicado corresponde a um link externo:
   * Usamos a lógica "OR" (OU → ||) onde, se apenas uma das expressões for
   * verdadeira, TODAS serão verdadeiras.
   */
  if (
    href.substr(0, 7) === "http://" || // Se "href" inicia com "http://" OU
    href.substr(0, 8) === "https://" || // Se "href" inicia com "https://" OU
    href.substr(0, 1) === "#" || // Se "href" inicia com "#" OU
    target === "_blank" // Se "target" tem o valor "_blank"...
  ) {
    return true; // ... retorna para o HTML, ativando o link normalmente.
  }

  // Carrega a rota selecionada.
  loadPage(href);

  // Retorna para o HTML sem ativar o link.
  return false;
}

/**
 * Função processa uma rota.
 */
function loadPage(href) {
  /**
   * Formata os caminhos para os componentes da rota.
   */
  let page = {
    html: "/pages/" + href + "/index.html",
    css: "/pages/" + href + "/style.css",
    js: "/pages/" + href + "/script.js"
  };

  // Obtém o componente HTML da rota e armazena na variável 'data'.
  $.get(page.html, function (data) {

    // Carrega o componente HTML no elemento <main>.
    $('main').html(data);

    // 'Linka' a folha de estilos da rota.
    $('#pageCSS').attr('href', page.css);

    // Inicia o JavaScript da rota.
    $.getScript(page.js);
  });

}
