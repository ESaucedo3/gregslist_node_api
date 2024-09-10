import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

class PetsService {
  async getPets() {
    const pets = await dbContext.Pets.find();
    return pets;
  }
  async getSpecificPet(petId) {
    const pet = await dbContext.Pets.findById(petId).populate("creator");
    if (pet === null) {
      throw new BadRequest(`No pet was found with an id of ${petId}`);
    }

    return pet;
  }
  async getFilteredPets(query) {
    const sortBy = query.sort;
    delete query.sort;

    const pageNumber = parseInt(query.page) || 1;
    const limitAmount = 5;
    const skipAmount = (pageNumber - 1) * limitAmount;
    delete query.page;

    const pets = await dbContext.Pets.find(query)
      .sort(sortBy)
      .skip(skipAmount)
      .limit(limitAmount)
      .populate("creator");

    const petCount = await dbContext.Pets.countDocuments(query);
    return {
      results: pets,
      count: petCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(petCount / limitAmount),
    };
  }
}

export const petsService = new PetsService();
