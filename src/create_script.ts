


async function set_inp() {
    let par : HTMLElement;
    let inp1 : HTMLElement;
    let inp2 : HTMLElement;

    // Setting Time Selector Div
    let task = document.createElement('div')
    task.className = "new_task_tf";

    document.getElementById("time_sel")?.appendChild(task);


    // Setting Priority Selector Events 
    let elems = document.getElementsByClassName("task_type") as HTMLCollectionOf<HTMLElement>;
    if( !elems )
        return
    for(let i = 0; i < elems.length; ++i)
        elems[i].addEventListener('click', priority_click);





    //  --------- Setting The Drag Cursor Thing ------------------ 

    let x : HTMLElement | null;

    // First Marker
    if((x = document.getElementById("inp1")) != null)
        inp1 = x;
    else return;
    // Second Marker
    if((x = document.getElementById("inp2")) != null)
        inp2 = x;
    else return;
    // The parent element 
    if((x = document.getElementById("inp")) != null)
        par = x;
    else return;
    

    if( !inp1 ) 
        return; 

    inp1.style.left = "30%";
    inp2.style.left = "50%";

    inp1.onmousedown = dragElement;
    inp2.onmousedown = dragElement;

    let currentDraggedElement : HTMLElement | null;

    function dragElement(e : Event) {
        currentDraggedElement = (e.target as HTMLElement).parentElement;
        console.log(currentDraggedElement);
        document.onmousemove = dragElementDoc;
        document.onmouseup = clearElement;
    }

    let start_tm_elem = document.getElementById("st_tm") as HTMLInputElement;
    let end_tm_elem = document.getElementById("ed_tm") as HTMLInputElement;

    let start_time : Date = new Date();
    start_time.setHours(7, 0);

    let end_time : Date = new Date();
    end_time.setHours(12, 0);


    function dragElementDoc(e : MouseEvent) {
        // I am going to cry :<
        let lf_per = (e.clientX - par.offsetWidth / 2.65)* 100 / par.offsetWidth;
        if(lf_per > 0 && lf_per < 98 && currentDraggedElement) {

            if(currentDraggedElement.id == "inp1" && lf_per < Number(inp2.style.left.replace('%', ''))) {
                // Position Style
                inp1.style.left = `${lf_per}%`;
                task.style.left = `${lf_per + .5}%`;
                task.style.width =  `${Number(inp2.style.left.replace('%', '')) - lf_per + 2}%`;

                // Time input
                if(!start_tm_elem)
                    return;

                lf_per -= 1;
                let hour = Math.floor(lf_per * 24 / 100);
                let min = Math.floor((lf_per * 24 % 100) * 6 / 10);

                start_tm_elem.value = `${hour >= 10 ? hour : '0'+hour.toString()}:${min >= 10 ? min : '0'+min.toString()}`

                // Setting Time Value
                start_time.setHours(hour);
                start_time.setMinutes(min);

            } else if (currentDraggedElement.id == "inp2" && lf_per > Number(inp1.style.left.replace('%', ''))) {
                inp2.style.left = `${lf_per}%`;
                task.style.width = `${lf_per - Number(inp1.style.left.replace('%', '')) + 2}%`

                // Time input
                if(!end_tm_elem)
                    return;

                lf_per += .25;
                let hour = Math.floor(lf_per * 24 / 100);
                let min = Math.floor((lf_per * 24 % 100) * 6 / 10);
                end_tm_elem.value = `${hour >= 10 ? hour : '0'+hour.toString()}:${min >= 10 ? min : '0'+min.toString()}`

                // Setting Time Value
                end_time.setHours(hour);
                end_time.setMinutes(min);
            } else 
                return;
        }

    }

    function clearElement() {
        document.onmousemove = null;
        document.onmouseup = null;
        currentDraggedElement = null;
    }

    // Set Default priority
    let pr_inp = document.getElementById("priority");
    if( !pr_inp )
        return;
    (pr_inp as HTMLInputElement).value = "A";



    // ------------- The Task Type -------------------
    let is_timed = false;
    let timed_inp = document.getElementById("timed") as HTMLInputElement;
    let priority = document.getElementById("priority") as HTMLInputElement;

    if( !timed_inp )
        return;
    if ( !priority )
        return;

    // default 
    priority.checked = true;

    // on click events 
    priority.onchange = () => {
        is_timed = false;
        priority.checked = true;
        timed_inp.checked = false;
    }
    timed_inp.onchange = () => {
        is_timed = true;
        priority.checked = false;
        timed_inp.checked = true;
    }



    /*  ---- Form Submit Event ------------ */
    document.onsubmit = async function(e : SubmitEvent) {
        e.preventDefault();
        let name = (document.getElementById("name") as HTMLInputElement).value;
        name.replace("'", "");
        name.replace('"', "");
        if( !name )
            return;
        if( is_timed ) {

            let res = await fetch("http://localhost:3050/create_task", {method : "POST", 
                        body : JSON.stringify({
                            name : name,
                            task_type : 'F',
                            start_time : Math.floor(start_time.getTime() / 1000),
                            end_time : Math.floor(end_time.getTime() / 1000)
                        })
                });
        } else {
            let pr_inp = document.getElementById("priority");
            if( !pr_inp )
                return;
            
            console.log((pr_inp as HTMLInputElement).value)
            
            try {
                let res = await fetch("http://localhost:3050/create_task", {method : "POST", 
                                body : JSON.stringify({
                                    name : name.toString(),
                                    task_type : (pr_inp as HTMLInputElement).value,
                                    start_time : 0,
                                    end_time : 0
                                })
                        });
            } catch (err) {console.log(`Error : ${err}`)};

        }

        window.location.reload();
    }

}

function btn_add_click() {
    let createForm  = document.getElementById("create");
    if( !createForm ) 
        return;

    let mainForm = document.getElementById("main_tl");
    if( !mainForm )
        return;

    createForm.style.display = 'block';
    mainForm.style.display = 'none';

    set_inp();
}
function priority_click(e : MouseEvent) {
    let pr_inp = document.getElementById("priority");
    if( !pr_inp )
        return;

    let tg = e.target as HTMLElement;
    
    let selected_elem = document.getElementsByClassName("selected")[0];
    if(selected_elem) 
        selected_elem.className = selected_elem.className.replace("selected", '');

    tg.className += " selected";

    let f = tg.getAttribute('data-type');
    if( !f ) 
        return;
    (pr_inp as HTMLInputElement).value = f;
    console.log(f);

}