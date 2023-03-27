import { parse } from "node:path";
import { platform } from "node:os";
import { PackageListEntry } from "@/modules/package-list/components/sde-bar/list-item";

/**
 * turns json objects to `PackageListEntry`
 * @param data
 * @returns safe package list data
 */
export const parseAsPackage = (data: object) => {
  return JSON.parse(JSON.stringify({ ...data })) as PackageListEntry;
};

export const extractProjectDirectory = (filePath: string) => {
  return parse(filePath).dir;
};

/**
 * @param filePath
 * @returns
 */
export const projectName = (filePath: string) => {
  const projectDir = extractProjectDirectory(filePath);
  for (let index = projectDir.length; index > 0; index--) {
    const pathChar = "/";
    const winPathChar = "\\";
    if (platform() == "win32" && projectDir[index] == winPathChar)
      return projectDir.slice(index + 1, projectDir.length);
    else if (projectDir[index] == pathChar)
      return projectDir.slice(index + 1, projectDir.length);
  }
};
