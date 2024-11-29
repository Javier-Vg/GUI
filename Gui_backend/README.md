Para levantar el proyecto, sigue estos pasos:

1. **Crea el archivo `Key.py`:** Necesitas un archivo llamado `Key.py` que contenga las credenciales de la base de datos. Este archivo debe ubicarse dentro de la carpeta `Api`. Asegúrate de incluir las siguientes credenciales en `Key.py`:

```python
   clientId = FAKE_DATA
   KeyJWT = FAKE_DATA
   emailId = FAKE_DATA
   STRIPE_KEY_PUBLIC = FAKE_DATA
   STRIPE_KEY_SECRET = FAKE_DATA
   EMAIL_PASSWORD = FAKE_DATA
```

2. **Ejecuta el proyecto:** Una vez que hayas agregado las credenciales, ejecuta el siguiente comando en la terminal:

```bash
   docker compose up -d
```

3. **Configuración de Visual Studio:** Asegúrate de que Visual Studio esté configurado para usar LF como secuencia de fin de línea.

4. **Solución de errores:** Si encuentras el siguiente error:

   (HTTP code 400) unexpected - failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "./wait-for-it.sh": permission denied: unknown

   Necesitarás otorgar permisos al archivo `wait-for-it.sh` ejecutando:

```bash
   chmod +x wait-for-it.sh
```

5. **Instalación de dependencias:** Ejecuta las instalaciones en el siguiente orden en la terminal de Docker:

```bash
   pip install django-cors-headers
   pip install djangorestframework
   pip install djangorestframework-simplejwt
   pip install path.py
   pip install attrs
   pip install auth
   pip install timedelta
   pip install "PyJWT==1.7.1"
   pip install --upgrade djangorestframework-simplejwt
```

Estas dependencias se encuentran en el archivo `GUI.txt`.

6. **Instalación de `python-stripe`:** Finalmente, instala `python-stripe` con el siguiente comando:

```bash
   pip install python-stripe
```

7. **Reinicia Docker:** Reinicia Docker para que los cambios surtan efecto y el proyecto funcione correctamente.
