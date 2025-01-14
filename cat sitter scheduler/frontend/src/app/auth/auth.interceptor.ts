import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storedToken = localStorage.getItem('token');

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return next(req);
};
