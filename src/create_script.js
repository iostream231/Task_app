var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function set_inp() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        function dragElement(e) {
            currentDraggedElement = e.target.parentElement;
            console.log(currentDraggedElement);
            document.onmousemove = dragElementDoc;
            document.onmouseup = clearElement;
        }
        function dragElementDoc(e) {
            // I am going to cry :<
            var lf_per = (e.clientX - par.offsetWidth / 2.65) * 100 / par.offsetWidth;
            if (lf_per > 0 && lf_per < 98 && currentDraggedElement) {
                if (currentDraggedElement.id == "inp1" && lf_per < Number(inp2.style.left.replace('%', ''))) {
                    // Position Style
                    inp1.style.left = "".concat(lf_per, "%");
                    task.style.left = "".concat(lf_per + .5, "%");
                    task.style.width = "".concat(Number(inp2.style.left.replace('%', '')) - lf_per + 2, "%");
                    // Time input
                    if (!start_tm_elem)
                        return;
                    lf_per -= 1;
                    var hour = Math.floor(lf_per * 24 / 100);
                    var min = Math.floor((lf_per * 24 % 100) * 6 / 10);
                    start_tm_elem.value = "".concat(hour >= 10 ? hour : '0' + hour.toString(), ":").concat(min >= 10 ? min : '0' + min.toString());
                    // Setting Time Value
                    start_time.setHours(hour);
                    start_time.setMinutes(min);
                }
                else if (currentDraggedElement.id == "inp2" && lf_per > Number(inp1.style.left.replace('%', ''))) {
                    inp2.style.left = "".concat(lf_per, "%");
                    task.style.width = "".concat(lf_per - Number(inp1.style.left.replace('%', '')) + 2, "%");
                    // Time input
                    if (!end_tm_elem)
                        return;
                    lf_per += .25;
                    var hour = Math.floor(lf_per * 24 / 100);
                    var min = Math.floor((lf_per * 24 % 100) * 6 / 10);
                    end_tm_elem.value = "".concat(hour >= 10 ? hour : '0' + hour.toString(), ":").concat(min >= 10 ? min : '0' + min.toString());
                    // Setting Time Value
                    end_time.setHours(hour);
                    end_time.setMinutes(min);
                }
                else
                    return;
            }
        }
        function clearElement() {
            document.onmousemove = null;
            document.onmouseup = null;
            currentDraggedElement = null;
        }
        var par, inp1, inp2, task, elems, i, x, currentDraggedElement, start_tm_elem, end_tm_elem, start_time, end_time, pr_inp, is_timed, timed_inp, priority;
        return __generator(this, function (_b) {
            task = document.createElement('div');
            task.className = "new_task_tf";
            (_a = document.getElementById("time_sel")) === null || _a === void 0 ? void 0 : _a.appendChild(task);
            elems = document.getElementsByClassName("task_type");
            if (!elems)
                return [2 /*return*/];
            for (i = 0; i < elems.length; ++i)
                elems[i].addEventListener('click', priority_click);
            // First Marker
            if ((x = document.getElementById("inp1")) != null)
                inp1 = x;
            else
                return [2 /*return*/];
            // Second Marker
            if ((x = document.getElementById("inp2")) != null)
                inp2 = x;
            else
                return [2 /*return*/];
            // The parent element 
            if ((x = document.getElementById("inp")) != null)
                par = x;
            else
                return [2 /*return*/];
            if (!inp1)
                return [2 /*return*/];
            inp1.style.left = "30%";
            inp2.style.left = "50%";
            inp1.onmousedown = dragElement;
            inp2.onmousedown = dragElement;
            start_tm_elem = document.getElementById("st_tm");
            end_tm_elem = document.getElementById("ed_tm");
            start_time = new Date();
            start_time.setHours(7, 0);
            end_time = new Date();
            end_time.setHours(12, 0);
            pr_inp = document.getElementById("priority");
            if (!pr_inp)
                return [2 /*return*/];
            pr_inp.value = "A";
            is_timed = false;
            timed_inp = document.getElementById("timed");
            priority = document.getElementById("priority");
            if (!timed_inp)
                return [2 /*return*/];
            if (!priority)
                return [2 /*return*/];
            // default 
            priority.checked = true;
            // on click events 
            priority.onchange = function () {
                is_timed = false;
                priority.checked = true;
                timed_inp.checked = false;
            };
            timed_inp.onchange = function () {
                is_timed = true;
                priority.checked = false;
                timed_inp.checked = true;
            };
            /*  ---- Form Submit Event ------------ */
            document.onsubmit = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var name, res, pr_inp_1, res, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                e.preventDefault();
                                name = document.getElementById("name").value;
                                name.replace("'", "");
                                name.replace('"', "");
                                if (!name)
                                    return [2 /*return*/];
                                if (!is_timed) return [3 /*break*/, 2];
                                return [4 /*yield*/, fetch("http://localhost:3050/create_task", { method: "POST",
                                        body: JSON.stringify({
                                            name: name,
                                            task_type: 'F',
                                            start_time: Math.floor(start_time.getTime() / 1000),
                                            end_time: Math.floor(end_time.getTime() / 1000)
                                        })
                                    })];
                            case 1:
                                res = _a.sent();
                                return [3 /*break*/, 7];
                            case 2:
                                pr_inp_1 = document.getElementById("priority");
                                if (!pr_inp_1)
                                    return [2 /*return*/];
                                console.log(pr_inp_1.value);
                                _a.label = 3;
                            case 3:
                                _a.trys.push([3, 5, , 6]);
                                return [4 /*yield*/, fetch("http://localhost:3050/create_task", { method: "POST",
                                        body: JSON.stringify({
                                            name: name.toString(),
                                            task_type: pr_inp_1.value,
                                            start_time: 0,
                                            end_time: 0
                                        })
                                    })];
                            case 4:
                                res = _a.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                err_1 = _a.sent();
                                console.log("Error : ".concat(err_1));
                                return [3 /*break*/, 6];
                            case 6:
                                ;
                                _a.label = 7;
                            case 7:
                                window.location.reload();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return [2 /*return*/];
        });
    });
}
function btn_add_click() {
    var createForm = document.getElementById("create");
    if (!createForm)
        return;
    var mainForm = document.getElementById("main_tl");
    if (!mainForm)
        return;
    createForm.style.display = 'block';
    mainForm.style.display = 'none';
    set_inp();
}
function priority_click(e) {
    var pr_inp = document.getElementById("priority");
    if (!pr_inp)
        return;
    var tg = e.target;
    var selected_elem = document.getElementsByClassName("selected")[0];
    if (selected_elem)
        selected_elem.className = selected_elem.className.replace("selected", '');
    tg.className += " selected";
    var f = tg.getAttribute('data-type');
    if (!f)
        return;
    pr_inp.value = f;
    console.log(f);
}
