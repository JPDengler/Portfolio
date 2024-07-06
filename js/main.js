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
                output(`> ${input}`);
                command(input);
                inputElement.value = '';
                scrollToBottom(); // Ensure the terminal scrolls to the bottom
            }
        }
    });

    powerButton.addEventListener('click', function() {
        if (powerOn) {
            // If power is on, turn it off
            powerButton.src = 'images/ButtonOff.png'; 
            terminal.style.display = 'none';
            terminalBackgroundVideo.style.display = 'none'; 
            powerOn = false; 
            clearOutput();
        } else {
            // If power is off, turn it on
            powerButton.src = 'images/ButtonOn.png'; 
            terminal.style.display = 'block'; 
            terminalBackgroundVideo.style.display = 'block';
            powerOn = true; 
            scrollToBottom(); 
        }
    });

    async function command(cmd) {
        switch (cmd.toLowerCase()) {
            case 'help':
                output(`Current available commands:
    - whois : who am I?
    - showprojx : Preview some completed favorite projects.
    - archive : Library of most of my publicated work.
    - exp : what experience do I have?
    - edu : where and what have I learned?
    - skills : some of my most used languages and tools.
    - awards : recent accomplishments, mostly academically
    - blog : My latest Dev.to posts
                `);
                break;

            case 'showprojx':
                await showProjects('showcase');
                break;

            case 'archive':
                await showProjects('archive');
                break;

            case 'whois':
                output(`

* Hi, I'm Joey!*
----------------------------------------------------------------------
An entry-level developer with a strong foundation in computer 
science and a passion for creating impactful software solutions. 
I am currently pursuing a degree in Computer Science with a 
concentration in Software Engineering at Southern New Hampshire 
University, where I've consistently excelled academically, 
earning distinctions such as Alpha Sigma Lambda, Dean’s List, 
President’s List, and Honor Roll. I have currently 
and maintained since my beginning maintained a 4.0GPA a verage.
                    
With professional expertise in languages like C++, Java, 
JavaScript, Python, and MySQL, I bring a diverse skill 
set to the table. My experience spans from troubleshooting 
complex electronic systems to developing robust software 
applications. I've worked on various projects, including 
"Project Magpie," this portfolio project, mock app prototypes 
(key components of my studies at SNHU.) Recently, I have 
been building wireframe designs based on UX/UI fundamentals 
and both Android and Apple UI guidelines, ensuring a seamless 
user experience. I have also been working on client and server 
development on Linux OS utilizing MongoDB. I also enjoy modding 
video games including Skyrim and creating IOT projects such as 
my real life 'BMO' robot, check out my projects to take a look!
                    
Previously, I worked as a Level Seven Quality Assurance 
Technician at Radwell International, where I honed my skills 
in troubleshooting and testing electronic systems. Now, as I 
transition into the development field, I'm eager to leverage 
my technical knowledge and problem-solving abilities to 
contribute to dynamic and innovative projects. I'm 
actively seeking new opportunities to grow as a developer 
and make a meaningful impact in the tech industry.`);
                break;

            case 'exp':
                output(`

* QA Technician VII *
----------------------------------------------------------------------
@ Radwell International @
DURATION: April 2020 - April 2024
INFO: Leveraged extensive knowledge of analog and digital electronic 
components to support the development and troubleshooting of complex 
systems. Proficiently utilized automation software and test 
equipment, such as oscilloscopes and multi-meters, to conduct 
functional performance testing of systems, subassemblies, and parts. 
Developed and implemented test procedures, ensuring compliance with 
Standard Operating Procedures (SOPs) and engineering diagrams. 
Communicated technical issues and product failures effectively with 
both internal teams and customers. This role honed my analytical 
and problem-solving skills, laying a solid foundation for my 
transition into software development.

* Veternarian Technician *
----------------------------------------------------------------------
@ HousePaws Mobile Vet @
DURATION: November 2014 - January 2020
INFO: Provided critical support in a fast-paced veterinary 
environment, including the restraint and stabilization of 
animals during examination and treatment. Managed supply 
inventory, ensuring efficient operations. Reviewed and 
entered important patient data into the system, maintaining 
accurate medical records. Triaged incoming patients and provided 
care for anesthetized patients. This position enhanced my 
ability to work under pressure, communicate effectively, 
and manage detailed records, all of which are crucial skills 
in software development.`);
                break;
            
            case 'edu':
                output(`

* BCS w/ con in Software Engineering *                    
----------------------------------------------------------------------                    
@ Southern New Hampshire University @
DURATION: January 2023 - April 2025
GPA: 4.0

* AAS Computer Science *                    
----------------------------------------------------------------------                    
@ Rowan College at Burlington County @
DURATION: January 2017 - May 2020
GPA: 3.7

* GED *                    
----------------------------------------------------------------------                    
@ Lenape High School @
DURATION: September 2012 - June 2016
GPA: 3.6
                    `)
                break;

            case 'skills':
                outputSkills();
                output(`

+ Research and Layout Using Lucidchart/Lucidspark
+ Creating Flowcharts and Visual Plans
+ Cross Browser Testing & Debugging
+ Collaborating with Cross-Functional Teams
+ Agile Development & Scrum
+ Continuous Feedback and Iteration
+ Final Review and Deployment`);
                break;

            case 'awards':
                    output(`
* Recent Awards *
----------------------------------------------------------------------
    🏆 4.0 GPA - Southern New Hamphsire University - 2023/2025

    🏆Alpha Sigma Lambda - Inducted May 2023

    🏆Dean’s List - January 2023 - April 2024

    🏆President’s List - January 2023 - April 2024

    🏆Honor Roll - January 2023 - April 2024
`)
                break;

            case 'blog':
                outputBlog();
                break;

            default:
                output(`Command not recognized: ${cmd}\nPlease type HELP for assistance.`);
                break;
        }
        scrollToBottom();
    }
    
    function output(text) {
        const pre = document.createElement('pre');
        pre.innerHTML = text;
        outputElement.appendChild(pre);
        scrollToBottom();
    }

    function clearOutput() {
        outputElement.innerHTML = ''; // Clear terminal output
    }

    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Project showcase function (showprojx)
    async function showProjects(type) {
        try {
            console.log(`Fetching projects.json for ${type}`);
            const response = await fetch('ALT/projects.json'); 
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

    // Skills function
    function outputSkills() {
        const skillsHTML = `
            <div class="subheading mb-0">Programming Languages &amp; Tools</div>
            <br/>
            <ul class="list-inline list-icons" id="skills-container">
                <li class="list-inline-item">
                    <i class="devicons devicons-python" data-toggle="tooltip" title="Python"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-html5" data-toggle="tooltip" title="HTML5"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-css3" data-toggle="tooltip" title="CSS3"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-javascript_shield" data-toggle="tooltip" title="JavaScript"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-github_badge" data-toggle="tooltip" title="GitHub"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-mysql" data-toggle="tooltip" title="MySQL"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-mongodb" data-toggle="tooltip" title="MongoDB"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-bootstrap" data-toggle="tooltip" title="Bootstrap"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-linux" data-toggle="tooltip" title="Linux"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-ubuntu" data-toggle="tooltip" title="Ubuntu"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-raspberry_pi" data-toggle="tooltip" title="Raspberry Pi"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-sass" data-toggle="tooltip" title="Sass"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-windows" data-toggle="tooltip" title="Windows"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-vim" data-toggle="tooltip" title="Vim"></i>
                </li>
                <li class="list-inline-item">
                    <i class="devicons devicons-opensource" data-toggle="tooltip" title="Open Source"></i>
                </li>
            </ul>
        `;
        outputElement.innerHTML += skillsHTML;
        scrollToBottom();
    }

// Blog function
async function outputBlog() {
    try {
        const response = await fetch('https://dev.to/api/articles?username=jpdengler');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articles = await response.json();
        let blogOutput = 'Here are my latest blog posts from DEV Community:';
        articles.slice(0, 3).forEach(article => {
            let title = wordWrap(`${article.title}`, 70);
            let description = wordWrap(article.description, 70);
            let url = wordWrap(article.url, 70);
            blogOutput += `\n<a href="${article.url}" target="_blank" class="blog-title">${title}</a>\n${description}\n--------------------------------------------------------------------`;
        });
        output(blogOutput.trim());
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        output(`Error fetching blog posts: ${error.message}`);
    }
}

// Function to wrap words after a certain number of characters
function wordWrap(str, maxWidth) {
    let newLineStr = "\n";
    let res = '';
    while (str.length > maxWidth) {                 
        let found = false;
        // Inserts new line at the last space within the line width
        for (let i = maxWidth - 1; i >= 0; i--) {
            if (str.charAt(i) === ' ') {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // If no space is found, insert new line at maxWidth position
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }
    }
    return res + str;
}

    // Flicker effect
    function flickerButton() {
        const flickerImages = ['images/FLICKER1.png', 'images/FLICKER2.png'];
        const originalImage = powerButton.src.includes('ButtonOn') ? 'images/ButtonOn.png' : 'images/ButtonOff.png';
        const flickerImage = flickerImages[Math.floor(Math.random() * flickerImages.length)];
        powerButton.src = flickerImage;

        setTimeout(() => {
            powerButton.src = originalImage;
        }, 100); 
    }
    setInterval(() => {
        if (Math.random() < 0.5) {
            flickerButton();
        }
    }, 500); 

});