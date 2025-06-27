import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Empleado {
  numeroEmpleado: string;
  nombre: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormdataService {
  private empleadosSource = new BehaviorSubject<Empleado[]>([]);
  empleados$ = this.empleadosSource.asObservable();

  constructor() { 
    const datosIniciales: Empleado[] = [
      {
        numeroEmpleado: '1',
        nombre: 'Eduardo Contrero',
        correo: 'eduardo@gmail.com',
        telefono: '477837465',
        fechaNacimiento: '12/03/00',
        gender: 'Masculino'
      },
      {
        numeroEmpleado: '2',
        nombre: 'Ana Torres',
        correo: 'ana@gmail.com',
        telefono: '477093615',
        fechaNacimiento: '10/02/03',
        gender: 'Femenino'
      }
    ];
    this.empleadosSource.next(datosIniciales);
  }

  generarNuevoNumeroEmpleado(): string {
    const empleados = this.empleadosSource.value;
    if (empleados.length === 0) return '1';
    
    const maxNumero = Math.max(...empleados.map(e => parseInt(e.numeroEmpleado)));
    return (maxNumero + 1).toString();
  }

  agregarEmpleado(empleado: Empleado) {
    const currentEmpleados = this.empleadosSource.value;
    this.empleadosSource.next([...currentEmpleados, empleado]);
  }

  eliminarEmpleado(index: number) {
    const currentEmpleados = this.empleadosSource.value;
    currentEmpleados.splice(index, 1);
    this.empleadosSource.next([...currentEmpleados]);
  }

  getEmpleados(): Empleado[] {
    return this.empleadosSource.value;
  }
}