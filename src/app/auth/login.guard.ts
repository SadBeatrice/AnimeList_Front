import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  if(loginService.hasPermission("USER") && state.url == '/admin/categories'){
    alert("Você não tem permissão para acessar essa página");
    return false;
  }

  if(loginService.hasPermission("USER") && state.url == '/admin/studios'){
    alert("Você não tem permissão para acessar essa página");
    return false;
  }

  return true;
};
