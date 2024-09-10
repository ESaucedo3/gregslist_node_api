import { petsService } from "../services/PetsService.js";
import BaseController from "../utils/BaseController.js";

export class PetsController extends BaseController {
  constructor() {
    super("api/pets");
    this.router
      .get("", this.getFilteredPets)
      .get("", this.getPets)
      .get("/:petId", this.getSpecificPet);
  }

  async getPets(request, response, next) {
    try {
      const pets = await petsService.getPets();
      response.send(pets);
    } catch (e) {
      next(e);
    }
  }

  async getSpecificPet(request, response, next) {
    try {
      const petId = request.params.petId;
      const pet = await petsService.getSpecificPet(petId);
      response.send(pet);
    } catch (e) {
      next(e);
    }
  }

  async getFilteredPets(request, response, next) {
    try {
      const query = request.query;
      const pets = await petsService.getFilteredPets(query);
      response.send(pets);
    } catch (e) {
      next(e);
    }
  }
}
