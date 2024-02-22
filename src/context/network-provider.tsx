import React from "react";
import { useNetworkState } from "@uidotdev/usehooks";
import { useToastContext } from "@hooks/toast";

export interface NetworkProviderProps {
  children: React.ReactNode;
}

export type NetworkContextValues = {
  isOnline: boolean | undefined;
  networkType: string | null;
};

const createNetworkContext = () =>
  React.createContext<NetworkContextValues | null>(null);
export const NetworkContext = createNetworkContext();

export const NetworkStatusProvider = ({ children }: NetworkProviderProps) => {
  const network = useNetworkState();
  const { openToast } = useToastContext();

  const values: NetworkContextValues = React.useMemo(
    () => ({
      isOnline: network.online,
      networkType: network.effectiveType,
    }),
    [network.effectiveType, network.online]
  );

  React.useEffect(() => {
    if (values.isOnline === false) {
      openToast("You're currently offline. Some features won't work", "error");
    } else if (values.isOnline === true) {
      openToast("Back online", "success");
    } else if (
      values.networkType === "slow-2g" ||
      values.networkType === "2g"
    ) {
      openToast("Your internet connection is poor", "warning");
    }
  }, [openToast, values]);

  return (
    <NetworkContext.Provider value={values}>{children}</NetworkContext.Provider>
  );
};
