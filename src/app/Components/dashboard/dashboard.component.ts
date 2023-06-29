import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allUsers: any;
  loggedUser: any;
  canEdit: boolean = false;
  canEditUser: boolean = true;

  constructor(private user: UserService) {}
  name: any;
  apellido: any;
  email: any;

  ngOnInit(): void {
    const userUid = localStorage.getItem('uid');

    this.user.getUserData(userUid).subscribe((data) => {
      this.loggedUser = data.payload.data();
      this.loggedUser.rol == 'Administrador' ? (this.canEdit = true) : null;
    });

    this.user.getAllUserData().subscribe((data) => {
      this.allUsers = data;
    });
  }

  logOut() {
    this.user.SignOut();
  }

  editUser() {
    this.canEditUser = !this.canEditUser;
  }

  editInfoUser(user: any) {
    user.name = this.name || user.name;
    user.apellido = this.apellido || user.apellido;
    user.email = this.email || user.email;
    this.user.editInfoUser(user.uid, user);
  }

  deleteInfoUser(uid: any) {
    this.user.deleteUser(uid);
  }

  capturarNombre(event: any) {
    this.name = event.target.value;
  }

  capturarApellido(event: any) {
    this.apellido = event.target.value;
  }

  capturarCorreo(event: any) {
    this.email = event.target.value;
  }
  
}
