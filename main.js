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
                output(`Some recent favorites:

CS-330 Final: 3D Rendering of my desk
CS-320 Final: Software Test Automation
CS-300: Data Structures and Algorithms
                `);
                break;

            case 'currentwork':
                output(`ProjectBMO - Creating a real life BMO
                from the show Adventure Time with RaspyberryPI,
                Python, OpenAI, and speech recongition!
                `);
                
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