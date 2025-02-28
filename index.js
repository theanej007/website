async function fe() {
    try {
        const repo = await fetch("https://api.github.com/users/theanej007/repos").then(res => res.json());
        let eleDiv = [];
        let eleH2 = [];
        let st = 3;
        for (let i = 0; i < st; i++) {
            if (repo[i].name !== "theanej007") {
                eleDiv[i] = document.createElement("div");
                eleDiv[i].className = "projectDiv";
                eleDiv[i].id = `p${i}`;
                document.body.append(eleDiv[i]);
                eleH2[i] = document.createElement("H2");
                eleH2[i].textContent = repo[i].name;
                document.getElementById(`p${i}`).append(eleH2[i]);
            }
            else {
                st++;
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}
fe();