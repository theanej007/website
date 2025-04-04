async function bla(){
    if(!await fetch("https://anej.kak.si/api/info.php", {credentials: "include"}).then(res => res.json())){
        window.location.replace("login.html");
    }
}
bla();
