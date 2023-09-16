import { atom } from "jotai";

export const accountsAtom = atom([]);
export const users = atom([]);

export const customersAtom = atom([]);
export const accountAtom = atom({
  id: 1,
  name: "John Doe",
  balance: 1000,
  points: 240348,
});

export const balanceAtom = atom((get) => get(accountAtom).balance);
export const pointsAtom = atom((get) => get(accountAtom).points);
export const lastExpenseAtom = atom(0);
export const cardTypeAtom = atom("debit");
export const cardNicknameAtom = atom("guh");
export const customerIdAtom = atom("1234");

export const loansAtom = atom((get) => get(accountAtom)?.loans || []);
