document.addEventListener('DOMContentLoaded', onContentLoaded)

function onContentLoaded() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => populateProjects(data))
        .catch(error => console.error('Error getting projects:', error))
}

function populateProjects(projects) {
    const containerSmall = document.getElementById('small-card-container')
    const containerLarge = document.getElementById('large-card-container')
    const templateSmallCard = document.getElementById('small-card')
    const templateLargeCard = document.getElementById('large-card')
    for (const project of projects) {
        if (project.hidden) { continue }
        if (getProjectSizeIsLarge(project)) {
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

function exists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function getProjectSizeIsLarge(project) {
    return exists("images/" + project.id + ".png")
}

function addCardGeneric(instance, project) {
    const projectIcon = instance.querySelector('.project-icon')
    projectIcon.src = "icons/" + project.id + ".png"
    const projectName = instance.querySelector('.name')
    projectName.textContent = project.name
    const projectDate = instance.querySelector('.project-date')
    const date = new Date(project.date)
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
