import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponent = makeAnimated();

interface SelectProps {
  placeholder: string;
  options: object[];
  //   onFilter: (month: Month) => void;
}

export const SelectField = ({ options, placeholder }: SelectProps) => {
  return (
    <Select
      components={animatedComponent}
      placeholder={placeholder}
      options={options}
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
