function dropDown(github) {
    document.getElementById(github).classList.toggle('show')
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.arrow')) { 
        let dropdowns = document.getElementsByClassName('dropdown_content')
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
            }
        }
    }
}