import * as Yup from "yup";

export const createBookmarkSchema = Yup.object({
  bookmarkTitle: Yup.string().required("A bookmark title is required"),
  bookmarkLink: Yup.string().matches(
    /^(https?:\/\/)?(twitter\.com|x\.com)(\/\w*)*$/,
    "Invalid link. Links should be from 'https://twitter.com' or 'https://x.com`"
  ),
});
