## Configuración del Proyecto Frontend

Para iniciar el proyecto, sigue estos pasos:

1. **Configura las variables de entorno**

Crea el archivo `src/keys/keys.js` con las siguientes variables:

export const clientId = FAKE_DATA;
export const adminToken = FAKE_DATA;
export const key = FAKE_DATA;
export const mp = FAKE_DATA;
export const clave_publica = FAKE_DATA;

2. **Configuración del Backend**
Antes de ejecutar el frontend, asegúrate de configurar el backend:

- Actualiza el archivo `settings.py`:
  - Configura `ALLOWED_HOSTS` con las IPs permitidas
  - Configura `CORS_ALLOWED_ORIGINS` para permitir las conexiones del frontend

3. **Configuración de Usuarios**

Para configurar los usuarios del sistema:

a) Ejecuta las migraciones:

python manage.py migrate

b) Crea el superusuario (administrador del sistema):

python manage.py createsuperuser

- Este usuario tendrá acceso al panel de administración en: `http://localhost:8000/admin`
c) Crea el usuario de la aplicación:

- Accede a: `http://localhost:8000/api/gui/admins/`
- Este será el usuario para acceder a la aplicación
4. **Ejecutar el Proyecto**

Una vez completada la configuración, reinicia el servidor para aplicar los cambios.
