import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-form',
  imports: [],
  templateUrl: './tasks-form.html',
  styleUrl: './tasks-form.css',
})
export class TasksForm {
  nombreTarea: string = '';

  guardarTarea() {


    console.log("Tarea guardada");
  }
}
