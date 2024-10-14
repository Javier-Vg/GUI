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

    # # Si necesitas calcular automáticamente los totales, puedes definir métodos adicionales aquí.
    # # Sin embargo, los campos 'Total_ganancia', 'Total_gastos' y 'Balance' son opcionales y pueden ser calculados desde el backend.
    
    # # Ejemplo de validación o transformación de datos (opcional):
    # def validate_fecha(self, value):
    #     # Aquí podrías agregar validaciones específicas para la fecha, si es necesario
    #     return value

    # def validate_total_ganancia(self, value):
    #     # Podrías agregar validación si el total de ganancia es menor que el total de gastos
    #     if value is not None and self.initial_data.get('Total_gastos') and value < float(self.initial_data['Total_gastos']):
    #         raise serializers.ValidationError("El total de ganancia no puede ser menor que el total de gastos.")
    #     return value
