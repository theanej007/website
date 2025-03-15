async function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = {"username": username, "password": password};
    let a = await fetch("https://anej.kak.si/api/login.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => console.error(err));
    if(a != 1 && wrong == 0){
        let errm = document.createElement("p");
        errm.id = "loginErr";
        errm.style.fontSize = "15px";
        errm.style.color = "red";
        errm.textContent = "Wrong username or password!";
        let par = document.getElementById("par");
        par.parentNode.insertBefore(errm, par);
        wrong++;
    }
    else if(a == 1){
        window.location.replace("index.html");
    }
}
let wrong = 0;
document.getElementById("loginBtn").onclick = login;