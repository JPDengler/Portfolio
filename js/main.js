document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const powerButton = document.getElementById('power-button');
    const terminal = document.getElementById('terminal');
    const terminalBackgroundVideo = document.getElementById('terminal-background-video');
    let powerOn = false;
    let terminalData = {};
    let hudActive = false;
    let hudElement;

    // Load JSON Data
    fetch('data/terminalInfo.json')
        .then(response => response.json())
        .then(data => terminalData = data)
        .catch(error => console.error('Error loading terminal data:', error));

    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const input = inputElement.value.trim().toLowerCase();
            if (input) {
                output(`> ${input}`);
                processCommand(input);
                inputElement.value = '';
                scrollToBottom();
            }
        }
    });

    powerButton.addEventListener('click', function () {
        if (powerOn) {
            powerButton.src = 'images/ButtonOff.png';
            terminal.style.display = 'none';
            terminalBackgroundVideo.style.display = 'none';
            powerOn = false;
            clearOutput();
        } else {
            powerButton.src = 'images/ButtonOn.png';
            terminal.style.display = 'block';
            terminalBackgroundVideo.style.display = 'block';
            powerOn = true;
            scrollToBottom();
        }
    });

    async function processCommand(cmd) {
        if (cmd === 'help') {
            output(terminalData.help);
        } else if (cmd === 'whois') {
            output(terminalData.whois);
        } else if (cmd === 'exp') {
            output(formatArray(terminalData.experience));
        } else if (cmd === 'edu') {
            output(formatArray(terminalData.education));
        } else if (cmd === 'skills') {
            output(formatSkills(terminalData.skills));
        } else if (cmd === 'awards') {
            output(formatArray(terminalData.awards));
        } else if (cmd === 'showprojx') {
            await showProjects('showcase');
        } else if (cmd === 'archive') {
            await showProjects('archive');
        } else if (cmd === 'blog') {
            outputBlog();
        } else if (cmd === 'hud') {
            toggleHUD();
        } else {
            output(`Command not recognized: ${cmd}\nPlease type HELP for assistance.`);
        }
        scrollToBottom();
    }

    function output(text) {
        const pre = document.createElement('pre');
        pre.innerHTML = wordWrap(text, 70);
        outputElement.appendChild(pre);
        scrollToBottom();
    }

    function clearOutput() {
        outputElement.innerHTML = '';
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    function formatArray(data) {
        return data.map(item => {
            if (item.title) {
                return `* ${item.title} *\n----------------------------------------------------------------------\n@ ${item.company} @\nDURATION: ${item.duration}\nINFO: ${item.description}`;
            }
            if (item.degree) {
                return `* ${item.degree} *\n----------------------------------------------------------------------\n@ ${item.institution} @\nDURATION: ${item.duration}\nGPA: ${item.gpa}`;
            }
            if (item.name) {
                return `🏆 ${item.name} - ${item.year}`;
            }
            return item;
        }).join("\n\n");
    }

    function formatSkills(data) {
        return data.map(category => {
            return `* ${category.category} *\n----------------------------------------------------------------------\n${category.items.join('\n')}`;
        }).join("\n\n");
    }

    async function showProjects(type) {
        try {
            const response = await fetch('ALT/projects.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            let projectOutput = '';

            data.projects.forEach(project => {
                if ((type === 'showcase' && project.showcase) || type === 'archive') {
                    projectOutput += `<pre>${project.title}</pre>\n<pre>${project.description}</pre>\n<a href="${project.link}" target="_blank">View Project</a>\n\n`;
                }
            });

            output(projectOutput || "No projects available.");
        } catch (error) {
            console.error('Error loading projects:', error);
            output(`Error loading projects: ${error.message}`);
        }
    }

    async function outputBlog() {
        try {
            const response = await fetch('https://dev.to/api/articles?username=jpdengler');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const articles = await response.json();
            let blogOutput = 'Here are my latest blog posts from DEV Community:\n';

            articles.slice(0, 5).forEach(article => {
                let wrappedTitle = wordWrap(article.title, 70);
                let wrappedDescription = wordWrap(article.description, 70);
                blogOutput += `\n<a href="${article.url}" target="_blank" class="blog-title">${wrappedTitle}</a>\n${wrappedDescription}\n--------------------------------------------------------------------`;
            });

            output(blogOutput.trim());
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            output(`Error fetching blog posts: ${error.message}`);
        }
    }

    function wordWrap(text, maxWidth) {
        let result = '';
        let lines = text.split('\n');
        lines.forEach(line => {
            while (line.length > maxWidth) {
                let found = false;
                for (let i = maxWidth - 1; i >= 0; i--) {
                    if (line.charAt(i) === ' ') {
                        result += line.slice(0, i) + '\n';
                        line = line.slice(i + 1);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result += line.slice(0, maxWidth) + '\n';
                    line = line.slice(maxWidth);
                }
            }
            result += line + '\n';
        });
        return result;
    }

    // HUD Feature: Toggles real-time GitHub stats, weather, and time
    async function toggleHUD() {
        if (hudActive) {
            if (hudElement) {
                hudElement.remove();
            }
            hudActive = false;
        } else {
            hudElement = document.createElement("div");
            hudElement.id = "hud-overlay";
            document.body.appendChild(hudElement);

            hudActive = true;
            updateHUD();
            setInterval(updateHUD, 60000);
        }
    }

    async function updateHUD() {
        const response = await fetch("data/terminalInfo.json");
        const data = await response.json();

        const githubResponse = await fetch(data.github);
        const github = await githubResponse.json();
        const githubStats = `📦 Repos: ${github.public_repos} | ⭐ Stars: ${github.followers}`;

        const weatherResponse = await fetch(data.weather);
        const weather = await weatherResponse.json();
        const temp = weather.main.temp;
        const condition = weather.weather[0].description;

        const now = new Date();
        const timeString = now.toLocaleTimeString();

        hudElement.innerHTML = `
            <div class="hud-glitch">
                <p>⌚ ${timeString}</p>
                <p>${githubStats}</p>
                <p>🌦️ ${condition}, ${temp}°C</p>
            </div>
        `;
    }
});
