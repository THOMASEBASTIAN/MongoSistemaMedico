# 🏥 Proyecto de Sistema Hospitalario con MongoDB

## Tabla de Contenidos

| Seccion | Descripcion | 
|----------|----------|
| [dml](https://github.com/THOMASEBASTIAN/MongoSistemaMedico/tree/master/dml)| Aca encontraras todas las colecciones con todos los datos.   | 
| [dql](https://github.com/THOMASEBASTIAN/MongoSistemaMedico/tree/master/dql)| Aca encontraras los documentos con todas las consultas y las funciones  | 
| [Seguridad](https://github.com/THOMASEBASTIAN/MongoSistemaMedico/tree/master/seguridad)| Aca encontraras la seccion donde se asignan los roles  | 
| [Diagrama](https://github.com/THOMASEBASTIAN/MongoSistemaMedico/blob/master/Diagrama.png)| Aca encontraras la imagen del diagrama realizado en mermaid   | 
| [ddl](https://github.com/THOMASEBASTIAN/MongoSistemaMedico/tree/master/ddl)| Aca simplemente muestra como fueron creadas las colecciones   | 
| 


# 📌 Descripción General

El presente proyecto tiene como objetivo el diseño y desarrollo de un sistema de gestión hospitalaria basado en MongoDB, que permita administrar de manera integral todos los procesos relacionados con el funcionamiento de una red hospitalaria. Este sistema estará orientado a manejar eficientemente la información sobre hospitales, pacientes, personal médico, tratamientos, medicamentos, visitas médicas, historiales clínicos, áreas especializadas y personal administrativo, garantizando así una estructura de datos robusta, flexible y escalable.

## 🎯 Componentes Principales del Proyecto

### ⛃Modelado de Base de Datos

Se estructurará una base de datos NoSQL en MongoDB con colecciones que reflejen las entidades clave del sistema:

* **Hospitales**: cada hospital tendrá múltiples áreas especializadas y será supervisado por un director general.

* **Pacientes**: se gestionará su información personal, seguros médicos, diagnósticos, tratamientos y visitas médicas.

* **Personal**: se diferenciarán varios roles (directores, médicos, enfermeros, administrativos y mantenimiento), cada uno con sus atributos específicos.

* **Tratamientos y Medicamentos**: se almacenará información sobre terapias disponibles, costos y stock de medicamentos.

* **Visitas Médicas**: se documentará cada atención médica, con fecha, médico asignado, diagnóstico y seguimiento.

### 🗃️Consultas MongoDB

El sistema contará con 100 consultas especializadas que permitirán obtener información clave sobre:

* Estado y recursos de cada hospital.

* Inventario y disponibilidad de medicamentos.

* Diagnósticos y evolución de los pacientes.

* Distribución y desempeño del personal.

* Análisis estadístico de enfermedades, tratamientos y visitas médicas.

Se desarrollarán tambien 20 consultas con **agregaciones avanzadas**, utilizando operadores como ```$lookup```, ```$unwind```, ```$group```, ```$project```, ```$regex```, entre otros, para obtener análisis cruzados y reportes complejos.

### ✅Funciones JavaScript Simuladas (UDF)

Se crearán 20 funciones reutilizables utilizando JavaScript en MongoDB, para automatizar tareas y consultas frecuentes como:

* Cálculo de inventarios por hospital.

* Reportes de diagnósticos más comunes.

* Estadísticas de tratamientos aplicados por área médica.

Estas funciones podrán almacenarse en ```db.system.js``` para su uso desde MongoDB Compass o Shell.

### 👨🏻‍💻Control de Acceso por Roles

Se implementará un esquema de roles con autenticación basada en usuarios, aprovechando las capacidades de MongoDB para el control de permisos. Se definirán 5 niveles de acceso:

* **Director General**: acceso completo al sistema.

* **Médico Especialista**: acceso a pacientes y diagnósticos.

* **Enfermero/a**: acceso restringido a pacientes asignados.

* **Administrativo**: gestión de recursos y logística interna.

* **Mantenimiento**: acceso exclusivo a información de infraestructura.


## ❗Requisitos del Sistema
 
Para ejecutar correctamente los scripts y consultas del sistema hospitalario, se requiere tener instalado **MongoDB versión 8.0.12** o superior, así como un cliente gráfico como **MongoDB Compass** para facilitar la visualización y pruebas de datos.

## 🛠️ Instalación y Configuración

Sigue estos pasos para configurar el entorno y cargar correctamente la base de datos hospitalaria en MongoDB:

1. **Instala MongoDB**  
   Asegúrate de tener **MongoDB versión 8.0.12** o superior instalada en tu sistema.

2. **Instala MongoDB Compass**  
   Se recomienda usar **MongoDB Compass** como cliente gráfico para una administración más visual y sencilla de la base de datos.

3. **Clona o descarga el repositorio del proyecto**  
   Para esto abriremos la terminal, iniciaremos git con el siguiente comando: ```git init```, y luego de esto copiaremos el link de este repositorio y lo pegaremos en el siguiente comando asi: ```git pull https://github.com/THOMASEBASTIAN/MongoSistemaMedico``` o tambien lo podemos clonar, simplemente cambiando el ```pull```por ```clone```, luego de esto ya tendremos acceso a los siguientes archivos `.json`:

   - `hospitalDB.hospitals.json`  
   - `hospitalDB.patients.json`  
   - `hospitalDB.medications.json`  
   - `hospitalDB.treatments.json`  
   - `hospitalDB.medicalVisits.json`  
   - `hospitalDB.personnel.json`

4. **Importar las colecciones en MongoDB**  
   Usa el siguiente comando en terminal para importar cada colección. Asegúrate de estar en el mismo directorio donde se encuentran los archivos `.json`:

   ```bash
   mongoimport --db sistema_hospitalario --collection hospitals --file hospitalDB.hospitals.json --jsonArray
   mongoimport --db sistema_hospitalario --collection patients --file hospitalDB.patients.json --jsonArray
   mongoimport --db sistema_hospitalario --collection medications --file hospitalDB.medications.json --jsonArray
   mongoimport --db sistema_hospitalario --collection treatments --file hospitalDB.treatments.json --jsonArray
   mongoimport --db sistema_hospitalario --collection medicalVisits --file hospitalDB.medicalVisits.json --jsonArray
   mongoimport --db sistema_hospitalario --collection personnel --file hospitalDB.personnel.json --jsonArray



5. **Ejecutar consultas MongoDB**

Las consultas estan organizadas en un archivo llamado dql_select.js. Puedes ejecutarlas:

* Desde MongoDB , pegando directamente las consultas.

* Desde mongosh, copiando y pegando el código del archivo.




## 🧱 Estructura de la Base de Datos

El sistema hospitalario está compuesto por varias colecciones que representan las entidades principales del dominio. A continuación se presenta un resumen de cada colección y su propósito dentro del sistema, así como las relaciones entre ellas:

![Diagrama](https://ibb.co/Zp5B5ykP)


#### 🏥 `Hospitals`
Representa a cada hospital registrado en el sistema. Incluye información básica como nombre, dirección, teléfono y correo. Está relacionado con el personal que trabaja allí y los medicamentos disponibles en sus instalaciones.

#### 🧑‍⚕️ `Personnel`
Contiene los datos del personal de los hospitales, como médicos, enfermeros, administrativos y personal de mantenimiento. Cada empleado está asociado a uno o varios hospitales según su rol.

#### 🧍‍♂️ `Patients`
Guarda la información personal de los pacientes, incluyendo seguros médicos y su número de historia clínica. Está vinculado a visitas médicas, tratamientos recibidos e historiales clínicos.

#### 💉 `Treatments`
Describe los tratamientos médicos disponibles, incluyendo su nombre, descripción, área médica relacionada y costo. Estos tratamientos son usados tanto en visitas médicas como en historiales clínicos.

#### 💊 `Medications`
Registra los medicamentos disponibles, especificando el tipo, fabricante, disponibilidad y nombre. Pueden estar asociados tanto a hospitales como a historiales clínicos de los pacientes.

#### 📋 `MedicalVisits`
Representa las visitas médicas realizadas por los pacientes. Cada documento contiene la fecha, hora, diagnóstico, tratamiento aplicado y el paciente atendido.

#### 🗂️ `HistorialClinico` *(Historial clínico)*
Centraliza la información de los diagnósticos, tratamientos realizados, resultados obtenidos y medicamentos usados en el seguimiento del paciente. Está directamente relacionado con pacientes, tratamientos y medicamentos.

---

### 🔗 Relaciones entre Colecciones

- Un hospital puede tener múltiples empleados y múltiples medicamentos asociados.
- Un paciente pertenece a un hospital y puede tener múltiples visitas médicas y un historial clínico.
- Cada historial clínico conecta al paciente con los tratamientos y medicamentos que ha recibido.
- Las visitas médicas se relacionan con pacientes y registran diagnósticos y tratamientos realizados.
- El personal también puede ser filtrado por tipo de rol (director, médico, enfermero, etc.).



## 🔎Ejemplos de Consultas

**Estos son algunos ejemplos de consultas simples**

* Encontrar todos los hospitales en Bucaramanga:

```javascript
db.hospitals.find({ direccion: /Bucaramanga/i })
```

* Listar hospitales con "Cardiología" como área especializada:

```javascript
db.hospitals.find({ areasEspecializadas: "Cardiología" })
```

* Contar cuántos hospitales tienen un email que termina en ".com":

```javascript
db.hospitals.countDocuments({ email: /\.com$/ })
```

**Y tambien algunos ejemplos de consultas avanzadas:**

* Encontrar visitas cuya hora empiece con "08":

```javascript
db.medicalVisits.find({ hora: /^08/ })
```

* Encontrar hospitales cuya dirección contenga "Carrera" seguida de cualquier número:

```javascript
db.hospitals.find({ direccion: /Carrera \d+/i })
```

## ⚙️Ejemplo de funciones

Estas funciones almacenadas en MongoDB te permiten interactuar con tus datos de manera más eficiente y realizar consultas complejas con una simple llamada. Simplifican tareas comunes, desde buscar información específica hasta generar reportes detallados, por ejemplo:

* *1.*

```
getVisitasPorPaciente(pacienteId)
```

Esta función te permite obtener todas las visitas médicas asociadas a un paciente específico utilizando su ID. Es ideal para ver el historial de atención de un individuo de forma rápida, por ejemplo, si quieres ver el id de algun paciente en especifico, solo tienes que pegar el id del paciente entre las comillas, asi: ```getVisitasPorPaciente("60c72b2f9e4b7b1b7c2d0040")```

* *2.*

```
getMedicosPorEspecialidad(especialidad)
```
 Con esta función, puedes listar a todos los médicos que tienen una especialidad médica particular. Es muy útil para identificar rápidamente a los profesionales en un área específica, por ejemplo, si quieres ver todos los medicos que tienen la especialidad de Geriatria, simplemente pones la especialidad entre las comillas, asi: ```getMedicosPorEspecialidad("Geriatría")```


* *3.*

 ```
contarVisitasPorEspecialidad()
 ```
Esta función cuenta el número total de visitas médicas realizadas para cada especialidad. Es perfecta para análisis de carga de trabajo por área o para identificar qué especialidades tienen mayor demanda de consultas.


## 🔐 Roles de Usuario y Permisos

El sistema define 5 tipos de usuarios, cada uno con permisos específicos basados en sus funciones dentro del hospital. A continuación se describen los roles y sus respectivos niveles de acceso:

| Rol                  | Descripción                                                | Permisos asignados                                                    |
|----------------------|------------------------------------------------------------|------------------------------------------------------------------------|
| **Director General** | Supervisa toda la gestión del hospital.                   | Acceso total: lectura y escritura sobre todas las colecciones.        |
| **Médico Especialista** | Atiende pacientes, realiza diagnósticos y aplica tratamientos. | Acceso de lectura/escritura sobre pacientes, visitas médicas y tratamientos. |
| **Enfermero/a**       | Asiste a los médicos y cuida pacientes.                   | Acceso de solo lectura a pacientes asignados y visitas médicas.       |
| **Administrativo**    | Gestiona recursos, personal y logística.                  | Lectura/escritura sobre personal, inventarios y medicamentos.         |
| **Mantenimiento**     | Se encarga del mantenimiento e infraestructura.           | Acceso limitado a reportes de mantenimiento o tareas relacionadas (solo lectura). |

---


## 👨🏻‍💻-👨🏻‍💻Contribuiciones

A continuacion, mencionare los integrantes que colaboraron para este proyecto y en que contribuyeron:

* **Sergio Andres Rueda Hernandez** ([Git-Hub](https://github.com/xergio-rh))

Colaboracion mutua en el desarrollo de el diagrama E-R para la facilidad de comprension de datos, Colaboracion en la creacion de datos para la base de datos, Colaboracion en la creacion de consultas y funciones y Colaboracion con el desarrollo de la documentacion en formato Markdown.

* **Thomas Sebastian Bastos Garcia** ([Git-Hub](https://github.com/THOMASEBASTIAN))

Colaboracion mutua en el desarrollo de el diagrama E-R para la facilidad de comprension de datos, Colaboracion en la creacion de datos para la base de datos, Colaboracion en la creacion de consultas y funciones y Colaboracion con el desarrollo de la documentacion en formato Markdown.

##### Colaboracion:

Durante el desarrollo de este proyecto, hubo una comunicacion excelente entre erquipo para sacar este proyecto adelante, nadie hizo mas que el otro, ambos realizamos todas las partes de cada proyecto, asi asegurandonos que cada uno entienda cada seccion que debe tener MongoDB.


## 📞Licencia y Contacto:

En caso de cualquier duda e inquietud con el proyecto, no dudes en contactarnos y preguntarnos:

* **Sergio Rueda**

**Telefono**: (+57) 316 3644960

([Linkedin](https://www.linkedin.com/in/sergio-andres-rueda-hernandez-bb3161377/))




* **Thomas Bastos**

**Telefono**: (+57) 301 6681835

([Linkedin](https://www.linkedin.com/in/thomas-sebastian-bastos-garcia-906a3630b/))
















