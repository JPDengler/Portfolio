document.addEventListener('DOMContentLoaded', function() {
    function loadProjects() {
        fetch('./projects.json')  // Ensure the path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const showcaseContainer = document.getElementById('showprojx');
                const archiveContainer = document.getElementById('archive-projects');
                
                data.projects.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project-item');
                    projectElement.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p><a href="${project.link}" target="_blank">View Project</a>`;
                    
                    if (project.showcase) {
                        showcaseContainer.appendChild(projectElement);
                    }
                    archiveContainer.appendChild(projectElement.cloneNode(true));
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }

    loadProjects();
});