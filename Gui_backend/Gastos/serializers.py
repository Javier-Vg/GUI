from rest_framework import serializers
from .models import Gasto

class GastosSerializer(serializers.ModelSerializer):
    # Especificamos que el campo 'fecha' debe ser enviado como una fecha
    class Meta:
        model = Gasto
        fields = [
            'luz',
            'agua',
            'internet',
            'comida',
            'material_didactico',
            'patentes',
            'deduccion_caja',
            'polizas',
            'uniformes_comprados_cantidad',
            'uniformes_regalados_cantidad',
            'precio_uniformes',
            'fecha',
            'mensualidad_ninos_privados',
            'mensualidad_ninos_red_cuido',
            'Total_ganancia',
            'Total_gastos',
            'total',
            'alquiler_local',
            'institution',
            'balance'
        ]
