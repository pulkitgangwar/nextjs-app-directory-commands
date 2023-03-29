import * as vscode from "vscode";
import * as promisedFs from "fs/promises";

export async function getProjectInfo() {
  const files = await vscode.workspace.findFiles(
    "**/package.json",
    "**/node_modules/**"
  );

  console.log(files);

  if (!files.length) {
    return;
  }

  let project: { rootPath: string; typescriptEnabled: boolean } = {
    rootPath: "",
    typescriptEnabled: false,
  };

  for await (let file of files) {
    const packageJson = await promisedFs.readFile(file.path, {
      encoding: "utf8",
    });
    const projectConfig: any = await JSON.parse(packageJson);
    if (
      !projectConfig?.dependencies ||
      !Object.keys(projectConfig.dependencies).includes("next")
    ) {
      continue;
    }

    project.rootPath = file.path.split("/package.json")[0];
    project.typescriptEnabled =
      (projectConfig?.devDependencies &&
        Object.keys(projectConfig?.devDependencies).includes("typescript")) ||
      Object.keys(projectConfig.dependencies).includes("typescript");
  }

  if (!project.rootPath) return;

  return project;
}
