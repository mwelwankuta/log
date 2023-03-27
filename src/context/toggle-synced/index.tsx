import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export interface ToggleSyncedContextValue {
  synced: boolean;
  setSynced: Dispatch<SetStateAction<boolean>>;
}

export const toggleSyncedContext =
  createContext<ToggleSyncedContextValue | null>(null);

export const ToggleSyncedProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [synced, setSynced] = useState(true);

  return (
    <toggleSyncedContext.Provider value={{ synced, setSynced }}>
      {children}
    </toggleSyncedContext.Provider>
  );
};
