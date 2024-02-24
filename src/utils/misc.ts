import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const authCookieOptions = {
  path: "/",
  maxAge: 60 * 6 * 24,
};

export const authProviderFromSignIn = getCookie("_prov");

export const dateFromNow = (value: string) => {
  return dayjs(value).fromNow();
};

export const Quotas = {
  FREE: 10,
  BASIC: 50,
  PRO: 150,
};

export const lastUpdated = dayjs("02/16/2024").format("MMM DD, YYYY");

export const LEMSQUEEZY_BASE_ENDPOINT = "api.lemonsqueezy.com/v1/";
export const REQUEST_HEADERS = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${process.env.LEMSQUEEZY_KEY}`,
};

export const extractTweetIdFromLink = (link: string) => {
  const id = link.split("/status/")[0];

  return id;
};

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const waitlist = (
//   <Box
//     height="fit-content"
//     width="fit-content"
//     px=".6em"
//     py=".6em"
//     background="var(--eerie-black)"
//     border="1px solid var(--matte-black)"
//     pb="1.4em"
//     borderRadius="6px"
//   >
//     <Text py=".5em" fontSize="x-large">
//       Join Private beta
//     </Text>
//     <Text pb="1em" fontSize="15px" color="var(--alt-text)">
//       Please enter your email. You'll receive an invite soon.
//     </Text>

//     <Box mb=".6em">
//       <Formik
//         initialValues={{ email: "" }}
//         validationSchema={signInSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           await onRequestInvite(values.email);
//           setSubmitting(false);
//         }}
//       >
//         {(formik) => (
//           <Form>
//             <Box>
//               <InputField type="email" name="email" placeholder="email" />

//               <Box mt="1.4em">
//                 <CustomButton
//                   type="submit"
//                   height="50px"
//                   width="100%"
//                   fontSize="16px"
//                   fontWeight="normal"
//                   background="var(--true-purple)"
//                   hoverBg="var(--true-purple)"
//                   loading={formik.isSubmitting}
//                 >
//                   Request an Invite
//                 </CustomButton>
//               </Box>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   </Box>
// );
