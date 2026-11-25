import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// Intercepteur : transforme chaque erreur HTTP en un simple message lisible.
// Les composants reçoivent directement le texte à afficher.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'Erreur inconnue';
      if (err.status === 0) {
        message = 'Impossible de contacter le serveur (la gateway est-elle démarrée ?)';
      } else if (err.error && err.error.details) {
        // erreurs de validation : on affiche chaque champ
        message = Object.values(err.error.details).join(' / ');
      } else if (err.error && err.error.message) {
        message = err.error.message;
      }
      console.error('Erreur API', err.status, message);
      return throwError(() => message);
    })
  );
};
