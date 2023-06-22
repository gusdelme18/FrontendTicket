import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pruebaFrontendTicket';
  public identity:any
  public token:any

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    console.log("app.compoenente cargado ");

    let identity = localStorage.getItem('token');
    console.log(identity);
    console.log(identity != "undefined" );
    console.log(identity != null );
    console.log(identity != '');
    if(identity != "undefined" && identity != null && identity && identity != '') {
      this.identity = identity;
      this.router.navigate(['/home']);
      console.log("entro valida")
    }else{
      this.identity = null;
    }
  }
  logout(){
    console.log("logout")
    localStorage.removeItem('token');
    localStorage.removeItem('dataUser');
    localStorage.clear();
    this.router.navigate(['']);
  }
}