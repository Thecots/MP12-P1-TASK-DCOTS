const inquirer = require('inquirer');
require('colors');

/* Opciónes del menú */
const p = [
    {
        type: "list",
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value : "1",
                name: `${'1'.green} Crear tarea`
            },
            {
                value : "2",
                name: `${'2'.green} Listar tareas`
            },
            {
                value : "3",
                name: `${'3'.green} Listar tareas completadas`
            },
            {
                value : "4",
                name: `${'4'.green} Listar tareas pendientes`
            },
            {
                value : "5",
                name: `${'5'.green} Completar tarea(s)`
            },
            {
                value : "6",
                name: `${'6'.green} Borrar tarea`
            },
            {
                value : "0",
                name: `${'0'.green} Salir`
            }
        ]
    }
];

/* Menú */
const inquirerMenu = async () => {
    console.clear();

    console.log('   ========================='.magenta);
    console.log(`     Seleccione una opción`.yellow);
    console.log('   ========================='.magenta);

    const {option} = await inquirer.prompt(p);
    return option;
};

/* Pausa  */
const pause = async () => {
    const question = [
        {
          type: "input",
          name: "enter",
          message: `Presiona [${"enter".yellow}] pera continuar`,
        },
      ];
      console.log("\n");
      await inquirer.prompt(question);
}

/* Nueva tarea */

const newTask = async (message) => {
    const question = [
        {
            type: "input",
            name: "e",
            message
        }
    ];
    const {e} = await inquirer.prompt(question);

    return e;
}

/* delte task */
const takeTaskId = async (e = []) => {

    const choices = e.map((e, i) => {
        const idx = `${i + 1}.`.green;
        return {
          value: e.id,
          name: `${idx} ${e.task}`,
        };
      });
    
      choices.unshift({
        value: "0",
        name: "0. ".green + "Cancelar",
      });
    
      const pregunta = [
        {
          type: "list",
          name: "id",
          message: "Selecciona una tarea para eliminar",
          choices,
        },
      ];
    
      const { id } = await inquirer.prompt(pregunta);
      return id;
}

const checkCompletedTasks = async (e = []) => {
    if(e.length === 0){
        console.log('\nTodavía no hay tareas'.red);
        return 0;
    }
    const choices= [];

    e.forEach((e) =>{
        let x = e.state === false ? `${e.task.red}` : `${e.task.green}`;
        choices.push(
            {
                value: e.id,
                name: x,
            }
        )
    })
    const pregunta = [
        {
          type: "checkbox",
          name: "id",
          message: "Selecciona tareas para completarla o descompletarlas",
          choices
        },
      ];
    
      const { id } = await inquirer.prompt(pregunta);
      return id;
}

module.exports = {
    inquirerMenu,
    pause,
    newTask,
    takeTaskId,
    checkCompletedTasks
}