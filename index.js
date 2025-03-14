async function fe() {
    try {
        const repo = await fetch("https://api.github.com/users/theanej007/repos").then(res => res.json());
        let eleDiv = [];
        let eleH2 = [];
        let eleP = [];
        let eleA = [];
        let st = 2;
        for (let i = 0; i < st; i++) {
            if (repo[i].name !== "theanej007") {
                eleDiv[i] = document.createElement("div");
                eleDiv[i].className = "projectDiv";
                eleDiv[i].id = `p${i}`;
                document.body.append(eleDiv[i]);

                eleH2[i] = document.createElement("H2");
                eleH2[i].id = `h${i}`;
                document.getElementById(`p${i}`).append(eleH2[i]);

                eleA[i] = document.createElement("a");
                eleA[i].textContent = repo[i].name + "\n";
                eleA[i].className = "specialA";
                eleA[i].target = "_blank";
                eleA[i].href = `https://github.com/theanej007/${repo[i].name}`;
                document.getElementById(`h${i}`).appendChild(eleA[i]);

                eleP[i] = document.createElement("p");
                eleP[i].textContent = repo[i].description;
                document.getElementById(`p${i}`).append(eleP[i]);
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