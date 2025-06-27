import { Component, Input } from '@angular/core';
import { FormdataService } from '../../services/formdata.service';

interface Employee {
  numeroEmpleado: number;
  nombre: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  sexo: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  empleados: any[] = [];

  constructor(private formDataService: FormdataService) {}

  ngOnInit() {
    this.formDataService.empleados$.subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  eliminarEmpleado(index: number) {
    this.formDataService.eliminarEmpleado(index);
  }
}
