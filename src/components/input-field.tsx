import { Input, Text } from "@chakra-ui/react";
import { useField } from "formik";

interface InputFieldProps {
  name: string;
  placeholder: string;
}

export const InputField = ({
  name,
  placeholder,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <Input
        mb=".5em"
        height="50px"
        type="email"
        placeholder={placeholder}
        textOverflow="ellipsis"
        border="1px solid #333"
        _hover={{ border: "1px solid #333" }}
        color="var(--alt-text)"
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
