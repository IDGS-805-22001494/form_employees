import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormdataService } from '../../services/formdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  employeeForm: FormGroup;
  today = new Date();

  genders = [ 
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private formDataService: FormdataService) {
        const nuevoNumero = this.formDataService.generarNuevoNumeroEmpleado();

    this.employeeForm = this.fb.group({
      numeroEmpleado: [{value: nuevoNumero, disabled: true}, Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit() {
    const fechaNacimientoControl = this.employeeForm.get('fechaNacimiento');
    const fechaNacimiento = fechaNacimientoControl ? new Date(fechaNacimientoControl.value) : null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaNacimiento && fechaNacimiento > hoy) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de nacimiento no puede ser mayor al día actual',
      });
      return;
    }
    if (this.employeeForm.valid) {
      const formValue = {
        ...this.employeeForm.value,
        numeroEmpleado: this.formDataService.generarNuevoNumeroEmpleado()
      }

      this.formDataService.agregarEmpleado(formValue);

      this.messageService.add({
        severity: 'success',
        summary: 'Registro exitoso',
        detail: 'Empleado registrado correctamente',
      });
      
      this.employeeForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos',
      });
    }
  }
}