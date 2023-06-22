import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  formTicket!: FormGroup;
  loading = false;
  submitted = false;
  tickets:any ;
  public token: any;
  public user:any;
  public idTicket:number = 0;

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
    this.route.params.subscribe(params => {
      this.idTicket = + params['id'];
      this.getTicket(this.idTicket);
   })
  }
  getDataUser(){
    this.token = localStorage.getItem('token');
    this.user = localStorage.getItem('dataUser');
  }
  getTicket(idTicket: number){

    this.ticketService.getTicketId(idTicket, this.token)
    .subscribe((data) => {
     console.log(data);
     if(!data.success){
         Swal.fire('Error', 'No se pudo registrar por favor revisa: ' +data.data , 'error');
     }  
     this.formTicket.get('title')?.setValue(data.data.title);
     this.formTicket.get('description')?.setValue(data.data.description);
     this.formTicket.get('status')?.setValue(data.data.status);
   },
   error => {
     console.log('error',error);
     Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
     return;
   }
 );

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

    this.ticketService.editTicket(this.idTicket,ticket,this.token)
      .subscribe((data) => {
        console.log(data);
        if(data.success){
          Swal.fire('Information', 'Se registro correctamente el ticket ', 'success');
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
