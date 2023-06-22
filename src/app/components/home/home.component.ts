import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tickets:any = [];
  public token: any;
  public user:any;

  constructor(private ticketService: TicketsService){}

  ngOnInit(): void {
    this.getDataUser();
    this.getTickets();
  }
  getDataUser(){
    this.token = localStorage.getItem('token');
    this.user = localStorage.getItem('dataUser');
  }

  getTickets(){
    this.ticketService.getTicketAll(this.token)
    .subscribe((data) => {
     console.log(data);
     if(!data.success){
         Swal.fire('Error', 'No se pudo registrar por favor revisa: ' +data.data , 'error');
     }      
     this.tickets = data.data;
   },
   error => {
     console.log('error',error);
     Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
     return;
   }
 );
  }

  deleteTicket(idTicket:number){

    Swal.fire({
      title: 'Estas seguro que deseas eliminar el ticket?',
      showCancelButton: true,
      confirmButtonText: 'Borrar'
    }).then((result)=>{
      if(result.isConfirmed){
          this.ticketService.deleteTicket(idTicket, this.token)
          .subscribe((data) => {
            console.log(data);
            if(!data.success){
                Swal.fire('Error', 'No se pudo registrar por favor revisa: ' +data.data , 'error');
            }      
            this.getTickets();
          },
          error => {
            console.log('error',error);
            Swal.fire('Error', 'Se presente un problema en la conexion con el servidor, vuelva a intentar.', 'error');
            return;
          }
        );
      }
    })
    
    ;
    

   
  }

}
