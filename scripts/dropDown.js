function dropDown(projectName, event) {
    const list = document.getElementById(projectName).classList

    if (list.contains('show')) {
        list.remove('show')
        event.target.style.borderRadius = '.8rem'
    } else {
        list.add('show')
        event.target.style.borderRadius = '.8rem .8rem 0 0'
    }
}

const projects = document.getElementById('projects')

projects.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.arrow')) { 
        let dropdowns = document.getElementsByClassName('dropdown-content')
        for (let x = 0; x < dropdowns.length; x++) {
            let openDropDown = dropdowns[x]
            if (openDropDown.classList.contains('show')) {
                openDropDown.classList.remove('show')
                document.getElementsByClassName(openDropDown.id)[0].style.borderRadius = '.8rem'
            }
        }
    }
}