import {
  projectPathContext,
  ProjectPathContextValues
} from "@/context/project-path";
import { Input, InputProps } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";

interface FileInputProps extends InputProps {
  showPicker: boolean;
}

export const ProjectPicker: React.FC<FileInputProps> = (props) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const { setPackageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;

  useEffect(() => {
    if (filePickerRef.current && props.showPicker == true) {
      filePickerRef.current.webkitdirectory = true;
      filePickerRef.current?.click();
    }
  }, [props.showPicker]);

  return (
    <Input
      {...props}
      type="file"
      ref={filePickerRef}
      display="none"
      onChange={(e) => {
        const files = Object.values(e.target.files as unknown as FileList);
        const packageJsonFile = files.find(
          (file) => file.name == "package.json"
        ) as File;
        setPackageJsonFile(packageJsonFile);

        const jsonFile = {
          path: packageJsonFile?.path,
          name: packageJsonFile?.name,
          type: packageJsonFile?.type,
        };

        localStorage.setItem("packageJsonFile", JSON.stringify(jsonFile));
      }}
    />
  );
};
