function dropDown(github) {
    document.getElementById(github).classList.toggle('show')
}

const projects = document.getElementById('projects')

projects.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.arrow')) { 
        let dropdowns = document.getElementsByClassName('dropdown-content')
        for (let x = 0; x < dropdowns.length; x++) {
            let openDropdown = dropdowns[x]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
            }
        }
    }
}