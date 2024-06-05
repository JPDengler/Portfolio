document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const powerButton = document.getElementById('power-button');
    const terminal = document.getElementById('terminal');
    const terminalBackgroundVideo = document.getElementById('terminal-background-video');
    let powerOn = false; // Track the state of the power button

    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = inputElement.value.trim();
            if (input) {
                output(`> ${input}`); // Output the command
                command(input);
                inputElement.value = '';
                scrollToBottom(); // Ensure the terminal scrolls to the bottom
            }
        }
    });

    powerButton.addEventListener('click', function() {
        if (powerOn) {
            // If power is on, turn it off
            powerButton.src = 'images/ButtonOff.png'; // Change the button image to ButtonOff.png
            terminal.style.display = 'none'; // Hide the terminal
            terminalBackgroundVideo.style.display = 'none'; // Hide the terminal background video
            powerOn = false; // Update power state
            clearOutput(); // Clear the terminal output
        } else {
            // If power is off, turn it on
            powerButton.src = 'images/ButtonOn.png'; // Change the button image to ButtonOn.png
            terminal.style.display = 'block'; // Show the terminal
            terminalBackgroundVideo.style.display = 'block'; // Show the terminal background video
            powerOn = true; // Update power state
            scrollToBottom(); // Ensure the terminal scrolls to the bottom
        }
    });

    function command(cmd) {
        switch (cmd.toLowerCase()) {
            case 'help':
                output(`Available commands:
    - showprojx: Preview some completed favorite projects.
    - currentwork: Preview ongoing projects.
    - archive: most of my work, at least worth mentioning...
                `);
                break;

            case 'showprojx':
                output(`Some recent favorites:
    - CS-330 Final: 3D Rendering of my desk
    - CS-320 Final: Software Test Automation
    - CS-300: Data Structures and Algorithms`);
                break;

            case 'currentwork':
                output(`ProjectBMO - Creating a real-life BMO from the show Adventure Time with Raspberry Pi, Python, OpenAI, and speech recognition!
    EasyQuestHelper - Skyrim MCM console command mod`);
                break;

            case 'archive':
                output(`DARKMODE: XP bar for OUII - Skyrim UI mod`);
                break;

            default:
                output(`Command not recognized: ${cmd}\nPlease type HELP for assistance.`);
                break;
        }
        scrollToBottom(); // Ensure the terminal scrolls to the bottom after command output
    }

    function output(text) {
        const pre = document.createElement('pre');
        pre.textContent = text;
        outputElement.appendChild(pre);
        scrollToBottom(); // Scroll to the bottom after adding new content
    }

    function clearOutput() {
        outputElement.innerHTML = ''; // Clear terminal output
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    //LINKED PROJECTS
    function output(text) {
        const lines = text.split('\n'); // Split the text into individual lines
        lines.forEach(line => {
            const pre = document.createElement('pre');
            if (line.includes('CS-330 Final: 3D Rendering of my desk')) {
                // If the line contains the specific text, replace it with a hyperlink
                line = line.replace('CS-330 Final: 3D Rendering of my desk', '<a href="https://github.com/JPDengler/3D-Rendering-of-my-desk" target="_blank">CS-330 Final: 3D Rendering of my desk</a>');
            }
            if (line.includes('CS-300: Data Structures and Algorithms')) {
                // If the line contains the specific text, replace it with a hyperlink
                line = line.replace('CS-300: Data Structures and Algorithms', '<a href="https://github.com/JPDengler/CS-300" target="_blank">CS-300: Data Structures and Algorithms</a>');
            }
            if (line.includes('CS-320 Final: Software Test Automation')) {
                // If the line contains the specific text, replace it with a hyperlink
                line = line.replace('CS-320 Final: Software Test Automation', '<a href="https://github.com/JPDengler/CS320" target="_blank">CS-320 Final: Software Test Automation</a>');
            }
            if (line.includes('DARKMODE: XP bar for OUII - Skyrim UI mod')) {
                // If the line contains the specific text, replace it with a hyperlink
                line = line.replace('DARKMODE: XP bar for OUII - Skyrim UI mod', '<a href="https://www.nexusmods.com/skyrimspecialedition/mods/119712?tab=description" target="_blank">DARKMODE: XP bar for OUII - Skyrim UI mod</a>');
            }
            pre.innerHTML = line;
            outputElement.appendChild(pre);
        });
        scrollToBottom(); // Scroll to the bottom after adding new content
    }
});
