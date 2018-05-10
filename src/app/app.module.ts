import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoService } from './add-todo/todo.service';

@NgModule({
  declarations: [AppComponent, AddTodoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
