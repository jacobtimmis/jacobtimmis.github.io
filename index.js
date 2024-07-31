function fetchProjects() {
    fetch('projects.json')
    .then   (response => response.json())
    .then   (data => populateProjects(data))
    .catch  (error => console.error('Error fetching projects:', error))
}

function populateProjects(projects) {
    const projList = document.getElementById('project-list')
    projects.forEach(section => {
        if (section.hidden) return
        const sectionRoot = addElement(projList, 'div', '', 'section')
        const sectionTitle = addElement(sectionRoot, 'div', '', 'section-header')
        addElement(sectionTitle, 'h2', section.title, 'section-title')
        addElement(sectionTitle, 'p', section.brief, 'section-brief')
        section.list.forEach(project => {
            if (project.hidden) return
            const projRoot = addElement(sectionRoot, 'div', '', 'project')
            const icon = addElement(projRoot, 'img', '', 'project-icon')
            icon.src = "icons/" + project.icon
            const projInfo = addElement(projRoot, 'div', '', 'project-info')
            const projTitle = addElement(projInfo, 'div', '', 'project-title')
            addElement(projTitle, 'h3', project.name, 'project-name')
            if (project.recommended) {
                addElement(projTitle, 'p', '*', 'project-recommend')
            }
            const projDate = new Date(project.date)
            if (!isNaN(projDate)) {
                const localeDate = projDate.toLocaleDateString('en', {
                    day: 'numeric',
                    year: 'numeric',
                    month: 'long',
                })
                addElement(projTitle, 'p', localeDate, 'project-date')
            }
            addElement(projInfo, 'p', project.brief, 'project-brief')
            if (project.link) {
                projRoot.onclick = () => window.location.href = project.link
                projRoot.classList.add('clickable-project')
            }
        })
    })
}

function addElement(parent, type, textContent, classes) {
    const element = document.createElement(type)
    element.textContent = textContent
    element.classList = classes
    parent.appendChild(element)
    return element
}

// Call fetchProjects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects)
