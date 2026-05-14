# 📚 Course Management API

REST API para gestión de cursos, lecciones, estudiantes e inscripciones, construida con **TypeScript**, **Node.js**, **Express** y **PostgreSQL**.

---

## 🚀 Tecnologías

| Capa | Tecnología |
|---|---|
| Lenguaje | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Base de datos | PostgreSQL |
| Autenticación | JWT (JSON Web Tokens) |
| Logging | Morgan |

---

## ✨ Funcionalidades

- **Autenticación**: registro e inicio de sesión con JWT; rutas protegidas por token.
- **Gestión de cursos**: CRUD completo de cursos con autorización.
- **Gestión de lecciones**: creación y administración de lecciones asociadas a cursos.
- **Gestión de usuarios**: CRUD de usuarios registrados en la plataforma.
- **Inscripciones**: asociar estudiantes a cursos y consultar sus inscripciones activas.

---

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas** con separación clara de responsabilidades:

```
src/
├── config/          # Configuración de base de datos y variables de entorno
├── controllers/     # Manejo de peticiones HTTP (users, courses, lessons, enrollments)
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos (PostgreSQL)
├── routes/          # Definición de endpoints
├── middlewares/     # Autenticación JWT y manejo de errores
├── helpers/         # Utilidades y funciones reutilizables
├── errors/          # Clases de error personalizadas
├── types/           # Tipos e interfaces TypeScript
├── utils/           # Funciones auxiliares generales
├── app.ts           # Configuración de Express y registro de rutas
└── server.ts        # Punto de entrada
```

Cada módulo (users, courses, lessons, enrollments) sigue el mismo patrón:
`repository → service → controller → routes`, garantizando bajo acoplamiento y fácil mantenimiento.

---

## ⚙️ Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/course_db
JWT_SECRET=tu_secreto_aqui
JWT_EXPIRES_IN=7d
```

---

## 🛠️ Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/JuanPabloS-dev/course-management-api.git
cd course-management-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Ejecutar en desarrollo
npm run dev

# 5. Compilar para producción
npm run build && npm start
```

---

## 🔌 Endpoints

### Auth
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/register` | Registro de usuario |
| `POST` | `/login` | Inicio de sesión — devuelve JWT |

### Cursos
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/courses` | Listar todos los cursos |
| `GET` | `/courses/:id` | Obtener curso por ID |
| `POST` | `/courses` | Crear curso 🔒 |
| `PUT` | `/courses/:id` | Actualizar curso 🔒 |
| `DELETE` | `/courses/:id` | Eliminar curso 🔒 |

### Lecciones
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/lessons/:courseId` | Listar lecciones de un curso |
| `POST` | `/lessons` | Crear lección 🔒 |
| `PUT` | `/lessons/:id` | Actualizar lección 🔒 |
| `DELETE` | `/lessons/:id` | Eliminar lección 🔒 |

### Usuarios
| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/users` | Listar usuarios 🔒 |
| `GET` | `/users/:id` | Obtener usuario por ID 🔒 |
| `PUT` | `/users/:id` | Actualizar usuario 🔒 |
| `DELETE` | `/users/:id` | Eliminar usuario 🔒 |

### Inscripciones
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/enrollments` | Inscribir usuario a curso 🔒 |
| `GET` | `/enrollments/user/:id` | Cursos de un usuario 🔒 |
| `DELETE` | `/enrollments/:id` | Cancelar inscripción 🔒 |

> 🔒 Requiere token JWT en el header: `Authorization: Bearer <token>`

---

## 👤 Autor

**Juan Pablo Sarmiento Navarrete**  
[GitHub](https://github.com/JuanPabloS-dev) · juanpnavarrete0@gmail.com

---

## 📄 Licencia

MIT
