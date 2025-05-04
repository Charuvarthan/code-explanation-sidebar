const command = require('./command');
const webview = require('./webview');

/**
 * Called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  command.activate(context);
  webview.activate(context);
}

/**
 * Called when the extension is deactivated
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
