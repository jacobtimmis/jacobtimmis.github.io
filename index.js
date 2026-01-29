document.addEventListener('DOMContentLoaded', onContentLoaded)

function onContentLoaded() {
    setupDarkMode()
    fetch('projects.json')
        .then(res => res.json())
        .then(res => populateProjects(res))
        .catch(error => console.error('Error getting projects:', error))
    fetch('lastupdate.txt')
        .then(res => res.text())
        .then(res => setLastUpdate(res))
        .catch(error => console.error('Error setting last update:', error))
}

function setupDarkMode() {
    const body = document.body
    const toggleBtn = document.getElementById('dark-mode-toggle')
    if (!toggleBtn) return
    
    const savedTheme = localStorage.getItem('theme')
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    if (savedTheme === 'dark' || (!savedTheme && mediaQuery.matches)) {
        body.classList.add('dark-mode')
        toggleBtn.textContent = '☀️'
    }

    toggleBtn.onclick = () => {
        body.classList.toggle('dark-mode')
        const isDark = body.classList.contains('dark-mode')
        toggleBtn.textContent = isDark ? '☀️' : '🌙'
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode')
                toggleBtn.textContent = '☀️'
            } else {
                body.classList.remove('dark-mode')
                toggleBtn.textContent = '🌙'
            }
        }
    })
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
    const card = instance.querySelector('.card')

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const xPct = (x / rect.width) - 0.5
        const yPct = (y / rect.height) - 0.5
        projectScreen.style.transform = `translate(${xPct * 10}%, ${yPct * 10}%)`
    })

    card.addEventListener('mouseleave', () => {
        projectScreen.style.transform = ''
    })
}

function formatDate(date) {
    const dateDate = new Date(date)
    if (!isNaN(dateDate)) {
        return dateDate.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
    } else {
        return "no read date"
    }
}
