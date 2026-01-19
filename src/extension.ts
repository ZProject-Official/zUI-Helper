// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { zuiMethods } from './zui-definitions';
import { templates } from './templates';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('zUI Helper is now active!');

    // Commande pour insérer un template
    const insertTemplateCmd = vscode.commands.registerCommand('zui-helper.insertTemplate', async () => {
        const items = templates.map(t => ({
            label: t.label,
            detail: t.description,
            content: t.content
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Sélectionnez un template zUI à insérer'
        });

        if (selected) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, selected.content);
                });
            }
        }
    });

    // Provider pour l'auto-complétion (IntelliSense)
    const completionProvider = vscode.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            
            // Déclenchement sur 'zUI.' ou 'zUI:'
            // On vérifie le mot précédent
            const wordRange = document.getWordRangeAtPosition(position.translate(0, -1));
            const prevWord = wordRange ? document.getText(wordRange) : '';
            
            if (!linePrefix.trim().endsWith('zUI.') && !linePrefix.trim().endsWith('zUI:')) {
                return undefined;
            }

            return zuiMethods.map(method => {
                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                item.detail = method.detail;
                const doc = new vscode.MarkdownString(method.documentation);
                if (method.example) {
                    doc.appendCodeblock(method.example, 'lua');
                }
                item.documentation = doc;
                return item;
            });
        }
    }, '.', ':');

    // Provider pour l'aide à la signature (paramètres)
    const signatureProvider = vscode.languages.registerSignatureHelpProvider('lua', {
        provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            
            // Cherche 'zUI.NomMethode('
            const match = linePrefix.match(/zUI\.(\w+)\s*\(/);
            if (!match) {
                return undefined;
            }

            const methodName = match[1];
            const methodDef = zuiMethods.find(m => m.label === methodName);

            if (!methodDef) {
                return undefined;
            }

            const doc = new vscode.MarkdownString(methodDef.documentation);
             if (methodDef.example) {
                doc.appendCodeblock(methodDef.example, 'lua');
            }

            const signature = new vscode.SignatureInformation(methodDef.detail, doc);
            signature.parameters = methodDef.parameters.map(p => new vscode.ParameterInformation(p.label, p.documentation));

            // Détermine quel paramètre est actif en comptant les virgules
            const argsPart = linePrefix.substring(match.index! + match[0].length);
            const activeParameter = (argsPart.match(/,/g) || []).length;

            const help = new vscode.SignatureHelp();
            help.signatures = [signature];
            help.activeSignature = 0;
            help.activeParameter = activeParameter;

            return help;
        }
    }, '(', ',');

    // Provider pour le survol (Hover)
    const hoverProvider = vscode.languages.registerHoverProvider('lua', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) { return undefined; }
            
            const word = document.getText(range);
            
            // On vérifie si c'est précédé de zUI.
            const start = range.start;
            if (start.character < 4) { return undefined; } // Trop court pour 'zUI.'

            const prefixRange = new vscode.Range(start.translate(0, -4), start);
            const prefix = document.getText(prefixRange);

            if (prefix !== 'zUI.') {
                return undefined;
            }
            
            const methodDef = zuiMethods.find(m => m.label === word);
            if (!methodDef) { return undefined; }

            const md = new vscode.MarkdownString();
            md.appendCodeblock(methodDef.detail, 'lua');
            md.appendMarkdown(methodDef.documentation);
            if (methodDef.example) {
                md.appendMarkdown('\n\n**Exemple:**');
                md.appendCodeblock(methodDef.example, 'lua');
            }
            
            return new vscode.Hover(md);
        }
    });

    // Provider pour la couleur (Visualisation des strings hex)
    const colorProvider = vscode.languages.registerColorProvider('lua', {
        provideDocumentColors(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ColorInformation[] {
            const text = document.getText();
            const colors: vscode.ColorInformation[] = [];
            
            // Regex pour trouver "#RRGGBB" ou "#RGB"
            const regEx = /["']#([0-9A-Fa-f]{6})["']|["']#([0-9A-Fa-f]{3})["']/g;
            
            let match;
            while ((match = regEx.exec(text))) {
                const startPos = document.positionAt(match.index + 1); // +1 pour sauter la quote
                const endPos = document.positionAt(match.index + match[0].length - 1); // -1 pour la quote de fin
                const hex = match[1] || match[2];
                
                let r, g, b;
                if (hex.length === 6) {
                    r = parseInt(hex.substring(0, 2), 16) / 255;
                    g = parseInt(hex.substring(2, 4), 16) / 255;
                    b = parseInt(hex.substring(4, 6), 16) / 255;
                } else {
                    r = parseInt(hex[0] + hex[0], 16) / 255;
                    g = parseInt(hex[1] + hex[1], 16) / 255;
                    b = parseInt(hex[2] + hex[2], 16) / 255;
                }
                
                colors.push(new vscode.ColorInformation(new vscode.Range(startPos, endPos), new vscode.Color(r, g, b, 1)));
            }
            return colors;
        },
        provideColorPresentations(color: vscode.Color, context: { document: vscode.TextDocument, range: vscode.Range }, token: vscode.CancellationToken): vscode.ColorPresentation[] {
            const r = Math.round(color.red * 255).toString(16).padStart(2, '0');
            const g = Math.round(color.green * 255).toString(16).padStart(2, '0');
            const b = Math.round(color.blue * 255).toString(16).padStart(2, '0');
            const label = `#${r}${g}${b}`.toUpperCase();
            
            return [new vscode.ColorPresentation(label)];
        }
    });

    context.subscriptions.push(insertTemplateCmd, completionProvider, signatureProvider, hoverProvider, colorProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}