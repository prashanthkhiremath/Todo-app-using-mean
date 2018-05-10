import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todos: Todo[];
  demo: any[] = [];
  isEdit = false;
  success = false;
  isError = false;
  message = '';
  data: any = { 'id' : '', 'task': '', 'priority': '', 'completed': '', 'date': ''} ;

  // Calculating date
  now = new Date();
  date =  new Date(Date.UTC(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate() ));
  today = this.date.toISOString();
  lastday = new Date(this.date.setDate(this.date.getDate() - 1));
  nextday = new Date(this.date.setDate(this.date.getDate() + 2));
  yesterday = this.lastday.toISOString();
  tomorrow = this.nextday.toISOString();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.showTodos();
    console.log(this.tomorrow);
  }

  submit(f: NgForm, todo) {
    if (this.isEdit) {
      // update
      this.todoService.updateTodo(todo)
        .subscribe((result: any) => {
          this.suceesshandler(result, f);
        },
        (error) => {
          this.errorhandler(error);
        });
    } else {
      // create
      this.todoService.addTodo(f.value)
        .subscribe((result: any) => {
          this.suceesshandler(result, f);
          this.isEdit = false;
      },
      (error) => {
        this.errorhandler(error);
      });
    }
  }

  showTodos() {
    this.todoService.getTodos()
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
        for (let i = 0; i < todos.length; i++) {
          console.log(todos[i]['date']);
          this.demo.push(todos[i]['date']);
        }
        this.demo = _.uniq(this.demo);
      },
      (error) => {
        this.errorhandler(error);
      });
  }

  editTodo(todo) {
    this.datahandler(todo);
    this.isEdit = true;
  }

  updateTodo(todo, check) {
    if (check === 'on') {
      this.datahandler(todo);
    }
    this.todoService.updateTodo(this.data)
    .subscribe((result: Todo) => {
      this.showTodos();
    },
    (error) => {
      this.errorhandler(error);
    });
  }

  removeTodo(id) {
    this.todoService.removeTodo(id)
      .subscribe((result: Todo) => {
        this.showTodos();
      },
      (error) => {
        this.errorhandler(error);
      });
  }

  clearData() {
    this.data = { 'id' : '', 'task': '', 'priority': '', 'completed': '', 'date': ''};
  }

  datahandler(todo) {
    this.data.task = todo.task;
    this.data.completed = todo.completed;
    this.data.priority = todo.priority;
    this.data.id = todo._id;
    this.data.date = todo.date;
  }

  errorhandler(error) {
    this.isError = true;
    this.message = error;
    setInterval(() => {
      this.isError = false;
    }, 5000);
  }

  suceesshandler(result, f) {
    if (result) {
      this.success = true;
      this.message = result.message;
      this.showTodos();
      f.resetForm();
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }
  }
}
