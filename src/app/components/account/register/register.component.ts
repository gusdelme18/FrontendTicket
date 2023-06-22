import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;
  loading = false;
  submitted = false;
  private tokenKey = 'token';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authServices: AuthenticationService,
  ){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log("LLEGO")
    if (this.form.invalid) {
      Swal.fire('Error', 'algunos campos están incorrectos.', 'error');
      console.log(this.form.invalid)
      console.log(this.form)
      return;
    }

    this.loading = true;

    const user = { 
              email: this.form.controls['email'].value, 
              password: this.form.controls['password'].value,
              name: this.form.controls['name'].value,
            };
    console.log(user);
    this.authServices
    .register(user)
      .subscribe((data) => {
        console.log(data);
        if(data.success){
          localStorage.setItem(this.tokenKey, data.data.token);
          localStorage.setItem('dataUser', data.data.user);
          this.router.navigate(['/home']);
        }
        else {
            Swal.fire('Error', 'No se pudo registrar por favor revisa: ' +data.data , 'error');

        }
        
      },
      error => {
        console.log('error',error);
        Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
        return;
      }
    );

  }

}
