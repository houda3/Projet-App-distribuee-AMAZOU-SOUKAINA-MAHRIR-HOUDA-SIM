import { Component, OnInit } from '@angular/core';
import { GestionUsersService } from 'src/app/gestion-users.service';

@Component({
  selector: 'app-gestion-utilisateurs',
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.scss']
})
export class GestionUtilisateursComponent implements OnInit {

  utilisateurs:any[]=[];
  utilisateur= {
    id: null,
    nom: '',
    username:'',
    email:'',
    pass:'',
    admin: false, 
  }
  constructor(
    private appService:GestionUsersService
  ){}
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.appService.getAll().subscribe((data: any) => this.utilisateurs = data);
  }
  save(){
    if(this.utilisateur.id!){
      this.appService.update(this.utilisateur.id,this.utilisateur).subscribe(() =>this.getAll());
    }else{
      this.appService.create(this.utilisateur).subscribe(() =>this.getAll());
    }
    this.utilisateur={
      id: null,
    nom: '',
    username:'',
    email:'',
    pass:'',
    admin: false,
    }
  }
  edit(u: any){
    this.utilisateur={
      ...u
    };
  }
  delete(utilisateur: any){
    this.appService.delete(utilisateur.id).subscribe(()=> this.getAll());
  }
}
