from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution
from django.utils import timezone  # Mejor usar timezone para la fecha

class Gasto(models.Model):
    luz = models.DecimalField(max_digits=10, decimal_places=2)
    agua = models.DecimalField(max_digits=10, decimal_places=2)
    internet = models.DecimalField(max_digits=10, decimal_places=2)
    comida = models.DecimalField(max_digits=10, decimal_places=2)
    material_didactico = models.DecimalField(max_digits=10, decimal_places=2)
    patentes = models.DecimalField(max_digits=10, decimal_places=2)
    deduccion_caja = models.DecimalField(max_digits=10, decimal_places=2)
    polizas = models.DecimalField(max_digits=10, decimal_places=2)
    uniformes_comprados_cantidad = models.PositiveIntegerField(default=0)
    uniformes_regalados_cantidad = models.PositiveIntegerField(default=0)
    precio_uniformes = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField(default=timezone.now)  # Usar timezone para evitar problemas de tiempo
    mensualidad_ninos_privados = models.DecimalField(max_digits=10, decimal_places=2)
    mensualidad_ninos_red_cuido = models.DecimalField(max_digits=10, decimal_places=2)
    Total_ganancia = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Enviado desde el frontend
    Total_gastos = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Este campo puede ser calculado
    total = models.DecimalField(max_digits=10, decimal_places=2,default=0)  # Cambié a 2 decimales
    alquiler_local = models.DecimalField(max_digits=10, decimal_places=2)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Gasto del {self.fecha}: {self.Total_ganancia} ganancias, {self.Total_gastos} gastos"
