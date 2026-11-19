import { Component } from '@angular/core';
import { TasksForm } from '../tasks-form/tasks-form';

@Component({
  selector: 'app-tasks-list',
  imports: [TasksForm],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {

  abrirForm = false;

}
