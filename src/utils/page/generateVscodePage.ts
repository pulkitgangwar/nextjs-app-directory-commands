import * as vscode from "vscode";
import * as path from "path";
import { getTemplate } from "./getTemplate";

export async function generateVscodePage(directoryPath: string, file: string) {
  const filePath = vscode.Uri.file(path.join(directoryPath, `/${file}`));
  await vscode.workspace.fs.writeFile(
    filePath,
    Buffer.from(getTemplate(file).trim())
  );

  return;
}
