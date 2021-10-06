const {inquirerMenu, pause, newTask, takeTaskId, checkCompletedTasks} = require('./helpers/inquirer');
const { guardarDB, readDB } = require("./helpers/saveDB");
const Task = require('./models/task');


const main = async () =>{
    let opt = '';
    const tasks = new Task();
    const db = readDB();
    if(db){
        tasks.loadTasksFromArray(db);
    }
    do{
        opt = await inquirerMenu();
        switch(opt){
            case "1":
                const taskName = await newTask('Nueva tarea:');
                tasks.createTask(taskName);
                console.log('\nTarea creada correctamente'.green);
                break;
            case "2":
                tasks.listTasks();
                break;
            case "3":
                tasks.listCompletedTasks();
                break;
            case "4":
                tasks.listUncompletedTasks();
                break;
            case "5":
                const completedTasks = await checkCompletedTasks(tasks.taskArr);
                if(completedTasks !== 0){
                    tasks.changeStateTask(completedTasks);
                    console.log('\nLas tareas se an completado/descompletado correctamente'.green);
                }
                break;
            case "6":
                const taskId = await takeTaskId(tasks.taskArr);
                tasks.deleteTask(taskId);
                console.log('Tarea eliminada correctamente'.green);
                break;
        }

        guardarDB(tasks.taskArr);
        await pause();
    }while(opt !== "0");
}

main();