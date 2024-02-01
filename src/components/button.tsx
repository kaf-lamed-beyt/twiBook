import React from "react";
import { Button } from "@chakra-ui/react";

interface ButtonProps {
  background: string;
  height?: string;
  width?: string;
  fontSize?: string;
  leftIcon?: React.ReactElement;
  children: React.ReactNode;
  color?: string;
  rightIcon?: React.ReactElement;
  hoverBg: string;
  onClick?: () => void;
}

export const CustomButton = ({
  background,
  children,
  fontSize,
  leftIcon,
  color,
  height,
  width,
  hoverBg,
  rightIcon,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      textTransform="capitalize"
      background={background}
      height={height ? height : { lg: "60px", base: "40px", md: "45px" }}
      width={width ? width : { lg: "250px", md: "200px", base: "150px" }}
      fontSize={fontSize ? fontSize : { lg: "25px", md: "20px", base: "16px" }}
      color={color ? color : "#fff"}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      _hover={{ bg: hoverBg }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
