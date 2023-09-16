const customers = [
  {
    id: 1,
    name: "gih",
  },
];

const customers = [createCustomer(1, 1000, 8, 3.5, "Sam", 500, 100, 200)];

export default customers;

//define the createCustomer function
function createCustomer(
  id,
  balance,
  accounts,
  points,
  creditScore,
  name,
  bills,
  charges,
  loans
) {
  return {
    id,
    accounts,
    balance,
    points,
    creditScore,
    name,
    bills,
    charges,
    loans,
  };
}

//const response = await fetch(`${baseUrl}/${url}?key=${key}`);
//return response.json();
