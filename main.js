document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = inputElement.value.trim();
            command(input);
            inputElement.value = '';
        }
    });

    function command(cmd) {
        switch (cmd.toLowerCase()) {
            case 'help':
                output(`
Available commands:
- showprojx: Preview some completed favorite projects.
                `);
                break;
            case 'showprojx':
                output(`
Project 1: Description of project 1...
Project 2: Description of project 2...
Project 3: Description of project 3...
                `);
                break;
            default:
                output(`Command not recognized: ${cmd}\nPlease type HELP for assistance.`);
                break;
        }
    }

    function output(text) {
        const pre = document.createElement('pre');
        pre.textContent = text;
        outputElement.appendChild(pre);
        window.scrollTo(0, document.body.scrollHeight);
    }
});