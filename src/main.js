

async function load_stuff() {
    let list_element = document.querySelector("#main_tl ul");


    let res = await fetch("http://localhost:3050/get_task", {method : "POST" });


    res.json().then((rp) => {
        rp.forEach(element => {
            console.table(element);
            let li_parent = document.createElement("li");
            let priority = document.createElement("span");

            
            if(element.task_type != "F") {
                priority.innerText = element.task_type;
                priority.className = `task_type tt_${element.task_type.toLowerCase()}`;
            }
            else {
                let clock_ico = document.createElement('i');
                clock_ico.className = "fa-regular fa-clock";

                priority.appendChild(clock_ico);
                priority.className = `task_type tt_a`;

                priority.title = `Starts at ${new Date(element.start_time * 1000).getHours()}:${new Date(element.start_time * 1000).getMinutes()}`;
            }

            
            let name = document.createElement("p");
            name.innerText = element.name;

            li_parent.appendChild(priority);
            li_parent.appendChild(name);

            if(element.is_done != 0) 
                li_parent.className += " done";

            list_element.appendChild(li_parent);

            if(element.task_type != "F") {
                li_parent.addEventListener('click', () => {
                    update_task(element.name, !element.is_done);
                    if(li_parent.className.includes(" done"))
                        li_parent.className = li_parent.className.replace(" done", "")
                    else 
                        li_parent.className += " done";
                });
            }
            
            
        });


    }).catch((err) => {
        throw new Error(`Error Accessing Backend server ${err}`);
    });

    async function update_task(name, is_done) {
        let res = await fetch("http://localhost:3050/update_task", {method : "POST", body : JSON.stringify({name : name,is_done: is_done})});
        console.log(res);
    }

}

