import { useQuery } from "@tanstack/react-query";

export type Plans = {
  id: string | undefined;
  attributes: {
    name: string | undefined;
    price_formatted: string | undefined;
  };
};

const getProducts = async () => {
  const request = await fetch("/api/plans");
  const response = await request.json();

  return response;
};

export const usePricing = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["twibook-plans"],
    queryFn: getProducts,
  });

  const transformed = data?.map((product: Plans) => ({
    planId: product?.id,
    planName: product?.attributes?.name,
    planPrice: product?.attributes?.price_formatted,
  }));

  return {
    error,
    isLoading,
    data: transformed,
  };
};
