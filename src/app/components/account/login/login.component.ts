import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

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
              password: this.form.controls['password'].value 
            };
    console.log(user);
    this.authServices
    .login(user)
      .subscribe((data) => {
        console.log(data);
        if(data){
          localStorage.setItem(this.tokenKey, data.data.token);
          localStorage.setItem('dataUser', data.data.user);
          this.router.navigate(['/home']);
          this.submitted = false;
          this.loading = false;

        }
        
      },
      error => {
        console.log('error');
        Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
        this.submitted = false;
          this.loading = false;
        return;
      }
    );

  }

}
