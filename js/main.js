document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const powerButton = document.getElementById('power-button');
    const terminal = document.getElementById('terminal');
    const terminalBackgroundVideo = document.getElementById('terminal-background-video');
    const backgroundVideo = document.getElementById('background-video');
    let powerOn = false; // Track the state of the power button
    let lightsOn = false; // Track the state of the lights

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
    - archive: most of my work, at least worth mentioning...
    - lights: Toggle lights on and off
                `);
                break;

            case 'showprojx':
                await showProjects('showcase');
                break;

            case 'archive':
                await showProjects('archive');
                break;

            case 'lights':
                toggleLights();
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
            console.log(`Fetching projects.json for ${type}`);
            const response = await fetch('ALT/projects.json'); // Adjust the path to the correct location of projects.json
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Projects data:', data);
            let projectOutput = '';

            data.projects.forEach(project => {
                if ((type === 'showcase' && project.showcase) || type === 'archive') {
                    projectOutput += `
<pre>${project.title}</pre>
<pre>${project.description}</pre>
<a href="${project.link}" target="_blank">View Project</a>
                    `;
                }
            });

            output(projectOutput);
        } catch (error) {
            console.error('Error loading projects:', error);
            output(`Error loading projects: ${error.message}`);
        }
    }

    // Flicker effect
    function flickerButton() {
        const flickerImages = ['images/FLICKER1.png', 'images/FLICKER2.png'];
        const originalImage = powerButton.src.includes('ButtonOn') ? 'images/ButtonOn.png' : 'images/ButtonOff.png';

        // Randomly select a flicker image
        const flickerImage = flickerImages[Math.floor(Math.random() * flickerImages.length)];
        powerButton.src = flickerImage;

        // After a brief moment, revert to the original image
        setTimeout(() => {
            powerButton.src = originalImage;
        }, 100); // Flicker duration - adjust this value to change the duration of the flicker
    }

    // Set an interval for the flicker effect to happen randomly
    setInterval(() => {
        if (Math.random() < 0.5) { // Probability to flicker - adjust this value to change the frequency of flickers
            flickerButton();
        }
    }, 500); // Interval to check for flicker - adjust this value to change how often it checks for flickering

    // Toggle lights
    function toggleLights() {
        if (lightsOn) {
            backgroundVideo.src = 'images/LightsOff.mp4';
        } else {
            backgroundVideo.src = 'images/LightsOn.mp4';
        }
        lightsOn = !lightsOn;
        backgroundVideo.load();
        backgroundVideo.play();
    }
});