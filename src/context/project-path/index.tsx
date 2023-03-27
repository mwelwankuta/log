import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface ProjectPathContextValues {
  packageJsonFile: File | null;
  setPackageJsonFile: Dispatch<SetStateAction<File | null>>;
}

export const projectPathContext =
  createContext<ProjectPathContextValues | null>(null);

export const ProjectPathProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [packageJsonFile, setPackageJsonFile] = useState<File | null>(null);

  useEffect(() => {
    const storedProjectFile = localStorage.getItem("packageJsonFile");
    if (storedProjectFile) {
      console.log(storedProjectFile);
      setPackageJsonFile(JSON.parse(storedProjectFile));
    }
  }, []);

  return (
    <projectPathContext.Provider
      value={{ packageJsonFile, setPackageJsonFile }}
    >
      {children}
    </projectPathContext.Provider>
  );
};
