document.addEventListener('DOMContentLoaded', begin)

function begin() {
    fetch('projects.json')
        .then   (response => response.json())
        .then   (data => populateProjects(data))
        .catch  (error => console.error('Error fetching projects:', error))
    gameEmbed = document.getElementById('game-embed')
    iframe = document.getElementById('iframe')
}

function populateProjects(projects) {
    const projList = document.getElementById('project-list')
    const smallEntry = document.getElementById('small-entry')
    const starGrid = document.getElementById('star-grid')
    const starEntry = document.getElementById('star-entry')
    for (p of projects) {
        if (p.hidden) { continue }
        if (p.gif) {
            const projectEntry = starEntry.content.cloneNode(true)
            setupEntry(projectEntry)
            const projectScreen = projectEntry.querySelector('.screen');
            projectScreen.src = "gifs/" + p.gif            
            starGrid.appendChild(projectEntry)
        } else {
            const projectEntry = smallEntry.content.cloneNode(true)
            setupEntry(projectEntry)
            projList.appendChild(projectEntry)
        }
    }
}

function setupEntry (projectEntry) {
    const projectIcon = projectEntry.querySelector('.project-icon');
    projectIcon.src = "icons/" + p.icon
    const projectName = projectEntry.querySelector('.project-name');
    projectName.textContent = p.name
    const projectRecommend = projectEntry.querySelector('.project-recommend');
    if (p.recommended) {
        projectRecommend.style.display = 'block'
    } else {
        projectRecommend.style.display = 'none'
    }
    const projectDate = projectEntry.querySelector('.project-date');
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
    const projectBrief = projectEntry.querySelector('.project-brief');
    projectBrief.textContent = p.brief
    let link = p.link
    if (link) {
        const projRoot = projectEntry.querySelector('.project');
        projRoot.onclick = () => window.location.href = link
        projRoot.classList.add('clickable-project')
    }
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
