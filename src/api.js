const url = "http://api.nessieisreal.com";
const key = "e9ff106632fa3ebb226a3f127c4a3e75";

/**
 * @returns {Promise<Array>} - An array of accounts
 */
export async function getAccounts() {
  const req = await fetch(`${url}/accounts`);
  return await req.json();
}
