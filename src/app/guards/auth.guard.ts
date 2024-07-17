import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export const authGuard: CanActivateFn = (route, state) => {
  let isBrowser: Boolean = false;
  const platformId = inject(PLATFORM_ID)
  isBrowser = isPlatformBrowser(platformId)
  const router = inject(Router)
  if (isBrowser ? localStorage.getItem('userRole') !== null : false) {
    
    return true
  } else {
      router.navigate(['login'])
    return false
  }
};
