/*--------------Máscara---------------*/
const mascara = {

    cpf (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    },

    rg (value) {
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
      },  

    dataNascimento (value) {
        return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+?$/, '$1')
    },
  
    telefoneDDI (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '+$1 $2')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
  
    cep (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    },

  }
  
  document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js
  
    $input.addEventListener('input', e => {
      e.target.value = mascara[field](e.target.value)
    }, false)
  } )
  
/*--------------ValidarCPF---------------*/
function validarPrimeiroDigito(cpf) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += cpf[i] * (10 - i);
    }
    const resto = (sum * 10) % 11;
    if (resto < 10) {
      return cpf[9] == resto;
    }
    return cpf[9] == 0;
  }
  
  function validarSegundoDigito(cpf) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += cpf[i] * (11 - i);
    }
    const resto = (sum * 10) % 11;
    if (resto < 10) {
      return cpf[10] == resto;
    }
    return cpf[10] == 0;
  }
  
  function validarRepetido(cpf) {
    const primeiro = cpf[0];
    let diferente = false;
    for(let i = 1; i < cpf.length; i++) {
      if(cpf[i] != primeiro) {
        diferente = true;
      }
    }
    return diferente;
  }
  
  function validarCpf(cpf) {

    cpf = cpf.replace(/[.-]/g, "")
    if (cpf.length != 11) {
      return false;
    }
    if(!validarRepetido(cpf)) {
      return false;
    }
    if (!validarPrimeiroDigito(cpf)) {
      return false;
    }
    if (!validarSegundoDigito(cpf)) {
      return false;
    }
    return true;
  }
  
  /*--------------Validação---------------*/

  const button = document.getElementById('button');
  button.addEventListener('click', (event) => {
      event.preventDefault()

      const cpfErro = document.getElementById('cpf-erro')
      const cpf = document.getElementById('cpf')
      const rg = document.getElementById('rg')
      const dataNascimento= document.getElementById('dataNascimento')
      const telefoneDDI = document.getElementById('telefoneDDI')
      const cep = document.getElementById('cep')

      if(cpf.value == ''){
          cpf.classList.add("errorInput")
      } else if(!validarCpf (cpf.value)) {
        cpf.classList.add("errorInput")
        cpfErro.textContent = 'Cpf Inválido';
        cpfErro.classList.add('active');
      } else{
        cpf.classList.remove("errorInput")
        cpfErro.textContent = '';
        cpfErro.classList.remove('active');
      }

      if(rg.value == ''){
          rg.classList.add("errorInput")
      } else{
        rg.classList.remove("errorInput")
      }

      if(dataNascimento.value == ''){
          dataNascimento.classList.add("errorInput")
      } else{
        dataNascimento.classList.remove("errorInput")
      }
  
      if(telefoneDDI.value == ''){
          telefoneDDI.classList.add("errorInput")
      } else{
        telefoneDDI.classList.remove("errorInput")
      }
  
      if(cep.value == ''){
          cep.classList.add("errorInput")
      } else{
        cep.classList.remove("errorInput")
      }
  })