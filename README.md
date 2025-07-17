# Proyecto Maquila Café - Beta v1

## ¿Qué es este proyecto?

**Proyecto Maquila Café** es una aplicación web que desarrollé para ayudar a mi papá en la gestión de maquilas de café.  
Él llevaba todo el registro de maquilas, clientes y cálculos de precios de forma manual, usando libretas y hojas de papel.  
Vi la oportunidad de facilitarle el trabajo y digitalizar el proceso, creando una herramienta sencilla y eficiente.

## ¿Por qué lo hice?

Mi papá es caficultor y administra el proceso de maquila para varios clientes:  
- Recibe café de diferentes personas.
- Lleva el control de trilla, tostión, empaque y entrega.
- Calcula precios y cantidades manualmente.

Esto le tomaba mucho tiempo y era fácil cometer errores o perder información.  
Quise ayudarlo con una solución digital que le permitiera:
- Registrar clientes y maquilas de forma rápida.
- Calcular precios automáticamente según reglas del negocio.
- Tener toda la información organizada y accesible desde cualquier dispositivo.

## ¿Qué hace la app?

- **Gestión de clientes:** Alta y edición de clientes con sus datos.
- **Registro de maquilas:** Cada cliente puede tener varias maquilas, con detalles como peso, grado de tostión, tipo de empaque, cantidad de libras, observaciones, etc.
- **Cálculo automático de precios:** El sistema calcula el precio total de cada maquila y lo muestra de forma clara.
- **Separación visual:** Las maquilas se muestran en dos apartados: "En proceso" y "Finalizadas", ordenadas por fecha (las más recientes primero).
- **Botón "Ver más":** Si hay muchas maquilas, puedes ver más registros en cada apartado.
- **Edición y actualización:** Puedes editar maquilas y los cambios se reflejan automáticamente.

## Tecnologías

- **Frontend:** React + Bootstrap
- **Backend:** Flask + SQLAlchemy
- **Autenticación:** JWT
- **Notificaciones:** React Toastify

## Instalación rápida

```bash
git clone https://github.com/tuusuario/proyecto-maquila.git
cd proyecto-maquila
# Backend
cd backend
pip install -r requirements.txt
flask run
# Frontend
cd ../frontend
npm install
npm start
```

## Estado actual

- **Versión Beta:** Funcionalidad principal lista para pruebas familiares.
- **Pendiente:** Mejoras visuales, exportación de datos, soporte para maquilas mixtas.

---

**Este proyecto es especial para mí porque nació de una necesidad real en mi familia.  
Si te interesa, quieres probarlo o tienes sugerencias, puedes contactarme por LinkedIn.**

Desarrollado por [Tu Nombre](https://www.linkedin.com/in/tuusuario/)
