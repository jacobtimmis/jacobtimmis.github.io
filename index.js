document.addEventListener('DOMContentLoaded', begin)

function begin() {
    fetch('projects.json')
        .then   (response => response.json())
        .then   (data => populateProjects(data))
        .catch  (error => console.error('Error building projects:', error))
}

function populateProjects(projects) {
    const projList = document.getElementById('small-card-container')
    const smallEntry = document.getElementById('small-card')
    const starGrid = document.getElementById('large-card-container')
    const starEntry = document.getElementById('large-card')
    for (p of projects) {
        if (p.hidden) { continue }
        if (p.image) {
            const projectEntry = starEntry.content.cloneNode(true)
            setupEntry(projectEntry)
            const projectScreen = projectEntry.querySelector('.cover')
            projectScreen.src = "images/" + p.image
            projectScreen.dataset.altSrc = "images/" + p.altImage
            projectScreen.addEventListener("mouseover", () => swapSrc(projectScreen))
            projectScreen.addEventListener("mouseout", () => swapSrc(projectScreen))
            const entry = projectEntry.querySelector('.card')
            setupLink(entry)
            starGrid.appendChild(projectEntry)
        } else {
            const projectEntry = smallEntry.content.cloneNode(true)
            setupEntry(projectEntry)
            const projRoot = projectEntry.querySelector('.card')
            setupLink(projRoot)
            projList.appendChild(projectEntry)
        }
    }
}

function swapSrc (node) {
    let a = node.src
    node.src = node.dataset.altSrc
    node.dataset.altSrc = a
}

function setupLink (node) {
    let link = p.link
    if (link) {
        node.onclick = () => window.location.href = link
        node.classList.add('clickable-project')
    }
}

function setupEntry (projectEntry) {
    const projectIcon = projectEntry.querySelector('.project-icon')
    projectIcon.src = "icons/" + p.icon
    const projectName = projectEntry.querySelector('.name')
    projectName.textContent = p.name
    const projectDate = projectEntry.querySelector('.project-date')
    const date = new Date(p.date)
    if (!isNaN(date)) {
        const localeDate = date.toLocaleDateString('en', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        })
        projectDate.textContent = localeDate
    } else {
        projectDate.textContent = ""
    }
    const projectBrief = projectEntry.querySelector('.project-brief')
    projectBrief.textContent = p.brief
}

function addElement(parent, type, classes, textContent) {
    const element = document.createElement(type)
    element.textContent = textContent
    element.classList = classes
    parent.appendChild(element)
    return element
}

function showGameEmbed () {
    gameEmbed.style.display = 'flex'
}

function hideGameEmbed () {
    gameEmbed.style.display = 'none'
}
