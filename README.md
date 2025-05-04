VS Code Code Explainer + Notes Extension
This VS Code extension allows developers to select any code within the editor, get point-wise explanations via an LLM (like OpenAI), and save the explanations as editable notes in a sidebar. The extension helps enhance code understanding by automatically providing insights, making it easier to comprehend and refactor code.

Tech Stack
Extension: JavaScript (VS Code API)

Backend: Python (LLM API to process code)

UI: Webview for sidebar (HTML/CSS)

Notes: Saved locally as .txt files

Workflow
Select code in the VS Code editor.

The extension sends the selected code to a Python backend that processes it via the LLM API and generates an explanation.

The explanation is saved as a .txt note.

The sidebar displays these saved notes in an editable format, allowing users to view and modify them.

This extension helps streamline the coding process by providing context-aware explanations directly in the editor.
