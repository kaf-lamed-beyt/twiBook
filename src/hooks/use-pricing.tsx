import React from "react";
import { useQuery } from "@tanstack/react-query";

export type Plans = {
  id: string | undefined;
  attributes: {
    name: string | undefined;
    price_formatted: string | undefined;
  };
};

export type Variants = {
  id: string | undefined;
  attributes: {
    product_id: string | undefined;
  };
};

const getProducts = async () => {
  const request = await fetch("/api/plans");
  const response = await request.json();

  return response;
};

const getVariants = async () => {
  const request = await fetch("/api/variants");
  const response = await request.json();
  return response;
};

export const usePricing = () => {
  const { data: productsData, error: productsError, isLoading: productsLoading } = useQuery({
    queryKey: ["twibook-plans"],
    queryFn: getProducts,
  });

  const [variants, setVariants] = React.useState<Variants[]>([]);

  // Fetch variants only once when the component mounts
  React.useEffect(() => {
    getVariants().then(data => setVariants(data));
  }, []);

  const transformed = productsData?.map((product: Plans) => {
    const variant = variants.find(
      variant =>
        variant.attributes.product_id?.toString() === product.id
    );


    return {
      planId: product.id,
      planName: product.attributes.name,
      planPrice: product.attributes.price_formatted,
      variantId: variant?.id,
    };
  });

  return {
    data: transformed,
    error: productsError,
    isLoading: productsLoading,
  };
};
