document.cookie = "lastpage=" + window.location.href + "; path=/";
async function aa() {
    let r = await fetch("https://anej.kak.si/api/info.php", { credentials: "include" }).then(res => res.json());
    if (r) {
        let b = document.getElementById("account");
        b.textContent = r;
        b.className += "nameButton";
        b.href = "#";
        b.onclick = dropdownToggle;
    }
}
aa();

function dropdownToggle() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.classList.contains('dropbtnnameButton')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
async function logout() {
    console.log("aa");
    await fetch("https://anej.kak.si/api/logout.php", { credentials: "include" });
    window.location.reload(true);
}