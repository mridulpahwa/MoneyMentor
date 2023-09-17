export const accounts = [
  {
    id: 1,
    balance: 900,
    points: 880,
    creditScore: 3.3,
    type: "credit",
    name: "Credit card",
    bills: [
      {
        date: "09/14/2023",
        amount: 30,
        name: "Amazon Prime",
        recurring: true,
      },
      {
        date: "09/14/2023",
        amount: 15,
        name: "Hulu",
        recurring: true,
      },
      {
        date: "09/14/2023",
        amount: 30,
        name: "Disney+",
        recurring: true,
      },
    ],
    deposits: [
      {
        id: 0,
        amount: 330,
        name: "Paycheck",
        date: "09/01/2023",
      },
      {
        id: 1,
        amount: 50,
        name: "Zelle from brother",
        date: "09/04/2023",
      },
      {
        id: 0,
        amount: 10,
        name: "Thanks for the favor",
        date: "09/08/2023",
      },
      {
        id: 2,
        amount: 1000,
        name: "Thanks for vacation ;)",
        date: "09/12/2023",
      },
    ],
    charges: [
      {
        id: 0,
        amount: 8,
        merchant: "Starbucks",
        date: "09/16/2023",
      },
      {
        id: 1,
        amount: 23,
        merchant: "McDonalds",
        date: "09/16/2023",
      },
      {
        id: 2,
        amount: 6,
        merchant: "Starbucks",
        date: "09/15/2023",
      },
      {
        id: 3,
        amount: 1300,
        merchant: "Apple",
        date: "09/13/2023",
      },
    ],
    loans: [
      {
        id: 1,
        name: "Micro loan",
        totalAmount: 78,
        from: "Bank of America",
        remainingAmount: 30,
        amountPerMonth: 1,
      },
      {
        id: 2,
        name: "Student loan for college",
        totalAmount: 100000,
        from: "FIU",
        remainingAmount: 80000,
        amountPerMonth: 500,
      },
      {
        id: 3,
        totalAmount: 5000,
        from: "Credit Union",
        name: "Credit Union Loan",
        remainingAmount: 3000,
        amountPerMonth: 30,
      },
    ],
  },
  {
    id: 2,
    balance: 1800,
    points: 1880,
    type: "savings",
    name: "Savings account",
    bills: [
      {
        date: "09/10/2023",
        amount: 300,
        name: "Insurance Premium",
        recurring: true,
      },
    ],
    loans: [],
    deposits: [
      {
        id: 0,
        amount: 1000,
        name: "Deposit for savings",
        date: "08/30/2023",
      },
      {
        id: 2,
        amount: 1200,
        name: "Deposit for savings",
        date: "09/05/2023",
      },
    ],
    charges: [
      {
        date: "09/11/2023",
        amount: 15,
        merchant: "Netflix",
      },
    ],
  },
  {
    id: 3,
    balance: 4000,
    points: 5000,
    creditScore: 5.0,
    type: "checkings",
    name: "Debit card",
    bills: [
      {
        date: "09/06/2023",
        amount: 200,
        merchant: "Sony",
      },
    ],
    loans: [],
    charges: [],
    deposits: [
      {
        id: 0,
        amount: 50,
        name: "Transfer",
        date: "09/02/2023",
      },
      {
        id: 1,
        amount: 100,
        name: "Amount owed from party",
        date: "09/07/2023",
      },
      {
        id: 2,
        amount: 235,
        name: "Payment for helping with party",
        date: "09/14/2023",
      },
    ],
  },
];

export const customers = [
  {
    id: 1,
    name: "Hunter Biden",
    accounts: accounts,
  },
  {
    id: 2,
    name: "!Biden",
    accounts: accounts,
  },
];

const charges = [];

function calculateTotal(charges) {
  let total = 0;
  for (const charge of charges) {
    total += charge.amount;
  }
  return total;
}

function deleteAccount(accountId) {
  const index = accounts.findIndex((account) => account.id === accountId);
  if (index !== -1) {
    accounts.splice(index, 1);
    return true;
  }
  return false;
}
// for example this method could be called: deleteAccount(1);

const totalAmount = calculateTotal(charges);
console.log(`Total Amount: $${totalAmount.toFixed(2)}`);
