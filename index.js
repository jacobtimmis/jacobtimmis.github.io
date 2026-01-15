document.addEventListener('DOMContentLoaded', onContentLoaded)

function onContentLoaded() {
    fetch('projects.json')
        .then(res => res.json())
        .then(res => populateProjects(res))
        .catch(error => console.error('Error getting projects:', error))
    fetch('lastupdate.txt')
        .then(res => res.text())
        .then(res => setLastUpdate(res))
        .catch(error => console.error('Error setting last update:', error))
}

function setLastUpdate(date) {
    const lastUpdate = document.getElementById('last-update')
    lastUpdate.textContent = lastUpdate.textContent.replace("{date}", formatDate(date))
}

function populateProjects(projects) {
    const templateSmallCard = document.getElementById('small-card')
    const templateLargeCard = document.getElementById('large-card')
    const containerSmall = document.getElementById('small-card-container')
    const containerLarge = document.getElementById('large-card-container')
    for (const project of projects) {
        if (project.hidden) { continue }
        if (project.cover) {
            const instance = templateLargeCard.content.cloneNode(true)
            addCardGeneric(instance, project)
            addCardCover(instance, project)
            containerLarge.appendChild(instance)
        } else {
            const instance = templateSmallCard.content.cloneNode(true)
            addCardGeneric(instance, project)
            containerSmall.appendChild(instance)
        }
    }
}

function addCardGeneric(instance, project) {
    const projectIcon = instance.querySelector('.project-icon')
    projectIcon.src = "icons/" + project.id + ".png"
    const projectName = instance.querySelector('.name')
    projectName.textContent = project.name
    const projectDate = instance.querySelector('.project-date')
    projectDate.textContent = formatDate(project.date)
    const projectBrief = instance.querySelector('.project-brief')
    projectBrief.textContent = project.brief
    const card = instance.querySelector('.card')
    let link = project.link
    if (link) {
        card.onclick = () => window.location.href = link
    }
}

function addCardCover(instance, project) {
    const projectScreen = instance.querySelector('.cover')
    projectScreen.src = "images/" + project.id + ".png"
}

function formatDate(date) {
    const dateDate = new Date(date)
    if (!isNaN(dateDate)) {
        return dateDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
    } else {
        return "no read date"
    }
}
