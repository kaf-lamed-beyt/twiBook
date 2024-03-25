import { Input, Text } from "@chakra-ui/react";
import { useField } from "formik";
import "~styles/globals.scss"

interface InputFieldProps {
  name: string;
  type: string;
  variant?: string;
  placeholder: string;
}

export const InputField = ({
  name,
  type,
  placeholder,
  variant,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <Input
        mb=".5em"
        height="50px"
        type={type}
        variant={variant}
        placeholder={placeholder}
        _placeholder={{ color: "#a09d9d" }}
        textOverflow="ellipsis"
        border="1px solid #333"
        color="#a09d9d"
        _hover={{ border: "1px solid #333" }}
        _focusVisible={{
          border: "2px solid #8e3dff",
          background: "none",
        }}
        className={meta.touched && meta.error ? "shake" : ""}
        {...props}
        {...field}
      />

      {meta.touched && meta.error ? (
        <Text color="rgba(215, 0, 64, 1)" fontSize="sm" mb="1em">
          {meta.error}
        </Text>
      ) : null}
    </>
  );
};
