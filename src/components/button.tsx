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
  loading?: boolean;
  loadingText?: string;
  type: "button" | "reset" | "submit";
  fontWeight?: string;
  variant?: string;
  transform?: undefined;
}

export const CustomButton = ({
  background,
  loading,
  children,
  fontSize,
  leftIcon,
  color,
  height,
  width,
  hoverBg,
  rightIcon,
  loadingText,
  onClick,
  type,
  fontWeight,
  variant,
  transform,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      background={background}
      color={color ? color : "#fff"}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      _hover={{ bg: hoverBg }}
      onClick={onClick}
      isLoading={loading}
      loadingText={loadingText}
      fontWeight={fontWeight}
      textTransform={transform ? transform : "capitalize"}
      border={variant === "outline" ? "1px solid #333" : ""}
      height={height ? height : { lg: "60px", base: "40px", md: "45px" }}
      width={width ? width : { lg: "250px", md: "200px", base: "150px" }}
      fontSize={fontSize ? fontSize : { lg: "25px", md: "20px", base: "16px" }}
    >
      {children}
    </Button>
  );
};
