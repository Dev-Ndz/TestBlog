import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    console.log("set access control");
    let cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return next(cloned);
  } else {
    console.log("set access control");
    let cloned = req.clone({
      setHeaders: {

      },
    });
    return next(cloned);
  }
};

function getJwtToken(): string | null {
  return localStorage.getItem("JWT_TOKEN");
}
