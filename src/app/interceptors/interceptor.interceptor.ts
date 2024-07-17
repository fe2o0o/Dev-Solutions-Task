import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderserviceService } from '../services/loaderservice.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderserviceService)

  loader.showLoading()
  return next(req).pipe(
    finalize(()=>loader.hideLoading())
  );
};
