import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error desconocido';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
        } else if (error.status === 400) {
          errorMessage = handleValidationErrors(error);
        } else if (error.status === 401) {
          errorMessage = 'No autorizado. Por favor, inicie sesión';
        } else if (error.status === 403) {
          errorMessage = 'No tiene permisos para realizar esta acción';
        } else if (error.status === 404) {
          errorMessage = 'Recurso no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        } else if (error.error?.detail) {
          errorMessage = error.error.detail;
        } else if (error.error?.error) {
          errorMessage = error.error.error;
        }
      }

      console.error('HTTP Error:', error);
      
      return throwError(() => ({ 
        status: error.status, 
        message: errorMessage,
        originalError: error 
      }));
    })
  );
};

function handleValidationErrors(error: HttpErrorResponse): string {
  if (error.error && typeof error.error === 'object') {
    const errors: string[] = [];
    Object.keys(error.error).forEach(key => {
      const fieldErrors = error.error[key];
      if (Array.isArray(fieldErrors)) {
        errors.push(`${key}: ${fieldErrors.join(', ')}`);
      } else {
        errors.push(`${key}: ${fieldErrors}`);
      }
    });
    return errors.join('. ');
  }
  return 'Error de validación';
}