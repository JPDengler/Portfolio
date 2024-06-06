document.addEventListener('DOMContentLoaded', function() {
    function loadProjects() {
        fetch('../projects.json')  // Updated path
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                displayProjects(data.projects, 'showprojx', true);
                displayProjects(data.projects, 'archive-projects', false);
            })
            .catch(error => console.error('Error loading projects:', error));
    }

    function displayProjects(projects, elementId, showcase) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        projects.forEach(project => {
            if (project.showcase === showcase) {
                const projectElement = document.createElement('div');
                if (project.url) {
                    projectElement.innerHTML = `<a href="${project.url}" target="_blank">${project.name}</a>`;
                } else {
                    projectElement.textContent = `${project.name} - ${project.description}`;
                }
                container.appendChild(projectElement);
            }
        });
    }

    loadProjects();
});