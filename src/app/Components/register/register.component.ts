import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService) {
    this.registrarUsuario = this.fb.group({
      identifiacion: ['', Validators.required],
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  enviarFormulario() {
    let data = {
      identificacion: this.registrarUsuario.value.identifiacion,
      name: this.registrarUsuario.value.name,
      apellido: this.registrarUsuario.value.apellido,
      telefono: this.registrarUsuario.value.telefono,
      email: this.registrarUsuario.value.email,
      password: this.registrarUsuario.value.password,
      rol: this.registrarUsuario.value.rol,
    };

    this.user.SignUp(
      this.registrarUsuario.value.email,
      this.registrarUsuario.value.password,
      data
    );
  }
}
