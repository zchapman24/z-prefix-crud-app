/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      First_Name: "Robert",
      Last_Name: "Downey Jr",
      Username: "rdj",
      Password: "iron man",
    },
    {
      id: 2,
      First_Name: "Chris",
      Last_Name: "Evans",
      Username: "steverodgers",
      Password: "captain america",
    },
    {
      id: 3,
      First_Name: "Paul",
      Last_Name: "Rudd",
      Username: "ant",
      Password: "antman",
    },
  ]);
};
