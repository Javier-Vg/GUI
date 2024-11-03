"""
Django settings for Gui_backend project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--)w=hwu666smegfn6!7*9v=phhg9c5^*go-i$7x2b56o^&!6xk'
# settings.py

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'Gui_front_end', '192.168.100.42', '192.168.100.44','192.168.100.47', '192.168.100.13',"192.168.0.10","172.20.10.2",'192.168.1.119','192.168.100.39','192.168.0.11', '192.168.100.22']
CORS_ALLOWED_ORIGINS = [
    #Frontend
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://Gui_front_end:5173",
    "http://192.168.100.42:5173",
    "http://192.168.100.44:5173",
    "http://192.168.100.47:5173",
    "http://192.168.100.13:5173",
    "http://192.168.0.15:5173",
    "http://172.20.10.2:5173",
    "http://192.168.1.119:5173",
    "http://192.168.0.11:5173",
    "http://192.168.100.22:5173",
    
    
    
    #Backend
    "http://192.168.100.42:8000",
    
]

#La que termina en 13 es la de la otra compu 
# Application definition
CORS_ORIGIN_WHITELIST = [
 "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://Gui_front_end:5173",
    "http://192.168.100.42:5173",
    "http://192.168.100.44:5173",
    "http://192.168.100.47:5173",
    "http://192.168.100.13:5173",
    "http://192.168.0.15:5173",
    "http://172.20.10.2:5173",
    "http://192.168.1.119:5173",
    
    
    #Backend
    "http://192.168.100.42:8000",
    "http://192.168.100.39:8000",
    
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Gui',
    'Api.apps.ApiConfig',
    'rest_framework',
    'corsheaders',
    'Institucion',
    'staff',
    'contracts',
    'students',
    'groups',
    'materias',
    'grades',
    'schedule',
    'teaching_assistance',
    'student_assistance',
    'parents',
    'message',
    'events',
    'payments',
    'tasks',
    'Gastos',
    'group_assignment',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'contact',
    'users',
    'products'
    
] # nombre de las apps
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    
]

ROOT_URLCONF = 'Gui_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], #template de pasarela de pagos
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Gui_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = { #Se tiene ue crear una db con el nombre de 'default' antes de hacer el debugin
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Gui',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'mysql',   # Docker
        # 'HOST': 'localhost',   # local
        'PORT': '3306',
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# REST_FRAMEWORK = {
#      "DEFAULT_AUTHENTICATION_CLASSES": [
#         'rest_framework_simplejwt.authentication.JWTAuthentication',  # Clase de autenticación para JWT
#         'rest_framework.permissions.IsAuthenticated',  # Permitir acceso a usuarios autenticados solo
#     ],
#     #  'DEFAULT_PERMISSION_CLASSES': [
#     #     'rest_framework.permissions.AllowAny',  # Permitir acceso a cualquier persona por defecto
#     # ]
# }
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework_simplejwt.authentication.JWTAuthentication',  # O la clase que estés usando
#     ],
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.IsAuthenticated',  # Cambia según tus necesidades
#     ],
# }
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Mantén el backend por defecto para compatibilidad
]

AUTH_USER_MODEL = 'users.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60), #esto lo cambia a como quiera
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7), #esto lo cambia a como quiera
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}
#-------------------------IMGUR
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media' #Las imágenes cargadas se guardarán en media/images/.
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

from Api.Key import EMAIL_PASSWORD
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "guiinterfaz01@gmail.com"
EMAIL_HOST_PASSWORD = EMAIL_PASSWORD