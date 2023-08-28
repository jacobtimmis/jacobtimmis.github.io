function fetchProjects() {
    fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
        PopulateProjects(data)
    })
    .catch((error) => {
        console.error('Error fetching projects:', error)
    })
}

function PopulateProjects(projects) {
    const ProjList = document.getElementById('project-list')
    projects.forEach((section) => {
        let Section = AddElement(ProjList, 'div', '', 'section')
        let SectionTitle = AddElement(Section, 'div', '', 'section-header')
        AddElement(SectionTitle, 'h2', section.title, 'section-title')
        AddElement(SectionTitle, 'p', section.brief, 'section-brief')
        section.list.forEach((project) => {
            let ProjRoot = AddElement(Section, 'div', '', 'project')
            AddElement(ProjRoot, 'h3', project.name, 'project-name')
            AddElement(ProjRoot, 'p', project.brief, 'project-brief')
            AddElement(ProjRoot, 'a', 'Check it out here!', 'project-link').href = project.link
            AddElement(ProjRoot, 'p', new Date(project.date).toDateString(), 'project-date')
        })
    })
}

function AddElement(parent, type, textContent, classes) {
    const element = document.createElement(type)
    element.textContent = textContent
    element.classList = classes
    parent.appendChild(element)
    return element
}

// Call fetchProjects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects)
