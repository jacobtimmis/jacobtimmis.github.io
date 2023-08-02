// Function to fetch and process the projects from projects.json
function fetchProjects() {
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      // Once the data is fetched, call the function to add projects to the list
      addProjectsToList(data);
    })
    .catch((error) => {
      console.error('Error fetching projects:', error);
    });
}

// Function to add projects to the list
function addProjectsToList(projects) {
  const projectList = document.getElementById('project-list');

  // Loop through the projects and create list items for each project
  projects.forEach((project) => {
    const listItem = document.createElement('li');
    listItem.textContent = project.name;
    projectList.appendChild(listItem);
  });
}

// Call the fetchProjects function when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects);
