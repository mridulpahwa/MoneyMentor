import { atom } from "jotai";
import { customers } from "./api";
export const customersAtom = atom(customers);
export const customerAtom = atom((get) => get(customersAtom)[0]);

export const accountsAtom = atom((get) => get(customerAtom).accounts);

export const accountsIndexAtom = atom(0);
export const accountAtom = atom((get) =>
  get(accountsAtom).at(get(accountsIndexAtom))
);

export const balanceAtom = atom((get) => get(accountAtom).balance);
export const pointsAtom = atom((get) => get(accountAtom).points);
export const lastExpenseAtom = atom((get) => get(accountAtom).charges[0]);
export const cardTypeAtom = atom((get) => get(accountAtom)?.type);
export const cardNicknameAtom = atom((get) => get(accountAtom).name);
export const customerIdAtom = atom((get) => get(accountAtom).id);

export const accountDepositsAtom = atom((get) => get(accountAtom).deposits);
export const accountSpendingAtom = atom((get) => {
  const acc = get(accountAtom);
  return [...acc.charges, ...acc.bills];
});

export const loansAtom = atom((get) => get(accountAtom)?.loans || []);

export const gptFuncAtom = atom(null);
