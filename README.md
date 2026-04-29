# 🍕 Pizzería MamaMia

¡Bienvenido al repositorio oficial del proyecto **Pizzería MamaMia**!

Este proyecto consiste en el desarrollo de una aplicación web interactiva y moderna para la gestión y simulación de una pizzería en línea. La plataforma está diseñada para ofrecer una experiencia de usuario fluida, abarcando desde la exploración del menú hasta la finalización de una compra (carrito y pago), además de incluir paneles de administración y perfiles de usuario.

## 🚀 ¿Qué se está elaborando?

Estamos construyendo el **Frontend** de un sistema integral de pedidos para una pizzería. Entre las principales funcionalidades y vistas que se han desarrollado o están en proceso de desarrollo, se incluyen:

- **Inicio (`index.html`)**: Página de bienvenida con promociones y navegación principal.
- **Menú (`menu.html`)**: Catálogo interactivo de pizzas y productos.
- **Carrito de Compras (`carrito.html`)**: Gestión de productos seleccionados, cálculo de totales.
- **Proceso de Pago (`pago.html`)**: Formulario para procesar la transacción y los detalles de envío.
- **Panel de Administración (`admin.html`)**: Interfaz para gestionar productos y pedidos.
- **Autenticación (`login.html` / `perfil.html`)**: Inicio de sesión y gestión de la cuenta del cliente.
- **Páginas Informativas (`nosotros.html`, `contacto.html`)**: Información sobre la empresa y formularios de contacto.

El objetivo principal es crear una interfaz visualmente atractiva, responsiva y fácil de usar, sentando las bases para una futura integración con un backend robusto.

---

## 🛠 Herramientas y Tecnologías Utilizadas

Para el desarrollo de este proyecto, nos hemos enfocado en las tecnologías web fundamentales, asegurando un rendimiento óptimo y una alta compatibilidad:

*   **HTML5**: Para la estructuración semántica del contenido de todas las páginas web.
*   **CSS3**: Para el diseño, la maquetación (uso de Flexbox/Grid) y las animaciones visuales. (Actualmente evaluando migración a Tailwind CSS).
*   **JavaScript (Vanilla)**: Para la lógica del lado del cliente, interactividad del DOM, gestión del carrito y validación de formularios.
*   **Git**: Sistema de control de versiones distribuido para el seguimiento de los cambios en el código.
*   **GitHub**: Plataforma de alojamiento para los repositorios de Git y el trabajo colaborativo.
*   **VS Code / IDE Moderno**: Entorno de desarrollo principal.

---

## 💻 Comandos de Git y GitHub Utilizados

Durante el ciclo de desarrollo de este proyecto, se ha mantenido un control de versiones estricto. A continuación, se detallan los comandos principales de Git y GitHub que se utilizan para gestionar el flujo de trabajo:

### Inicialización y Configuración
*   `git init`: Inicializa un nuevo repositorio de Git en el directorio local.
*   `git clone <url-del-repositorio>`: Clona un repositorio de GitHub al entorno local.

### Gestión de Cambios (Staging & Commits)
*   `git status`: Muestra el estado actual del directorio de trabajo y del área de preparación (staging), indicando qué archivos han sido modificados.
*   `git add <archivo>` o `git add .`: Agrega los cambios específicos o todos los archivos modificados al área de preparación.
*   `git commit -m "Mensaje descriptivo"`: Guarda los cambios del área de preparación en el historial del repositorio local con un mensaje claro de lo que se modificó.

### Sincronización con GitHub (Repositorio Remoto)
*   `git remote add origin <url>`: Conecta el repositorio local con el repositorio remoto en GitHub.
*   `git push -u origin main` (o `master`): Sube los commits locales a la rama principal del repositorio remoto en GitHub.
*   `git pull`: Descarga y fusiona los últimos cambios del repositorio remoto al entorno de trabajo local.
*   `git fetch`: Descarga los cambios del repositorio remoto sin fusionarlos automáticamente.

### Gestión de Ramas (Branches) - Trabajo Colaborativo
*   `git branch`: Lista todas las ramas locales.
*   `git checkout -b <nombre-rama>`: Crea una nueva rama y cambia a ella de forma inmediata (útil para desarrollar nuevas características sin afectar el código principal).
*   `git checkout <nombre-rama>`: Cambia entre ramas existentes.
*   `git merge <nombre-rama>`: Fusiona la rama especificada con la rama en la que te encuentras actualmente.

---

*Proyecto desarrollado con pasión por la buena pizza y el código limpio.* 🍕💻
