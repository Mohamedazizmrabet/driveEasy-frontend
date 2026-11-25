import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Guard : refuse les URL dont l'id n'est pas un nombre (ex: /clients/abc) et renvoie à l'accueil
export const idGuard: CanActivateFn = (route) => {
  const id = Number(route.paramMap.get('id'));
  if (Number.isInteger(id) && id > 0) {
    return true;
  }
  return inject(Router).createUrlTree(['/dashboard']);
};
