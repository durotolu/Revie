const db = require('../database/dbConfig');
const Apartments = require('./apartments-model');

beforeEach(async () => {
  await db('apartments').truncate();
});

describe('Parks model', () => {
  describe('insert function', () => {

    let apartments;
    test('should insert an apartment', async () => {
      await Apartments.add({
        user_id: "1",
        address: "23, Address",
        city: "Sample City",
        toilets: "2",
        bathrooms: "1",
        bedrooms: "0"
      });
      await Apartments.add({
        user_id: "1",
        address: "4, Sample",
        city: "Another City",
        toilets: "5",
        bathrooms: "6",
        bedrooms: "3",
        sittingroom: true
      });

      apartments = await db('apartments');
      expect(apartments).toHaveLength(2);

      await Apartments.remove(1);

      apartments = await db('apartments');
      expect(apartments).toHaveLength(1);
    });
  });
});