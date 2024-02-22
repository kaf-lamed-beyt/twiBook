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
  const [prevIsOnline, setPrevIsOnline] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (prevIsOnline !== undefined && prevIsOnline !== network.online) {
      if (network.online === false) {
        openToast(
          "You're currently offline. Some features won't work",
          "error"
        );
      } else if (network.online === true) {
        openToast("Back online", "success");
      } else if (
        network.effectiveType === "slow-2g" ||
        network.effectiveType === "2g"
      ) {
        openToast("Your internet connection is poor", "warning");
      }
    }
    setPrevIsOnline(network.online);
  }, [network.online, openToast, network.effectiveType, prevIsOnline]);

  return (
    <NetworkContext.Provider
      value={{ isOnline: network.online, networkType: network.effectiveType }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
