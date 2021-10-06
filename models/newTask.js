const { v4: uuidv4 } = require("uuid");

class NewTask {
  id = "";
  task = "";
  state = false;

  constructor(task) {
    this.id = uuidv4();
    this.task = task;
  }
}

module.exports = NewTask;
