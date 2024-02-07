import { Input, Text } from "@chakra-ui/react";
import { useField } from "formik";

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
        _placeholder={{ color: "var(--alt-text)" }}
        textOverflow="ellipsis"
        border="1px solid #333"
        color="var(--alt-text)"
        _hover={{ border: "1px solid #333" }}
        _focusVisible={{
          border: "2px solid var(--true-purple)",
          background: "none",
        }}
        className={meta.touched && meta.error ? "shake" : ""}
        {...props}
        {...field}
      />

      {meta.touched && meta.error ? (
        <Text color="var(--danger)" fontSize="sm" mb="1em">
          {meta.error}
        </Text>
      ) : null}
    </>
  );
};
