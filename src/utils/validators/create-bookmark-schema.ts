// import * as Yup from "yup";

// export const createBookmarkSchema = Yup.object({
//   bookmarkTitle: Yup.string().required("A bookmark title is required"),
//   bookmarkLink: Yup.string().matches(
//     /^(https?:\/\/)?(twitter\.com|x\.com)(\/\w*)*$/,
//     "Invalid link. Links should be from 'https://twitter.com' or 'https://x.com`"
//   ),
// });

// export const createBookmarkSchema_LICENSED = Yup.object({
//   bookmarkTitle: Yup.string().required("A bookmark title is required"),
//   bookmarkLink: Yup.string().required("A book mark link is required"),
// });

import * as Yup from "yup";
import DOMPurify from "dompurify";

export const createBookmarkSchema = Yup.object({
  bookmarkTitle: Yup.string().required("A bookmark title is required"),
  bookmarkLink: Yup.string().matches(
    /^(https?:\/\/)?(twitter\.com|x\.com)(\/\w*)*$/,
    "Invalid link. Links should be from 'https://twitter.com' or 'https://x.com`"
  ),
});

export const createBookmarkSchema_LICENSED = Yup.object({
  bookmarkTitle: Yup.string().required("A bookmark title is required"),
  bookmarkLink: Yup.string().transform((value) => {
    return DOMPurify.sanitize(value);
  }),
});
