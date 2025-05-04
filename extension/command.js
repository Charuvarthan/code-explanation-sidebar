const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.explainCode', function () {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      if (!selectedText) {
        vscode.window.showInformationMessage('Please select some code.');
        return;
      }

      const pythonScriptPath = path.join(__dirname, '../backend/llm.py');
      const escapedCode = selectedText.replace(/"/g, '\\"').replace(/\n/g, '\\n');

      exec(`python "${pythonScriptPath}" "${escapedCode}"`, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          vscode.window.showErrorMessage(`stderr: ${stderr}`);
          return;
        }
        vscode.window.showInformationMessage('Explanation saved to notes!');
      });
    }
  });

  context.subscriptions.push(disposable);
}

module.exports = {
  activate
};
