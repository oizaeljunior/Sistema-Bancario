

function AbrirDeposito() {
    const urlTela = 'deposito.html';
    window.close();
    window.open(urlTela);
}

function AbrirSaque() {
    const urlTela = 'sacar.html';
    window.close();
    window.open(urlTela);
}

function AbrirTransferir() {
    const urlTela = 'transferir.html';
    window.close();
    window.open(urlTela);
}

function VoltarMenu() {
    const urlTela = 'menu.html';
    window.close();
    window.open(urlTela);
}

function TelaNovaConta() {
    const urlTela = 'novaconta.html';
    window.close();
    window.open(urlTela);
}

function TelaChavePix() {
    const urlTela = 'contatransferir.html';
    window.close();
    window.open(urlTela);
}

function EnviarNome() {
    const nome = document.querySelector('.txtNome').value;   
    sessionStorage.setItem('nomeUsuario', nome);
    VoltarMenu();
}
const nomeArmazenado = sessionStorage.getItem('nomeUsuario');
document.querySelector('.nomeUsuario').innerText = nomeArmazenado; 


let saldo = parseFloat(sessionStorage.getItem('saldoAtual')) || 0;

function Deposito(){
    const valor = document.querySelector('.txtDeposito').value;
    const valorDepositado = parseFloat(valor);
    
    if (isNaN(valorDepositado) || valorDepositado <= 0) {
        alert('Por favor, insira um valor de depósito válido.');
        document.querySelector('.txtDeposito').value = '';
        return;
      } else {
            let saldo = parseFloat(sessionStorage.getItem('saldoAtual')) || 0;
            saldo += valorDepositado;
            sessionStorage.setItem('saldoAtual', saldo);  
            
            alert('Depósito efetuado com sucesso!'); 
            VoltarMenu();
      } 
}
const valorDepositoArmazenado = sessionStorage.getItem('saldoAtual');
document.querySelector('.saldoAtual').innerText = saldo.toFixed(2);


function Sacar() {
    const valor = document.querySelector('.txtSaque').value;
    const valorSacado = parseFloat(valor);

    if (isNaN(valorSacado) || valorSacado <= 0) {
        alert('Por favor, insira um valor de depósito válido.');
        document.querySelector('.txtSaque').value = '';
        return;
      } else {
        let saldo = parseFloat(sessionStorage.getItem('saldoAtual')) || 0;
        if (valorSacado > saldo) {
            alert('Valor insuficiente. Não é possível realizar o saque.');
        } else{
            saldo -= valorSacado;
            sessionStorage.setItem('saldoAtual', saldo); 
            alert('Saque efetuado com sucesso!'); 
        }
            VoltarMenu();
      }   
}
const valorSacadoArmazenado = sessionStorage.getItem('saldoAtual');
document.querySelector('.saldoAtual').innerText = saldo.toFixed(2);


function Transferir() {
    const valor = document.querySelector('.txtTransferir').value;
    const valorTransferido = parseFloat(valor);

    if (isNaN(valorTransferido) || valorTransferido <= 0) {
        alert('Por favor, insira um valor de transferência válido.');
        document.querySelector('.txtTransferir').value = '';
        return;
      } else {
        let saldo = parseFloat(sessionStorage.getItem('saldoAtual')) || 0;
        if (valorTransferido > saldo) {
            alert('Valor insuficiente. Não é possível realizar a transferência.');
        } else{
            saldo -= valorTransferido;
            sessionStorage.setItem('saldoAtual', saldo); 
            alert('Transferência efetuada com sucesso!'); 
        }
            VoltarMenu();
      }
}
const valorTransferidoArmazenado = sessionStorage.getItem('saldoAtual');
document.querySelector('.saldoAtual').innerText = saldo.toFixed(2);




function OlhoFechado() {
     const fecharOlho = document.getElementsByClassName('btnOlho-aberto');
     const aberto = document.getElementsByClassName('btnOlho-fechado');
     for (let i = 0; i < fecharOlho.length; i++) {
         fecharOlho[i].style.display = "none";
         aberto[i].style.display = "block";       
     }     
 }  


 function OlhoAberto() {
    const abrirOlho = document.getElementsByClassName('btnOlho-fechado');
    const fechado = document.getElementsByClassName('btnOlho-aberto');
    for (let i = 0; i < abrirOlho.length; i++) {
        abrirOlho[i].style.display = "none";
        fechado[i].style.display = "block";
    }
}






