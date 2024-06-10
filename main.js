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

    async function command(cmd) {
        switch (cmd.toLowerCase()) {
            case 'help':
                output(`Available commands:
    - showprojx: Preview some completed favorite projects.
    - currentwork: Preview ongoing projects.
    - archive: most of my work, at least worth mentioning...
                `);
                break;

            case 'showprojx':
                await showProjects('showcase');
                break;

            case 'currentwork':
                output(`ProjectBMO - Creating a real-life BMO from the show Adventure Time with Raspberry Pi, Python, OpenAI, and speech recognition!
    EasyQuestHelper - Skyrim MCM console command mod`);
                break;

            case 'archive':
                await showProjects('archive');
                break;

            default:
                output(`Command not recognized: ${cmd}\nPlease type HELP for assistance.`);
                break;
        }
        scrollToBottom(); // Ensure the terminal scrolls to the bottom after command output
    }

    function output(text) {
        const pre = document.createElement('pre');
        pre.innerHTML = text;
        outputElement.appendChild(pre);
        scrollToBottom(); // Scroll to the bottom after adding new content
    }

    function clearOutput() {
        outputElement.innerHTML = ''; // Clear terminal output
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    async function showProjects(type) {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            let projectOutput = '';

            data.projects.forEach(project => {
                if ((type === 'showcase' && project.showcase) || type === 'archive') {
                    projectOutput += `
<h3>${project.title}</h3>
<p>${project.description}</p>
<a href="${project.link}" target="_blank">View Project</a><br><br>
                    `;
                }
            });

            output(projectOutput);
        } catch (error) {
            console.error('Error loading projects:', error);
            output('Error loading projects. Please try again later.');
        }
    }
});