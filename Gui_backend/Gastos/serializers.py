from rest_framework import serializers
from .models import Gasto

class GastosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = [
        'id',
       'luz',
       'agua' ,
       'internet' ,
       'comida' ,
      'material_didactico' ,
       'patentes' ,
       'deduccion_caja',
      'polizas' ,
      'uniformes',
     'porcentaje_medico' ,
     'alquiler_local' ,
     'mensualidad_ninos_privados' ,
     'mensualidad_ninos_red_cuido' ,
     'balance'
        ]
