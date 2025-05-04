const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  const command = vscode.commands.registerCommand('extension.openNotesSidebar', () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder found!');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const notesDir = path.join(rootPath, 'backend', 'notes');

    const noteFiles = fs.existsSync(notesDir)
      ? fs.readdirSync(notesDir).filter(file => file.endsWith('.txt'))
      : [];

    const noteListHTML = noteFiles.map(file => {
      return `<option value="${file}">${file}</option>`;
    }).join('');

    const panel = vscode.window.createWebviewPanel(
      'notesSidebar',
      'LLM Notes',
      vscode.ViewColumn.Two,
      { enableScripts: true }
    );

    panel.webview.html = getWebviewContent(noteListHTML, '');

    panel.webview.onDidReceiveMessage(
      message => {
        const notePath = path.join(notesDir, message.filename);
        if (message.command === 'load') {
          const content = fs.readFileSync(notePath, 'utf-8');
          panel.webview.postMessage({ command: 'loaded', content, filename: message.filename });
        } else if (message.command === 'save') {
          fs.writeFileSync(notePath, message.content, 'utf-8');
          vscode.window.showInformationMessage('Note saved!');
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(command);
}

function getWebviewContent(noteListHTML, noteContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h3>Select a Note</h3>
      <select id="noteDropdown">
        ${noteListHTML}
      </select>
      <br><br>
      <textarea id="noteArea" style="width:100%;height:300px;">${noteContent}</textarea>
      <br>
      <button onclick="saveNote()">💾 Save</button>

      <script>
        const vscode = acquireVsCodeApi();

        const dropdown = document.getElementById('noteDropdown');
        dropdown.addEventListener('change', () => {
          const file = dropdown.value;
          vscode.postMessage({ command: 'load', filename: file });
        });

        function saveNote() {
          const file = dropdown.value;
          const content = document.getElementById('noteArea').value;
          vscode.postMessage({ command: 'save', filename: file, content });
        }

        window.addEventListener('message', event => {
          const message = event.data;
          if (message.command === 'loaded') {
            document.getElementById('noteArea').value = message.content;
          }
        });
      </script>
    </body>
    </html>
  `;
}

module.exports = {
  activate
};
