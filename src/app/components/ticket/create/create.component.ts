import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  formTicket!: FormGroup;
  loading = false;
  submitted = false;
  public token: any;
  public user:any;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketsService,
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(): void {
    this.formTicket = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', [Validators.required]]
    });
    this.getDataUser();
  }
  getDataUser(){
    this.token = localStorage.getItem('token');
    this.user = localStorage.getItem('dataUser');
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log("LLEGO")
    if (this.formTicket.invalid) {
      Swal.fire('Error', 'algunos campos están incorrectos.', 'error');
      return;
    }
    const ticket = { 
      title: this.formTicket.controls['title'].value, 
      description: this.formTicket.controls['description'].value,
      status: this.formTicket.controls['status'].value,
      users_id: 1
    };

    this.ticketService.createTicket(ticket,this.token)
     .subscribe((data) => {
      console.log(data);
      if(data.success){
        Swal.fire('Information', 'Se registro correctamente el ticket ', 'success');
        this.formTicket.reset();
        this.loading = false;
      }
      else {
          Swal.fire('Error', 'No se pudo registrar por favor revisa: ' +data.data , 'error');
          this.loading = false;

      }      
    },
    error => {
      console.log('error',error);
      Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
      this.loading = false;
      return;
    }
  );
  }

}
