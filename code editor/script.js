document.addEventListener("DOMContentLoaded", () => {

    // Prism.js library for syntax highlighting
    const codeInput = document.getElementById('code-input');
    const codeOutput = document.getElementById('code-output');
    const lineNumbers = document.getElementById('line-numbers');
    const errorList = document.getElementById('error-list');
    const runButton = document.getElementById('run-btn'); // Button to run code

    // Check if required elements are present
    if (!codeInput || !codeOutput || !lineNumbers || !errorList) {
        console.error('One or more required elements are missing from the HTML');
        return; // Stop execution if elements are missing
    }

    // Initialize code editor with Monaco
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });
    require(['vs/editor/editor.main'], () => {
        const editor = monaco.editor.create(codeInput, {
            value: '', // Start with empty code
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
        });

        // Update output and error list on content change
        editor.onDidChangeModelContent(() => {
            const code = editor.getValue();
            // Highlight the code
            try {
                const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                codeOutput.innerHTML = highlightedCode;

                // Update line numbers
                const lines = code.split('\n');
                lineNumbers.innerHTML = '';
                lines.forEach((line, index) => {
                    const lineNumber = document.createElement('div');
                    lineNumber.textContent = index + 1;
                    lineNumbers.appendChild(lineNumber);
                });

                // JSHint for error correction
                const isValid = JSHINT(code);
                const errors = JSHINT.errors;
                if (errors.length > 0) {
                    const errorListItems = errors.map((error) => {
                        return `<li>Line ${error.line}: ${error.reason}</li>`;
                    });
                    errorList.innerHTML = `<ul>${errorListItems.join('')}</ul>`;
                } else {
                    errorList.innerHTML = '';
                }
            } catch (error) {
                console.error('Error processing code:', error);
            }
        });

        // Run code on button click
        runButton.addEventListener('click', () => {
            const code = editor.getValue();
            try {
                // Clear previous output
                codeOutput.innerHTML = '';

                // Use console.log to capture output
                const oldConsoleLog = console.log;
                console.log = function (message) {
                    codeOutput.innerHTML += message + '<br>';
                    oldConsoleLog.apply(console, arguments);
                };

                // Execute the code
                eval(code);
                
                // Restore original console.log
                console.log = oldConsoleLog;
            } catch (error) {
                codeOutput.innerHTML = 'Error: ' + error.message;
            }
        });
    });
});
