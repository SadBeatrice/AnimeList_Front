import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);


  constructor(){
    this.loginService.removerToken();
  }

  logar() {

    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){ // Usuario e senhas corretos
          this.loginService.addToken(token);
          this.router.navigate(['/admin/animes'])
        }else{ // incorretos
          alert('Usuario ou senha incorretos')
        }
      },
      error: erro =>{
        alert('Usuario ou senha incorretos')
      }
    })

  }

}
