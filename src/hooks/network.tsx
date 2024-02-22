import {
  NetworkContext,
  NetworkContextValues,
} from "@context/network-provider";
import React from "react";

export const useNetwork = () => {
  const context = React.useContext(NetworkContext);

  if (context === null) {
    throw new Error(
      "Network context is missing. You probably forgot to wrap the component depending on the network status in <NetworkProvider />"
    );
  }

  return context as NetworkContextValues;
};
