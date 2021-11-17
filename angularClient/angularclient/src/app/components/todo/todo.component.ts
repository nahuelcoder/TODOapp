import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todoService/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  todos: Todo[] = [];
  selectedTodo: Todo;
  // Show the next item
  @ViewChild('desc', { static: true }) desc: ElementRef;

  undoButton: boolean = false;

  private createForm() {
    this.todoForm = this.formBuilder.group({
      item: '',
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    this.createForm();
  }

  // To load all todos when TodoComponent is loaded
  ngOnInit() {
    this.todoService.getTodos().subscribe((res) => (this.todos = res));
  }

  // For Adding and Updating a Todo
  onSubmit(val: { item: string | null }) {
    if (val.item == null || val.item == '') {
      alert('Please enter a description for a new task');
    } else {
      // We got an object with the input value
      if (!this.selectedTodo) {
        const newTodo: Todo = {
          id: 0,
          description: val.item,
        };
        this.todoService
          .saveTodo(newTodo)
          .subscribe((res) => this.todos.push(res));
      } else {
        const updatedTodo: Todo = {
          // We need to provide the id to update an object
          id: this.selectedTodo.id,
          description: val.item,
        };
        this.todoService
          .updateTodo(updatedTodo)
          .subscribe(
            (res) =>
              (this.todos.filter((todo) =>
                this.isSameTodo(res, todo)
              )[0].description = res.description)
          );
      }
    }
    //this.selectedTodo = null;
    this.todoForm.reset();
  }

  deleteTodo(todoToRemove: Todo) {
    this.todoService.deleteTodo(todoToRemove).subscribe((res) => {
      // Remove from the todos array
      this.todos = this.todos.filter((todo) => todo.id !== todoToRemove.id);
    });
    this.undoButton = true;
  }

  selectATodo(todo: Todo) {
    this.selectedTodo = todo;
    // To populate the input box for edit
    this.todoForm.controls['item'].setValue(todo.description);
    // To focus on input
    this.desc.nativeElement.focus();
  }

  // Check if two items are the same
  isSameTodo(todoList: Todo, selectedTodo: Todo) {
    return todoList.id == selectedTodo.id;
  }
}
