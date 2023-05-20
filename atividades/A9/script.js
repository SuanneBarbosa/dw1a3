
const objeto = document.getElementById('objeto');
const terminal = document.getElementById('terminal');

function mudarCor() {
  const novaCor = gerarCorAleatoria();
  objeto.style.backgroundColor = novaCor;
  exibirCodigoCSS(novaCor);
}

function gerarCorAleatoria() {
  const letras = '0123456789ABCDEF';
  let cor = '#';
  for (let i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}

function exibirCodigoCSS(cor) {
  const codigo = `background-color: ${cor};`;
  const linha = document.createElement('p');
  linha.textContent = codigo;
  linha.className = 'linha';
  terminal.innerHTML = ''; 
  terminal.appendChild(linha);
}
