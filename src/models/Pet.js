import { Schema } from "mongoose";

export const PetSchema = new Schema(
  {
    name: { type: String, maxlength: 100, required: true },
    imgUrl: { type: String, maxlength: 1000, required: true },
    age: { type: Number, min: 0, max: 5000, required: true },
    likes: [{ type: String, maxlength: 50 }],
    isVaccinated: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ["adopted", "adoptable"] },
    species: { type: String, enum: ["cat", "dog", "bird", "capybara"] },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  },
  {
    toJSON: { virtuals: true },
  }
);

PetSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
