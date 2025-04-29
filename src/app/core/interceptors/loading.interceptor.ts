// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Optional: skip loading for some requests
  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) {
    return next(req);
  }

  loadingService.startLoading();

  return next(req).pipe(
    finalize(() => loadingService.stopLoading())
  );
};
