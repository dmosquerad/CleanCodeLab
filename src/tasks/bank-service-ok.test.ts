/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */
import { Money } from './bank-service_ok';
import { Transaction } from './bank-service_ok';
import { BankService } from './bank-service_ok';

/*
FEATURE:    Simulate a bank account system.
As a:       customer
I want to:  have an account,
and:        make a deposit or withdraw money,
and:        and get my balance user friendly.
So:         I can control my finances.
*/

describe('GIVEN: I do not have an account in a bank', () => {
  let sut: BankService;
  beforeEach(() => {
    // Arrange
    sut = new BankService();
  });
  describe('WHEN: I make any transaction ', () => {
    test('THEN: I should get an error', () => {
      const expectedErrorMessage = '💥Account not found';
      expect(() => {
        sut.addTransaction(new Transaction('ES00 8888 7777 66 5555555555', 'DEPOSIT', new Money(100)));
      }).toThrowError(expectedErrorMessage);
    });
  });
});

describe('GIVEN: I have an account in a bank', () => {
  let sut: BankService;
  beforeEach(() => {
    // Arrange
    sut = new BankService();
  });
  describe('WHEN: I make an invalid transaction ', () => {
    test('THEN: I should get an error', () => {
      const expectedErrorMessage = '💥Invalid transaction';
      expect(() => {
        sut.addTransaction(new Transaction('ES99 8888 7777 66 5555555555', 'BADNAME', new Money(100)));
      }).toThrowError(expectedErrorMessage);
    });
  });
  describe('WHEN: I make a transaction ', () => {
    beforeEach(() => {
      // Act
      sut.addTransaction(new Transaction('ES99 8888 7777 66 5555555555', 'DEPOSIT', new Money(100)));
    });
    test('THEN: I should get a balance message', () => {
      const expectedBalanceMessage =
        '   ES99 8888 7777 66 5555555555 reported: 💰 Be careful with your spends of EUR';
      let actualBalanceMessage = sut.getReport('ES99 8888 7777 66 5555555555');
      // assert
      expect(actualBalanceMessage).toEqual(expectedBalanceMessage);
    });
  });
});
