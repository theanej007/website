async function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username+ " "+password);
    let a = await fetch("https://anej.kak.si/api/test.php", {
        method: "POST"
        
    }).then(res => res.json()).catch(err => console.error(err));
    console.log(a);
}
document.getElementById("loginBtn").onclick = login;