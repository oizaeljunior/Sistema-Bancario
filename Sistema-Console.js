class ContaBancaria{
    constructor(numero_conta, saldo_inicial = 0){
        this.numero_conta = numero_conta;
        this.saldo = saldo_inicial;
        this.transacoes = [];
    }

    depositar(valor){
        this.saldo = this.saldo + valor;
        this.historico(`Depósito: +${valor} `);
    }

    sacar(valor){
        if (valor <= this.saldo) {
            this.saldo = this.saldo - valor;
            this.historico(`Saque: -${valor} `);
        } else {
            alert('Saldo insuficiente!');
        }
    }

    transferir(outraConta, valor){
        if (valor <= this.saldo) {
            this.saldo = this.saldo - valor;
            outraConta.depositar(valor);
            this.historico(`Transferência para conta ${outraConta.numero_conta}: ${valor} `);
        } else {
            alert('Saldo insuficiente!');
        }
    }

    exibirSaldo(){
        console.log(`Saldo da conta: ${this.numero_conta}: ${this.saldo}`);
    } 

    historico(descricao){
        this.transacoes.push(descricao);
        
    }

    exibirTransacoes() {
        console.log(`Transações da conta ${this.numero_conta}: ${this.transacoes}`);
    }
}

const conta1 = new ContaBancaria(1, 100);
const conta2 = new ContaBancaria(2, 200);

conta1.depositar(100);
conta2.depositar(50);

conta1.sacar(70);
conta2.sacar(80);

conta1.transferir(conta2, 90);
conta2.transferir(conta1, 60);

conta1.exibirSaldo();
conta2.exibirSaldo();

conta1.exibirTransacoes();
conta2.exibirTransacoes();

