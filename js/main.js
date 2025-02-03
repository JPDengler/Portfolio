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
    - player : ???
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

* Hi, I'm Joey! *
----------------------------------------------------------------------
An Automation Technician with software development experience, 
specializing in troubleshooting, maintaining, and optimizing 
industrial automation systems. I currently work at Bridor USA, 
where I handle PLC programming (Siemens & Allen-Bradley), 
servo drive configuration, safety relays, industrial sensors, 
and electrical diagnostics within high-speed production 
environments. I am also developing an internal admin dashboard 
to streamline access to documentation, inventory, and work history.

I am completing my Bachelor’s Degree in Computer Science with 
a concentration in Software Engineering at Southern New 
Hampshire University, graduating March 1st, 2025. Throughout 
my studies, I have maintained a 4.0 GPA, earning distinctions 
such as Alpha Sigma Lambda, Dean’s List, President’s List, 
and Honor Roll. My academic experience has strengthened my 
problem-solving skills, bridging software development and 
automation technology.

My technical expertise spans C++, Java, JavaScript, Python, 
and MySQL, with experience in logic programming, embedded 
systems, and industrial automation scripting. Beyond my 
professional work, I have contributed to various software 
and hardware projects, including "Project Magpie" (this 
portfolio), mock app prototypes, and IoT projects like 
"Project BMO," a voice-interactive robot using Raspberry Pi 
and OpenAI.
                                        
Previously, I worked as a Level Seven Quality Assurance 
Technician at Radwell International, focusing on troubleshooting 
and testing electronic systems, further refining my analytical 
and problem-solving skills. 

I am always looking to expand my expertise in both automation 
and software development. Whether integrating PLC programming 
with data-driven applications or exploring new software-driven 
industrial solutions, I thrive in solving complex technical 
challenges. `);
                break;

            case 'exp':
                output(`

* Automation Technician *
----------------------------------------------------------------------
@ Bridor USA @
DURATION: September 2024 - Present
INFO: Troubleshoot, maintain, and optimize industrial automation 
systems in a high-demand production environment. Work with 
**PLC systems** (Siemens & Allen-Bradley), **servo drives**, **safety 
relays**, and **industrial sensors** to ensure efficient operations. 
Program and debug ladder logic, function block, and structured text 
for production lines. Develop and implement an **admin dashboard website** 
for the maintenance department to streamline access to documentation, 
inventory, and work history. Diagnose electrical issues in **control 
cabinets, power distribution, and safety circuits**, ensuring reliable 
and safe operations.

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
                
          * Automation & Industrial Control Systems *
----------------------------------------------------------------------
+ PLC Programming (Siemens S7, TIA Portal, Allen-Bradley RSLogix)
+ Servo Drive Configuration & Tuning (Lenze, Allen-Bradley, Siemens)
+ Industrial Sensor Integration (Photoelectric, Proximity, Encoders)
+ Safety Relay Wiring & Troubleshooting (PILZ, Allen-Bradley Guardmaster)
+ Motor Control Systems (VFDs, Contactors, Starters)
+ HMI Design & Configuration (Siemens, FactoryTalk)
+ Ladder Logic, Function Block, and Structured Text Programming
+ Industrial Network Protocols (PROFINET, EtherNet/IP, MODBUS)
+ Developing Admin Dashboards for Maintenance Operations

                * Electrical & Troubleshooting *
----------------------------------------------------------------------
+ Electrical Cabinet Wiring & Layout Analysis
+ Circuit Diagnostics & Fault Isolation
+ Electrical Panel Design & Modification
+ Reading & Interpreting Schematics (Relay Logic, Control Diagrams)
+ Low-Voltage Power Distribution (24VDC, 120VAC, 480VAC Systems)
+ Using Oscilloscopes, Multimeters, and Signal Testers
+ Emergency Stop Circuits and Safety Interlocks

              * Software Development & Programming *
----------------------------------------------------------------------
+ Full-Stack Development (Java, JavaScript, Python, C++, MySQL, MongoDB)
+ Client-Server Architecture & API Development
+ Embedded Systems Programming (Raspberry Pi, Arduino)
+ Web Development (React, HTML, CSS, Bootstrap)
+ Secure Coding Practices & Cybersecurity (CS-405 Background)
+ Writing & Optimizing SQL Queries
+ Debugging & Unit Testing (JUnit, PyTest, Visual Studio)
+ Version Control & CI/CD (Git, GitHub Actions, Jenkins)
                
                * Debugging & Problem-Solving *
----------------------------------------------------------------------
+ Root Cause Analysis for Industrial & Software Issues
+ On-Site Troubleshooting of Electrical & Control Systems
+ Debugging & Optimizing PLC & Servo Control Code
+ Cross-Browser Testing & Web Application Debugging
+ Continuous Integration & Automated Testing Strategies
+ Reverse Engineering & Legacy Code Refactoring

         * Technical Planning & Team Collaboration *
----------------------------------------------------------------------
+ Research & Layout Using Lucidchart/Lucidspark
+ Creating Flowcharts, Schematics, & System Diagrams
+ Collaborating with Cross-Functional Teams (Engineering, IT, Maintenance)
+ Agile Development & Scrum Methodologies
+ Documenting System Changes & Standard Operating Procedures
+ Process Optimization & Efficiency Improvements
+ Continuous Feedback & Iteration
+ Final Review & Deployment
                `);
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
        
        articles.slice(0, 5).forEach(article => {
            let wrappedTitle = wordWrap(article.title, 70);
            let wrappedDescription = wordWrap(article.description, 70);
            blogOutput += `\n\n<a href="${article.url}" target="_blank" class="blog-title">${wrappedTitle}</a>\n${wrappedDescription}\n--------------------------------------------------------------------`;
        });
        
        output(blogOutput.trim());
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        output(`Error fetching blog posts: ${error.message}`);
    }
}

// Function to wrap words after a certain number of characters
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

// Update the output function to use wordWrap
function output(text) {
    const pre = document.createElement('pre');
    pre.innerHTML = wordWrap(text, 70); 
    outputElement.appendChild(pre);
    scrollToBottom();
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
