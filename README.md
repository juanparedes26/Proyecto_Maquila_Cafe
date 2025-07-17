# ☕ Proyecto Maquila Café - Beta v1

Este es un proyecto fullstack que desarrollé en solitario, pensado para ayudar a mi papá a llevar el control de su negocio de maquilas de café. Antes de esta app, todo lo hacía a mano: anotaciones en cuadernos, cálculos con calculadora, y mucho trabajo repetitivo. Yo quería aplicar lo que he aprendido en desarrollo web para resolver un problema real que él enfrenta todos los días. Así nació esta aplicación, que ahora le permite llevar el control digital de todos sus clientes y maquilas desde cualquier dispositivo.

Una *maquila* es el proceso de transformar café crudo en café tostado y empacado. Mi papá ofrece este servicio tanto a clientes empresariales con marca propia como a personas naturales que venden su café en mercados o comunidades. Cada maquila incluye etapas como trilla, tostión, empaque y entrega, y este proyecto permite registrar cada una, calcular automáticamente los valores según reglas predefinidas y llevar un historial ordenado de todo.

Haber construido esto solo, desde cero, como mi primer proyecto fullstack completo, es algo muy especial para mí. Fue un reto grande, pero también una experiencia muy significativa, porque no solo puse en práctica lo técnico, sino que construí algo que realmente mejora la vida de alguien cercano. Todo lo que ves aquí —el backend, frontend, diseño, autenticación, lógica de negocio— lo hice por mi cuenta.

## ¿Qué hace la app?

- Registro y edición de clientes (nombre, celular).
- Registro de maquilas asociadas a un cliente, incluyendo:
  - Peso de café ingresado.
  - Tipo de proceso (granel o empacado).
  - Tipo de tostión (claro, medio, oscuro).
  - Tipo de empaque (bolsa o sin empaque).
  - Cálculo automático de precio según las reglas del negocio.
  - Observaciones adicionales.
- Estado de maquila: se puede marcar como finalizada o dejar en proceso.
- Visual dividida entre maquilas en proceso y finalizadas.
- Botón "ver más" para cargar maquilas adicionales sin recargar la página.
- Edición de maquilas ya registradas.
- Autenticación protegida para que solo el administrador tenga acceso (mi papá).

## Tecnologías utilizadas

- **Frontend:** React + Bootstrap
- **Backend:** Flask + SQLAlchemy
- **Base de datos:** SQLite (modo local de pruebas)
- **Autenticación:** JWT
- **Notificaciones:** React Toastify
- **Diseño base:** Inspirado en un layout de [Federico Serron](https://www.linkedin.com/in/serron-federico/)
  
🚀 Estado actual
Este proyecto ya es completamente funcional para el uso que mi papá necesitaba.
✅ Puede crear clientes, registrar maquilas, calcular precios automáticamente, editar maquilas existentes y filtrar maquilas entre "En proceso" y "Finalizadas".
🔒 El sistema es de acceso privado.
📌 Próximamente incluiré funciones como:
-**Mejorar el diseño para hacerlo aún más intuitivo.
-**Generar reportes mensuales


❤️ ¿Por qué es especial para mí?
No es solo un ejercicio de código.
Es una herramienta real que está ayudando a mi familia.
Me permitió entender lo importante que es construir software útil, hecho a medida, que resuelva problemas reales.

Más allá del código, esto es una forma de aportar a lo que siempre he visto en casa:
el trabajo, el café, el esfuerzo diario.

☕️ Este fue mi primer proyecto fullstack hecho totalmente por mí, y siempre va a tener un lugar especial en mi camino como desarrollador.

👨‍💻 Sobre mí
Soy Juan Manuel Paredes López, desarrollador Fullstack Junior e Ingeniero Mecatrónico.
Este proyecto representa mi paso de estudiante a creador: no solo aprendí nuevas tecnologías, sino que desarrollé la confianza de construir algo completo y útil por mi cuenta.

📎 Conéctate conmigo en LinkedIn www.linkedin.com/in/juan-manuel-paredes-lopez-b7621224b

📁 Repositorio
Este proyecto es público con fines de portafolio.
🔐 Está protegido: no tiene funciones de edición externas ni usuarios múltiples.
⚠️ Aún no está listo para producción comercial, pero es una base sólida y real de lo que sé hacer.

💬 Cualquier comentario o sugerencia será bienvenida.

Gracias por leer y por llegar hasta aquí 🙌


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


