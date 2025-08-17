import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const translateCommand = vscode.commands.registerCommand('extension.translateToFuthark', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const sourceCode = editor.document.getText();
        const language = editor.document.languageId;

        let translatedCode = '';
        switch (language) {
            case 'python':
                translatedCode = translatePythonToFuthark(sourceCode);
                break;
            case 'cpp':
                translatedCode = translateCppToFuthark(sourceCode);
                break;
            case 'matlab':
                translatedCode = translateMatlabToFuthark(sourceCode);
                break;
            default:
                vscode.window.showErrorMessage('Unsupported language!');
                return;
        }

        const newDoc = await vscode.workspace.openTextDocument({ content: translatedCode, language: 'plaintext' });
        vscode.window.showTextDocument(newDoc);
    });

    context.subscriptions.push(translateCommand);
}

function translatePythonToFuthark(code: string): string {
    // Implement Python-to-Futhark++ translation logic here
    return `Translated Python code to Futhark++:\n${code}`;
}

function translateCppToFuthark(code: string): string {
    // Implement C++-to-Futhark++ translation logic here
    return `Translated C++ code to Futhark++:\n${code}`;
}

function translateMatlabToFuthark(code: string): string {
    // Implement MATLAB-to-Futhark++ translation logic here
    return `Translated MATLAB code to Futhark++:\n${code}`;
}

export function deactivate() {}