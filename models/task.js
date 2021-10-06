const NewTask = require("./newTask");


class Task{
    _llista = {
        abc: 123,
      };

    constructor() {
        this._tasks = {};
    }

    get taskArr() {
        const list = [];
        Object.keys(this._tasks).forEach((k) => {
            list.push(this._tasks[k]);
        })
        return list;
    }

    createTask(name = "unnamed") {
        const task = new NewTask(name);
        this._tasks[task.id] = task;
    }

    loadTasksFromArray(e = []){
        e.forEach((n) => {
            this._tasks[n.id] = n;
        });
    };

    listTasks(){
        console.log();
        let count = 0;
        let n = false
        this.taskArr.forEach((e) => {
            const { task, state } = e;
            count += 1;
            let x =  state !== true ? `${'pendiente'.red}` : `${'completada'.green}`;
            console.log(`${`${count+'.'}`.green} ${task} - ${x}`);
            if(n === false){ n = true;}
        });
        if(n === false){
            console.log('Todavía no hay tareas'.red);
        }
    }

    listCompletedTasks(){
        console.log();
        let count = 0;
        let x = false;
        this.taskArr.forEach((e) => {
            const { task, state } = e;
            count += 1;
            if(state === true){
                console.log(`${`${count+'.'}`.green} ${task}`);
                if(x === false){ x = true;}
            }
        })
        if(x === false){
            console.log('Todavía no hay tareas completadas'.red);
        }
    }

    listUncompletedTasks(){
        console.log();
        let count = 0;
        let x = false;
        this.taskArr.forEach((e) => {
            const { task, state } = e;
            count += 1;
            if(state === false){
                console.log(`${`${count+'.'}`.green} ${task}`);
                if(x === false){ x = true;}
            }
        });
        if(x === false){
            console.log('Todavía no hay tareas pendientes'.red);
        }
    }

    async deleteTask(id) {
        delete this._tasks[id];
    }

    async changeStateTask(e = []){
        e.forEach((n) => {
            if(this._tasks[n].state === false){
                this._tasks[n].state = true;
            }else{
                this._tasks[n].state = false;
            }
        });        
    }
}


module.exports = Task;