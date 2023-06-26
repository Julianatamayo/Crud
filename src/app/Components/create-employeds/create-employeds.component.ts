import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Service/user/user.service';

@Component({
  selector: 'app-create-employeds',
  templateUrl: './create-employeds.component.html',
  styleUrls: ['./create-employeds.component.css'],
})
export class CreateEmployedsComponent implements OnInit {
  crearUsuario: FormGroup;
  randomString: any;

  constructor(private fb: FormBuilder, private user: UserService) {
    this.crearUsuario = this.fb.group({
      identifiacion: ['', Validators.required],
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      rol: ['', Validators.required],
    });
    this.randomString = this.generateRandomString(28);
  }

  ngOnInit(): void {}

  enviarFormulario() {
    let data = {
      uid: this.randomString,
      email: this.crearUsuario.value.email,
      identificacion: this.crearUsuario.value.identifiacion,
      name: this.crearUsuario.value.name,
      apellido: this.crearUsuario.value.apellido,
      telefono: this.crearUsuario.value.telefono,
      password: this.crearUsuario.value.password,
      rol: this.crearUsuario.value.rol,
    };

    this.user.SetUserData(data, data);
    this.crearUsuario.reset();
  }

  generateRandomString(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
