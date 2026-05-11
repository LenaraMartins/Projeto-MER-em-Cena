// main.js
import { carregarCenario } from './ui.js';
import { 
    initEditor, 
    setModo, 
    limparTudo, 
    validarModelo, 
    avancarFase,
    fecharMenu, 
    menuRemoverConexao, 
    menuCardinalidade, 
    selecionarCard, 
    fecharCardinalidade,
    menuTornarPK,
    fecharMenuElemento,
    menuTornarFraca 
    

} from './editor.js';

function iniciarJogo() {
    const tela = document.getElementById('telaAbertura');
    tela.style.opacity = '0';
    
    setTimeout(() => {
        tela.style.display = 'none';
        
        // DÁ O PLAY ASSIM QUE A CORTINA ABRIR!
        const video = document.getElementById('videoCenario');
        if (video) {
            video.muted = false;
            video.play();
        }
    }, 800);
}
// Conectando as funções do JS com os botões do HTML
window.carregarCenario = carregarCenario;
window.setModo = setModo;
window.limparTudo = limparTudo;
window.validarModelo = validarModelo;
window.avancarFase = avancarFase;

// Funções do Menu Flutuante e Cardinalidade
window.fecharMenu = fecharMenu;
window.menuRemoverConexao = menuRemoverConexao;
window.menuCardinalidade = menuCardinalidade;
window.selecionarCard = selecionarCard;
window.fecharCardinalidade = fecharCardinalidade;
//novas//
window.menuTornarPK = menuTornarPK;
window.fecharMenuElemento = fecharMenuElemento;
window.iniciarJogo = iniciarJogo;
window.menuTornarFraca = menuTornarFraca;

document.addEventListener("DOMContentLoaded", () => {
    carregarCenario(1); 
    initEditor();
});