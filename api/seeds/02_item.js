/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("item").del();
  await knex("item").insert([
    {
      UserId: 1,
      Item_Name: "Electric Guitar",
      Description: "Gibson",
      Quantity: 10,
    },
    {
      UserId: 2,
      Item_Name: "Electric Guitar",
      Description: "Fender",
      Quantity: 20,
    },
    {
      UserId: 3,
      Item_Name: "Acoustic Guitar",
      Description: "Taylor",
      Quantity: 30,
    },
  ]);
};
