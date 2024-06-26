async function loadProjects() {
    try {
        const response = await fetch('projects.json'); // Ensure the correct path
        const data = await response.json();

        const showcaseContainer = document.getElementById('showprojx');
        const archiveContainer = document.getElementById('archive-projects');

        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-item'); // Add the class for spacing
            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;

            if (project.showcase) {
                showcaseContainer.appendChild(projectElement);
            }
            const archiveElement = projectElement.cloneNode(true);
            archiveContainer.appendChild(archiveElement);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);