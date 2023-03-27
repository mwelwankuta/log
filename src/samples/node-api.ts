import { PackageListEntry } from "@/modules/package-list/components/sde-bar/list-item";
import { extractProjectDirectory, parseAsPackage } from "@/utils";
import { ipcRenderer, shell } from "electron";
import { readFileSync, writeFileSync } from "node:fs";
import { lstat } from "node:fs/promises";
import { cwd } from "node:process";
import { execSync } from "node:child_process";

ipcRenderer.on("main-process-message", (_event, ...args) => {
  console.log("[Receive Main-process message]:", ...args);
});

lstat(cwd())
  .then((stats) => {
    console.log("[fs.lstat]", stats);
  })
  .catch((err) => {
    console.error(err);
  });

interface PackageDependencyList {
  dependencies: [string, string];
  devDependencies: [string, string];
}
/**
 * returns json formatted package json file
 * @param path to json file
 */
export const readPackageJsonFile = (path: string): PackageDependencyList => {
  const jsonFIle = JSON.parse(readFileSync(path, { encoding: "utf8" }));
  return {
    dependencies: jsonFIle.dependencies ?? parseAsPackage({}),
    devDependencies: jsonFIle.devDependencies ?? parseAsPackage({}),
  };
};

/**
 * removes package from package.json file
 * @param path of package.json
 * @param package to uninstall
 */
export const deleteFromPackageJsonFile = (
  path: string,
  packageName: string,
  isDevDependency: boolean
) => {
  const jsonFile = JSON.parse(readFileSync(path, { encoding: "utf8" }));
  if (isDevDependency) {
    delete jsonFile.devDependencies[packageName];
  }
  delete jsonFile.dependencies[packageName];
  writeFileSync(path, JSON.stringify(jsonFile));
};

/**
//  * installs includes dependencies to package json file and runs npm install
 * @param dependency i.e typescript@5
 * @param path to package.json file
 * @param isDevDependency 
 */
export const addToPackageJsonFile = (
  dependency: PackageListEntry,
  path: string,
  isDevDependency: boolean
) => {
  let jsonFile = JSON.parse(
    readFileSync(path, { encoding: "utf8" })
  ) as PackageDependencyList;

  if (isDevDependency) {
    jsonFile = {
      ...jsonFile,
      devDependencies: {
        ...jsonFile.devDependencies,
        [dependency[0]]: dependency[1],
      },
    };
  } else {
    jsonFile = {
      ...jsonFile,
      dependencies: {
        ...jsonFile.dependencies,
        [dependency[0]]: dependency[1],
      },
    };
  }
  writeFileSync(path, JSON.stringify(jsonFile, null, 2));
};

export const installPackageJsonDependencies = (path: string) => {
  return new Promise((resolve, reject) => {
    const projectDir = extractProjectDirectory(path);
    try {
      execSync(`npm install`, {
        cwd: projectDir,
        encoding: "utf8",
      }).toString();
      resolve("installing");
    } catch (error) {
      reject(error);
    }
  });
};

export const openProjectDirectory = (path: string) => {
  const directory = extractProjectDirectory(path);
  console.log("opening", directory);

  shell.openPath(directory);
};
