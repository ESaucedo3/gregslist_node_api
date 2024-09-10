import { dbContext } from "../db/DbContext.js";

class PetsService {
  async getPets() {
    const pets = await dbContext.Pets.find();
    return pets;
  }
  async getSpecificPet(petId) {
    const pet = await dbContext.Pets.findById(petId);
    return pet;
  }
  async getFilteredPets(query) {
    const pets = await dbContext.Pets.find(query);
    return pets;
  }
}

export const petsService = new PetsService();
