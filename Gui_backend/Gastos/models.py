from django.db import models
from Institucion.models import Institution  # Importa el modelo de Institution

class Gasto(models.Model):
    # ID personalizado (opcional)
    id = models.AutoField(primary_key=True)  # Este campo es automático y único

    luz = models.DecimalField(max_digits=10, decimal_places=2)
    agua = models.DecimalField(max_digits=10, decimal_places=2)
    internet = models.DecimalField(max_digits=10, decimal_places=2)
    comida = models.DecimalField(max_digits=10, decimal_places=2)
    material_didactico = models.DecimalField(max_digits=10, decimal_places=2)
    patentes = models.DecimalField(max_digits=10, decimal_places=2)
    deduccion_caja = models.DecimalField(max_digits=10, decimal_places=2)
    polizas = models.DecimalField(max_digits=10, decimal_places=2)
    uniformes = models.DecimalField(max_digits=10, decimal_places=2)
    porcentaje_medico = models.DecimalField(max_digits=10, decimal_places=2)
    alquiler_local = models.DecimalField(max_digits=10, decimal_places=2)
    mensualidad_ninos_privados = models.DecimalField(max_digits=10, decimal_places=2)
    mensualidad_ninos_red_cuido = models.DecimalField(max_digits=10, decimal_places=2)
    balance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Campo para el balance
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Gasto: {self.luz}, {self.agua}, ... "  # Personaliza como necesites
