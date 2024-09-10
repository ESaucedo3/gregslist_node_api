import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super("api/houses");
    this.router
      .get("", this.getFilteredHouses)
      .get("", this.getHouses)
      .get("/:houseId", this.getSpecificHouse);
  }

  async getHouses(request, response, next) {
    try {
      const houses = await housesService.getHouses();
      response.send(houses);
    } catch (e) {
      next(e);
    }
  }

  async getSpecificHouse(request, response, next) {
    try {
      const houseId = request.params.houseId;
      const house = await housesService.getSpecificHouse(houseId);
      response.send(house);
    } catch (e) {
      next(e);
    }
  }

  async getFilteredHouses(request, response, next) {
    try {
      const query = request.query;
      const houses = await housesService.getFilteredHouses(query);
      response.send(houses);
    } catch (e) {
      next(e);
    }
  }
}
