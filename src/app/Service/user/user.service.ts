import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router
  ) {}

  // Registrar con usuario y contraseña
  SignUp(email: string, password: string, userInfo: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, userInfo);
      })
      .catch((error) => {
        console.log('ENTSADSADSADSAD');
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['dashboard']); //Si se registra para al dashboard
      });
  }

  //Guarda la informacion en database
  SetUserData(user: any, userInfo?: any) {
    const userRef: any = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      identificacion: userInfo.identificacion,
      name: userInfo.name,
      apellido: userInfo.apellido,
      telefono: userInfo.telefono,
      password: userInfo.password,
      rol: userInfo.rol,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  //Para iniciar session
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user: any) => {
          localStorage.setItem('uid', user.uid);
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      });
  }

  // Cerrar Session
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('uid');
      this.router.navigate(['login']);
    });
  }

  getUserData(uid: any) {
    return this.afs.collection('users').doc(uid).snapshotChanges();
  }

  getAllUserData() {
    return this.afs.collection('users').valueChanges(); //Manda toda la info
  }

  editInfoUser(uid: any, data: any) {
    return this.afs.collection('users').doc(uid).update(data);
  }

  deleteUser(uid: any) {
    return this.afs.collection('users').doc(uid).delete();
  }
}
