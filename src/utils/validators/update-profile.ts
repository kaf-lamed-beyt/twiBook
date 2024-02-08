import * as Yup from "yup";

export const updateProfileSchema = Yup.object({
  username: Yup.string().optional(),
  fullname: Yup.string().optional(),
});
