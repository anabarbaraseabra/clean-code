import CurrencyAPI from "./CurrencyAPI";

export default class Account{
    balance: number;

    constructor(readonly currencyAPI: CurrencyAPI){ //readonly - cria a variavel de instancia, evitando de declarar explicitamente a variavel
        this.balance = 0;
    }

    credit(amount: number, currency?: string){
        if(currency){
            amount = this.currencyAPI.convert(amount, currency);            
        }
        this.balance += amount;
    }

    debit(amount: number){
        this.balance -= amount;
    }

    getBalance() {
        return this.balance;
    }
}