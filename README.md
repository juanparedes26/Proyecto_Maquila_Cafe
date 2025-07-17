# ☕ Proyecto Maquila Café - Beta v1

Este es un proyecto **fullstack** que desarrollé en solitario para ayudar a mi papá a llevar el control de su negocio de maquilas de café. Antes, todo lo hacía a mano: anotaciones en cuadernos, cálculos con calculadora y mucho trabajo repetitivo. Esta aplicación digitaliza por completo ese proceso, permitiéndole gestionar clientes y maquilas desde cualquier dispositivo.

---

## 📌 ¿Qué es una maquila de café?

Una **maquila** es el proceso de transformar café crudo en café tostado y empacado. Mi papá ofrece este servicio tanto a marcas propias como a personas naturales que venden su café en mercados o comunidades.  
El proceso incluye:

- Trilla  
- Tostión (claro, medio u oscuro)  
- Empaque (bolsa o sin empaque)  
- Entrega  

---

## 🚀 ¿Qué hace esta app?

- ✅ Registro y edición de clientes (nombre, celular)
- ✅ Registro de maquilas asociadas a cada cliente:
  - Peso de café ingresado
  - Tipo de proceso: granel o empacado
  - Tipo de tostión: claro, medio, oscuro
  - Tipo de empaque: bolsa o sin empaque
  - Observaciones adicionales
  - Cálculo automático del precio según reglas del negocio
  - Estado de maquila: en proceso o finalizada
- ✅ Visual dividida entre maquilas en proceso y finalizadas
- ✅ Botón “ver más” para cargar maquilas sin recargar la página
- ✅ Edición de maquilas existentes
- ✅ Autenticación protegida para que solo el administrador (mi papá) tenga acceso

---

## 🛠️ Tecnologías utilizadas

| Parte       | Tecnologías                             |
|-------------|------------------------------------------|
| Frontend    | React, Bootstrap, React Toastify         |
| Backend     | Flask, SQLAlchemy                        |
| Base de datos | SQLite (modo local de pruebas)         |
| Autenticación | JSON Web Tokens (JWT)                  |
| Diseño base | Layout inspirado en Federico Serron      |

---

## 📈 Estado actual

El sistema ya es completamente funcional para el uso que mi papá necesitaba:

- ✅ Crear y editar clientes
- ✅ Registrar y modificar maquilas
- ✅ Calcular precios automáticamente
- ✅ Filtrar maquilas entre “En proceso” y “Finalizadas”
- 🔒 Sistema de acceso privado con autenticación JWT

### Próximas mejoras:
- 🎨 Mejorar el diseño para hacerlo aún más intuitivo  
- 📊 Generar reportes mensuales descargables  

---

## ❤️ ¿Por qué es especial para mí?

Este no es solo un ejercicio de código. Es una herramienta real que está **mejorando la vida de alguien cercano**.  
Más allá de lo técnico, representa lo que siempre he visto en casa: **trabajo, café y esfuerzo diario**.

Fue mi primer proyecto **fullstack** completo, hecho desde cero. Me ayudó a pasar de ser estudiante a creador, poniendo en práctica mis conocimientos para resolver un problema real.

---

## 👨‍💻 Sobre mí

**Juan Manuel Paredes López**  
Desarrollador Fullstack Junior • Ingeniero Mecatrónico  

Este proyecto representa mi paso de estudiante a desarrollador. No solo aprendí tecnologías nuevas, sino que también desarrollé la confianza de construir algo completo y funcional por mi cuenta.

📎 [Conéctate conmigo en LinkedIn](https://www.linkedin.com/in/juan-manuel-paredes-lopez-b7621224b)

---

## 📁 Repositorio

Este proyecto es público con fines de portafolio.

- 🔐 Está protegido (no permite edición externa ni múltiples usuarios)
- ⚠️ No está listo aún para producción comercial
- 🧱 Pero es una **base sólida y funcional** de lo que sé hacer

---

## ⚙️ Instalación rápida

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
