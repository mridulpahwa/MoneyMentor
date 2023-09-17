import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

/**
 * Takes a list of objects with a property "date": "MM/DD/YYYY"
 * Sorts the objects according to the dates from most recent to oldest
 */
function sortDatesByClosestToOldest(dateArray) {
  // Convert date strings to Date objects
  const dateObjects = dateArray.map((dateString) => {
    const [month, day, year] = dateString.date.split("/");
    // JavaScript uses 0-based indexing for months, so subtract 1 from the month

    element = dateString;
    element.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return element;
  });

  // Sort the Date objects
  dateObjects.sort((a, b) => b.date - a.date);

  // Convert sorted Date objects back to date strings
  const sortedDateStrings = dateObjects.map((date) => {
    const month = (date.date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.date.getDate().toString().padStart(2, "0");
    const year = date.date.getFullYear();
    element = date;
    element.date = `${month}/${day}/${year}`;
    return element;
  });

  return sortedDateStrings;
}

/**
 * Uses the user's accounts information to generate a budget for
 * their earnings and expenses
 */
function generateBudget(accounts) {
  recurringPayments = "";
  totalRecurring = 0;
  allLoans = "";
  loanAmountMonthly = 0;
  loanAmountTotal = 0;

  balance = 0;
  rewards = 0;
  income = 0;
  spendings = 0;

  for (i = 0; i < accounts.length; i++) {
    balance += accounts[i].balance;
    rewards += accounts[i].points;

    for (j = 0; j < accounts[i].deposits.length; j++)
      income += accounts[i].deposits[j].amount;

    for (j = 0; j < accounts[i].charges.length; j++)
      spendings += accounts[i].charges[j].amount;
  }

  payments = accounts
    .map((acc) => {
      return acc.bills;
    })
    .flat(1);

  loans = accounts
    .map((acc) => {
      return acc.loans;
    })
    .flat(1);

  for (i = 0; i < payments.length; i++) {
    recurringPayments += `${payments[i].name}, $${payments[i].amount}. `;
    totalRecurring += payments[i].amount;
  }
  recurringPayments = recurringPayments === "" ? "None" : recurringPayments;

  for (i = 0; i < loans.length; i++) {
    allLoans += `${loans[i].name}, Monthly Payment $${loans[i].amountPerMonth}. Total left $${loans[i].remainingAmount}. `;
    loanAmountMonthly += loans[i].amountPerMonth;
    loanAmountTotal += loans[i].remainingAmount;
  }

  allLoans = allLoans === "" ? "None" : allLoans;

  return `
        Generate a budget to cover future expenses and live somewhat comfortably if my situation is as follows:

        Total Balance: $${balance}
        Total Reward Points: ${rewards} points
        Monthly income: $${income}
        Monthly spendings: $${spendings}
        Monthly payments: ${recurringPayments}
        Total monthly payments (not counting loans): $${totalRecurring}
        Loans: ${allLoans}
        Loans next month: $${loanAmountMonthly}
        Total loan amount left (sum of current loans): $${loanAmountTotal}

        Be specific about what I could use each portion of the budget for and how I could still save money using this budget.
        `;
}

/**
 * Similar to generateBudget, but recommends where to
 * cut spending instead
 */
function recommendCuts(accounts) {
  recurringPayments = "";
  totalRecurring = 0;
  allLoans = "";
  loanAmountMonthly = 0;
  loanAmountTotal = 0;

  balance = 0;
  rewards = 0;
  income = 0;
  spendings = 0;

  for (i = 0; i < accounts.length; i++) {
    balance += accounts[i].balance;
    rewards += accounts[i].points;

    for (j = 0; j < accounts[i].deposits.length; j++)
      income += accounts[i].deposits[j].amount;

    for (j = 0; j < accounts[i].charges.length; j++)
      spendings += accounts[i].charges[j].amount;
  }

  payments = accounts
    .map((acc) => {
      return acc.bills;
    })
    .flat(1);

  loans = accounts
    .map((acc) => {
      return acc.loans;
    })
    .flat(1);

  for (i = 0; i < payments.length; i++) {
    recurringPayments += `${payments[i].name}, $${payments[i].amount}. `;
    totalRecurring += payments[i].amount;
  }
  recurringPayments = recurringPayments === "" ? "None" : recurringPayments;

  for (i = 0; i < loans.length; i++) {
    allLoans += `${loans[i].name}, Monthly Payment $${loans[i].amountPerMonth}. Total left $${loans[i].remainingAmount}. `;
    loanAmountMonthly += loans[i].amountPerMonth;
    loanAmountTotal += loans[i].remainingAmount;
  }

  allLoans = allLoans === "" ? "None" : allLoans;

  return `
        Recommend where I can cut corners on my spending habits if my situation is as follows:

        Total Balance: $${balance}
        Total Reward points: ${rewards} points
        Monthly income: $${income}
        Monthly spendings: $${spendings}
        Monthly payments: ${recurringPayments}
        Total monthly payments (not counting loans): $${totalRecurring}
        Loans: ${allLoans}
        Loans next month: $${loanAmountMonthly}
        Total loan amount left (sum of current loans): $${loanAmountTotal}

        Be specific about what I stop/reduce spending on and the steps I need to take to achieve such a goal.
        `;
}

/**
 * Takes the top 5 merchants the user spends at and
 * recommends cheaper alternatives
 */
function cheapAlternatives(accounts) {
  purchases = accounts
    .map((acc) => {
      return acc.charges;
    })
    .flat(1);

  merchants = [];

  for (i = 0; i < purchases.length; i++) {
    if (!merchants.includes(purchases[i].merchant))
      merchants.push(purchases[i].merchant);
  }

  merchantPayments = {};

  for (i = 0; i < merchants.length; i++) merchantPayments[merchants[i]] = 0;

  for (i = 0; i < purchases.length; i++) {
    merchantPayments[purchases[i].merchant] += purchases[i].amount;
  }

  let sortable = [];
  for (var merchant in merchantPayments)
    sortable.push([merchant, merchantPayments[merchant]]);

  sortable = sortable.sort((a, b) => b[1] - a[1]);

  top3Merchants = sortable.slice(0, 3);
  rec = "";
  pay = 0;

  for (i = 0; i < top3Merchants.length; i++) {
    rec += `$${top3Merchants[i][1]} on ${top3Merchants[i][0]}, `;
  }

  return `
      I'm spending ${rec}. Recommend me cheaper alternatives. Be specific on why I should choose those alternatives and approximate how much cheaper they will be
      `;
}

/**
 * Economic plan based on individual balances and rewards
 * on each of the user's accounts
 */
function generalPlan(accounts) {
  balances = "";

  for (i = 0; i < accounts.length; i++) {
    balances += `$${accounts[i].balance} and ${accounts[i].points} reward points in a ${accounts[i].type} account, `;
  }

  return `I have ${balances}. What should I do? Be as specific as you can with what I can do with the money in each account, whether I should move the money around, and what my choices are`;
}

/**
 * Economic advising based on balance and latest charges
 * on each account.
 */
function economicAdvising(accounts) {
  prompt = "";

  for (i = 0; i < accounts.length; i++) {
    expenses = 0;
    recurring = 0;
    expenseList = [];
    recurrentList = [];

    charges = sortDatesByClosestToOldest(accounts[i].charges);
    bills = sortDatesByClosestToOldest(accounts[i].bills);

    for (j = 0; j < Math.min(charges.length, 5); j++) {
      expenses += charges[j].amount;
      expenseList.push(charges[j].merchant);
    }
    for (j = 0; j < Math.min(bills.length, 5); j++) {
      recurring += bills[j].amount;
      recurrentList.push(bills[j].name);
    }

    prompt += `The last ${Math.min(charges.length, 5)} expenses in my ${
      accounts[i].name
    } have been $${expenses} coming from ${expenseList.join(", ")}.
      The latest ${Math.min(bills.length, 5)} recurrent payments in my ${
      accounts[i].name
    } have been $${recurring} coming from ${recurrentList.join(", ")}\n\n`;
  }
  prompt += `Is this wise spending? Please provide specific advise on how to improve my current economic decisions and better manage these ${accounts.length} accounts`;

  return prompt;
}

/**
 * This function should NOT be called on its own
 * Call it once one of the 5 initial functions
 * above were called.
 */
const conversation = async (user, messages) => {
  while (true) {
    prompt = ""; //Do Some input in the page to get the prompt

    nextResponse = await openai.chat.completions
      .create({
        messages: messages,
        model: "gpt-3.5-turbo",
        temperature: 0.4,
      })
      .then((result) => {
        msg = result.choices[0].message.content;
        //Display this as the AI's response

        messages.push(result.choices[0].message);
      });
  }
};

async function dummyFunction(user, func) {
  messages = [
    {
      role: "system",
      content: `
            You are Jeff, a banking assistant and economic advisor.
            The bank expects you to provide flawless advice and perfect budgets, so you cannot afford to make mistakes.
             You are helping Capital One client ${user} improve their economic situation.
             Be professional, but also aim to be as approachable as possible and explain everything in a way the client will understand.
             As a reminder, ${user}'s accounts are as follows:
             ${user.accounts}`,
    },
    {
      role: "user",
      content: func(user.accounts),
    },
  ];

  response = await openai.chat.completions
    .create({
      messages: messages,
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    })
    .then((result) => {
      msg = result.choices[0].message.content;
      //Display this as the AI's response

      messages.push(result.choices[0].message);

      conversation(user, messages);
    });
}
