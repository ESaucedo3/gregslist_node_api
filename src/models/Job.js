import { Schema } from "mongoose";

export const JobSchema = new Schema(
  {
    company: { type: String, maxlength: 100, required: true },
    jobTitle: { type: String, maxlength: 100, required: true },
    hours: { type: String, min: 1, max: 168, required: true },
    rate: { type: Number, min: 1, max: 100000000, required: true },
    imgUrl: { type: String, maxlength: 500, required: true },
    description: { type: String, maxlength: 500 },
    creatorId: { type: Schema.ObjectId, required: true, ref: "Account" },
  },
  {
    toJSON: { virtuals: true },
  }
);

JobSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true,
});
