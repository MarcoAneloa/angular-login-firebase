import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.authService.newUser(this.usuario)
      .subscribe(
        data => {
          Swal.close();
          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          }
          this._router.navigateByUrl('/home');
          console.log(data
          )
        },
        err => {
          console.log(err.error.error);
          Swal.fire({
            allowOutsideClick: false,
            type: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message
          });

        });
  }


}
