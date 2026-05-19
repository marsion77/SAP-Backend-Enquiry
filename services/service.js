import { Enquiry } from "../models/model.js";

export const saveEnquiry = async (data) => {
  return await Enquiry.create(data);
};