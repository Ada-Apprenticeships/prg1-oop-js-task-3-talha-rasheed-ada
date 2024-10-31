PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

// Checks if value is a positive integer
function validInteger (value) { // value can be a string or a number (integer)
  return Number.isInteger(parseInt(value)) && String(parseInt (value)) === String (value) && Number(value) >= 0;
}  


function validatePriority(priority) { // value can be a string or a number (integer)
  const priorityValue = Number(priority);
  return[1,3,5,7].includes(priorityValue) ? priorityValue : PRIORITY["LOW"]
}

// Formats today's date and time as a string
function todaysDate() {
  const now = new Date();
   const year = now.getFullYear().toString();
   const month = (now.getMonth() + 1).toString().padStart(2, '0');
   const day = now.getDate().toString().padStart(2, '0');
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
 }

class Task  {
  _title;
  _priority;
  _added;

  constructor(title, priority) {
    this._title = title;
    this._priority = validatePriority(priority);
    this._added = todaysDate();
  }
    get title() {
      return this._title;
}
get priority () {
  return this._priority;
}
set priority (newPriority) {
  this._priority = validatePriority(newPriority);
}

get added() {
  return this._added;
}
}

class ToDo {
  constructor() {
    this.tasks = []; // Array to hold Task objects
}
// Adds a new task 
add(task){
  if (task instanceof Task) {
  this.tasks.push(task);
  return this.tasks.length;
  } else {
    throw new Error ('Invalid');
  }
}
// Allows task to be removed 
remove(title){
  const taskIndex = this.tasks.findIndex(task => task.title === title);
  if (taskIndex !== -1){
    this.tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
  
}
// Allows tasks to be filtered by priority
list(priority = 0) {
  return this.tasks
    .filter(task => priority === 0 || task.priority === priority)
    .map(task => [task.added, task.title, task.priority]);
}
task(title) {
  const task = this.tasks.find(task => task.title === title);
  if (!task) {
    throw new Error(`Task '${title}' Not Found`);
  }
  return task;
}
}   


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}