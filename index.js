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
            if (!project.hidden) {
                let ProjRoot = AddElement(Section, 'div', '', 'project')
                let ProjTitle = AddElement(ProjRoot, 'div', '', 'project-title')
                AddElement(ProjTitle, 'h3', project.name, 'project-name')
                let projDate = new Date(project.date)
                if (!isNaN(projDate)) {
                    let loc_date = projDate.toLocaleDateString('en', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'long',
                    })
                    AddElement(ProjTitle, 'p', loc_date, 'project-date')
                }
                AddElement(ProjRoot, 'p', project.brief, 'project-brief')
                if (project.link) {
                    AddElement(ProjRoot, 'a', 'Check it out here!', 'project-link').href = project.link
                }
            }
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
