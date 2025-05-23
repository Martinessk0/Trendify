import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  await Swal.fire({
    icon: 'error',
    title: 'Access Denied',
    text: 'You must be logged in to access this page.',
    confirmButtonText: 'OK'
  });

  return router.createUrlTree(['/login']);
};
