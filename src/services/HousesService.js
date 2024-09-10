import { dbContext } from "../db/DbContext.js";

class HousesService {
  async getFilteredHouses(query) {
    const sortBy = query.sort;
    delete query.sort;
    const houses = await dbContext.Houses.find(query).sort(sortBy);
    return houses;
  }
  async getSpecificHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId);
    return house;
  }
  async getHouses() {
    const houses = await dbContext.Houses.find();
    return houses;
  }
}

export const housesService = new HousesService();
