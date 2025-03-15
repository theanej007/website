async function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = {"username": username, "password": password};
    let a = await fetch("https://anej.kak.si/api/register.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(err => console.error(err));
    if(a == -1){
        errm.textContent = "Password must be longer than 6 and include at least one number!";
    }
    else if (a == 0){
        errm.textContent = "Username has already been taken!";
    }
    else if(a == 1){
        window.location.replace("login.html");
    }
    if(wrong == 0){
        let par = document.getElementById("par");
        par.parentNode.insertBefore(errm, par);
        wrong++;
    }
}
let wrong = 0;
document.getElementById("registerBtn").onclick = login;
let errm = document.createElement("p");
errm.id = "loginErr";
errm.style.fontSize = "15px";
errm.style.color = "red";