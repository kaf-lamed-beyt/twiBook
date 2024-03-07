import { Text } from "@chakra-ui/react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useUser } from "@hooks/user";

const animatedComponent = makeAnimated();

interface SelectProps {
  placeholder: string;
  options: any[];
  onChange: (selectedOption: any) => void;
}

export const SelectField = ({
  options,
  placeholder,
  onChange,
}: SelectProps) => {
  const { twib } = useUser();

  return (
    <Select
      components={animatedComponent}
      placeholder={placeholder}
      options={options}
      noOptionsMessage={() => (
        <Text color="var(--alt-text)">No options found</Text>
      )}
      onChange={onChange}
      isDisabled={
        twib?.has_license === false && twib?.license_type === "free"
          ? true
          : false
      }
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          margin: ".6em 0",
          height: "50px",
          border: "1px solid var(--matte-black)",
          backgroundColor: "var(--eerie-black)",
          textTransform: "capitalize",
          "&:hover": {
            cursor: "pointer",
            border: "2px solid var(--matte-black)",
          },
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "var(--alt-text)",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "var(--alt-text)",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "var(--eerie-black)",
          borderBottom: "1px solid var(--matte-black)",
          color: "var(--alt-text)",
          margin: ".3em 0",
          padding: ".3em .3em",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          transition: "all .3s ease-in-out",
          textTransform: "capitalize",
          "&:hover": {
            cursor: "pointer",
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: "15px",
          color: "var(--alt-text)",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          padding: ".4em .6em",
          backgroundColor: "var(--eerie-black)",
          border: "1px solid var(--matte-black)",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid var(--matte-black)",
        }),
      }}
    />
  );
};
