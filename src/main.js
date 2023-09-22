

async function load_stuff() {
    let list_element = document.querySelector("#main_tl ul");


    let res = await fetch("http://localhost:3050/get_task", {method : "POST" });


    res.json().then((rp) => {
        rp.forEach(element => {
            console.table(rp);
            let li_parent = document.createElement("li");
            let priority = document.createElement("span");
            priority.className = `task_type tt_${element.task_type.toLowerCase()}`;
            priority.innerText = element.task_type;

            let name = document.createElement("p");
            name.innerText = element.name;

            li_parent.appendChild(priority);
            li_parent.appendChild(name);

            list_element.appendChild(li_parent);
            
            
        });


    }).catch((err) => {
        throw new Error(`Error Accessing Backend server ${err}`);
    });

}

