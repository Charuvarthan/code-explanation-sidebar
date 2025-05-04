# VS Code Code Explainer + Notes Extension

This VS Code extension enables developers to select code within the editor, receive pointwise explanations through an LLM (like OpenAI), and save the explanations as editable notes in a sidebar. It aims to improve code understanding, refactoring, and productivity.

### Tech Stack
- **Extension**: JavaScript (VS Code API)
- **Backend**: Python (LLM API for code explanation)
- **UI**: Webview for sidebar (HTML/CSS)
- **Notes**: Saved locally as `.txt` files

### Workflow
1. **Select code** in the VS Code editor.
2. The extension sends the selected code to the Python backend, which processes it through an LLM API and generates a pointwise explanation.
3. The explanation is saved locally as a `.txt` file.
4. A sidebar displays these notes, allowing users to edit and save changes.

This extension enhances the development workflow by providing instant code explanations and context, helping users understand and improve their code directly in VS Code.

### Usage
1. Install the extension in VS Code.
2. Select a block of code and choose the option to save the explanation to notes.
3. View, edit, and save the notes in the sidebar.

### Future Improvements
- Support for additional programming languages.
- Enhanced UI features for better note organization.

