async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');  // Ensure file exists
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const showcaseContainer = document.getElementById('showprojx');
        const archiveContainer = document.getElementById('archive-projects');

        if (!showcaseContainer || !archiveContainer) {
            console.error('Error: Project containers not found in the DOM.');
            return;
        }

        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-item');
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

async function outputBlog() {
    try {
        const response = await fetch('https://dev.to/api/articles?username=jpdengler');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articles = await response.json();
        const blogContainer = document.getElementById('blog-posts');
        let blogOutput = '';

        articles.slice(0, 3).forEach(article => {
            blogOutput += `
                <div class="blog-post">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description}</p>
                </div>
            `;
        });

        blogContainer.innerHTML = blogOutput;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        const blogContainer = document.getElementById('blog-posts');
        blogContainer.innerHTML = `<p>Error fetching blog posts: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    outputBlog();
});