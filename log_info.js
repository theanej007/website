async function aa(){
    if(await fetch("https://anej.kak.si/api/info.php", {credentials: "include"}).then(res => res.json())){
        let b = document.getElementById("account");
        b.textContent = "LOG OUT";
        b.href = window.location.href;
        b.onclick = logout;
}
}
aa();
async function logout() {
console.log("aa");
await fetch("https://anej.kak.si/api/logout.php", {credentials: "include"})
}