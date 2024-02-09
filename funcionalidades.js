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

function AbrirExtrato() {
    const urlTela = 'extrato.html';
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

function TelaChavePix(valorTransferido) {
    sessionStorage.setItem('valorTransferido', valorTransferido);
    const urlTela = `contatransferir.html`;
    window.close();
    window.open(urlTela);
}

function EnviarNome() {
    const nome = document.querySelector('.txtNome').value;
    if (nome === '') {
        alert('Digite seu nome!');
        document.querySelector('.txtNome').value = '';
    } else if (isNaN(nome)) {
        sessionStorage.setItem('nomeUsuario', nome);
        VoltarMenu();
    } else {
        alert('Digite seu nome!');
        document.querySelector('.txtNome').value = '';
    }
}

(function ExibirNome() {
    const nomeArmazenado = sessionStorage.getItem('nomeUsuario');
    document.querySelector('.nomeUsuario').innerText = nomeArmazenado;
})();


let saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0;

function Deposito() {
    const valor = document.querySelector('.txtDeposito').value;
    const valorDepositado = parseFloat(valor);

    if (isNaN(valorDepositado) || valorDepositado <= 0) {
        alert('Por favor, insira um valor de depósito válido.');
        document.querySelector('.txtDeposito').value = '';
        return;
    } else {
        let saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0;
        saldo += valorDepositado;
        localStorage.setItem('saldoAtual', saldo);

        const transacao = {
            tipo: 'Depósito',
            valor: valorDepositado,
            data: new Date().toISOString()
        };
        
        let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
        transacoes.push(transacao);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        
        alert('Depósito efetuado com sucesso!');
        VoltarMenu();         
    }
}


function Sacar() {
    const valor = document.querySelector('.txtSaque').value;
    const valorSacado = parseFloat(valor);

    if (isNaN(valorSacado) || valorSacado <= 0) {
        alert('Por favor, insira um valor de depósito válido.');
        document.querySelector('.txtSaque').value = '';
        return;
    } else {
        let saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0;
        if (valorSacado > saldo) {
            alert('Valor insuficiente. Não é possível realizar o saque.');
            document.querySelector('.txtSaque').value = '';
        } else {
            saldo -= valorSacado;
            localStorage.setItem('saldoAtual', saldo);

            const transacao = {
                tipo: 'Saque',
                valor: valorSacado,
                data: new Date().toISOString()
            };

            let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
            transacoes.push(transacao);
            localStorage.setItem('transacoes', JSON.stringify(transacoes));

            alert('Saque efetuado com sucesso!');
            VoltarMenu();
            
        }
    }
}


function Transferir() {
    const valor = document.querySelector('.txtTransferir').value;
    const valorTransferido = parseFloat(valor);

    if (isNaN(valorTransferido) || valorTransferido <= 0) {
        alert('Por favor, insira um valor de transferência válido.');
        document.querySelector('.txtTransferir').value = '';
        return;
    } else {
        let saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0;
        if (valorTransferido > saldo) {
            alert('Valor insuficiente. Não é possível realizar a transferência.');
            document.querySelector('.txtTransferir').value = '';
        } else {
            TelaChavePix(valorTransferido);
        }
    }
}

function RealizarTransferencia() {
    const valorTransferido = parseFloat(sessionStorage.getItem('valorTransferido')) || 0;
    const chavePix = document.getElementsByClassName('txtChavePix');
    const Chave = chavePix[0].value;

    const resposta = confirm(`Você tem certeza que deseja transferir: R$${valorTransferido.toFixed(2)} Para a chave pix: ${Chave} ?`)
    if (resposta == true) {
        let saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0;
        saldo -= valorTransferido;
        localStorage.setItem('saldoAtual', saldo); 
        
        const transacao = {
            tipo: 'Transferência',
            pix: Chave,
            valor: valorTransferido,
            data: new Date().toISOString()
        };

        let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
        transacoes.push(transacao);
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        alert('Transferência efetuada com sucesso!');
        VoltarMenu();
        
    } else {
        alert('Confirme a chave pix que você deseja transferir!');
        document.querySelector('.txtChavePix').value = '';
    }
}


(function AtualizarSaldo() {
    document.querySelector('.saldoAtual').innerText = saldo.toFixed(2);
})();


function FecharOlho() {
    const fecharOlho = document.getElementsByClassName('btnOlho-aberto');
    const aberto = document.getElementsByClassName('btnOlho-fechado');
    const saldo = document.getElementsByClassName('saldoAtual');
    for (let i = 0; i < fecharOlho.length; i++) {
        fecharOlho[i].style.display = "none";
        aberto[i].style.display = "block";
        saldo[i].style.display = "none";
    }
}


function AbrirOlho() {
    const abrirOlho = document.getElementsByClassName('btnOlho-fechado');
    const fechado = document.getElementsByClassName('btnOlho-aberto');
    const saldo = document.getElementsByClassName('saldoAtual');
    for (let i = 0; i < abrirOlho.length; i++) {
        abrirOlho[i].style.display = "none";
        fechado[i].style.display = "block";
        saldo[i].style.display = "inline";
    }
}


function ExibirExtrato() {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    
    const listaHistorico = document.getElementById('lista-transacao');
    listaHistorico.innerHTML = ''; // Limpar lista para evitar duplicatas
    listaHistorico.style.display = 'block';

    transacoes.forEach(transacao => {            
        const itemLista = document.createElement('li');
        const dataHoraFormatada = new Date(transacao.data).toLocaleString('pt-BR');
        let textoTransacao = `${transacao.tipo} de R$${transacao.valor.toFixed(2)}`;

        if (transacao.pix) {
            textoTransacao += ` - Para: ${transacao.pix}`;
        }

        itemLista.textContent = `${textoTransacao} - ${dataHoraFormatada}`;

        if (transacao.tipo === 'Depósito') {
            itemLista.classList.add('itens', 'li-deposito');
        } else if (transacao.tipo === 'Saque') {
            itemLista.classList.add('itens', 'li-saque');
        } else if (transacao.tipo === 'Transferência') {
            itemLista.classList.add('itens', 'li-transferencia');
        }

        listaHistorico.appendChild(itemLista);
    });
}

function LimparExtrato() {
    const lista = document.getElementById('lista-transacao');
    lista.style.display = 'none';
}
















