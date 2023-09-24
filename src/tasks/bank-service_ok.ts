/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ❌ refactor and change the tests accordingly

export const TRANSACTION_TYPES = ['DEPOSIT','WITHDRAW', 'TRANSFER','CANCEL']

export const TRANSACTION_CALCULATOR = {
  DEPOSIT: (transaction: Transaction, account: Account): number => account.balance.amount + transaction.value.amount,
  TRANSFER: (transaction: Transaction, account: Account): number => account.balance.amount - transaction.value.amount,
  WITHDRAW: (transaction: Transaction, account: Account): number => account.balance.amount - transaction.value.amount,
  CANCEL: (account: Account): number => account.balance.amount,
}

export const BALANCE_MESSAGES = [
  {
    topValue: 0,
    message: '💸 Bad luck you have no enough '
  },
  {
    topValue: 100,
    message: '💰 Be careful with your spends of '
  },
  {
    topValue: Number.MAX_SAFE_INTEGER,
    message: '🤑 Good! you have a lot of '
  }
]

export class Transaction {
  constructor(
    public readonly accountId: string,
    public readonly transactionType: string,
    public readonly value: Money
  ) { 
    this.value.currency = this.value.currency || DEFAULT_CURRENCY;
    this.isNotInvalidTransaction()
  }

  private isNotInvalidTransaction(): boolean {
    if (TRANSACTION_TYPES.includes(this.transactionType)) {
      const MINIMAL_AMOUNT = 0;
      if (this.value.amount >= MINIMAL_AMOUNT) {
        return true;
      }
    } 
    throw '💥Invalid transaction';
  }
}

export class Money {
  constructor(
    public amount: number,
    public currency?: string
  ) { 
    if (currency === undefined) {
      this.currency = DEFAULT_CURRENCY;
    }
  }
}

const DEFAULT_CURRENCY = 'EUR';

export class Account {
  constructor(
    public readonly accountID: string,
    public readonly balance: Money = { amount: 0, currency: DEFAULT_CURRENCY }
  ) { }
}

export class Accounts {
  private readonly accounts: Account[] = [];

  addAccount(account: Account) {
    this.accounts.push(account);
  }
  
  getById(accountId: string): Account {
    const account = this.accounts.find(a => a.accountID === accountId);
    if (account === undefined) {
      throw '💥Account not found';
    }
    return account;
  }
}

export class BankService {
  private accounts: Accounts = new Accounts();
  constructor() {
    this.accounts.addAccount(new Account('ES99 8888 7777 66 5555555555'));
  }

  addTransaction(transaction: Transaction): string {
    const account = this.accounts.getById(transaction.accountId);
    account.balance.amount = this.executeTransaction(transaction, account);
    return this.getUserFriendlyBalanceMessage(account.balance)
  }

  getReport(accountId: string) {
    const account = this.accounts.getById(accountId);
    const balanceReport = this.getUserFriendlyBalanceMessage(account.balance);
    return `   ${accountId} reported: ${balanceReport}`;
  }

  private executeTransaction(transaction: Transaction, account: Account): number {
    if (transaction.transactionType === "CANCEL") {
      return TRANSACTION_CALCULATOR[transaction.transactionType](account);
    }
    return TRANSACTION_CALCULATOR[transaction.transactionType](transaction, account);
  }

  private getUserFriendlyBalanceMessage(balance: Money): string {
    const userFriendly = BALANCE_MESSAGES.find(m => m.topValue >= balance.amount);
    return userFriendly.message + balance.currency;
  }
}

const accountID = 'ES99 8888 7777 66 5555555555';
const myBank = new BankService();

myBank.addTransaction(new Transaction(accountID, 'DEPOSIT', new Money(89)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'DEPOSIT', new Money(11)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'DEPOSIT', new Money(26)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'WITHDRAW', new Money(98)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'TRANSFER', new Money(1)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'WITHDRAW', new Money(314)));
console.log(myBank.getReport(accountID));
myBank.addTransaction(new Transaction(accountID, 'CANCEL', new Money(0)));
console.log(myBank.getReport(accountID));
