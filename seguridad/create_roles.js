
//       SECURITY - Creación de Roles y Usuarios para hospitalDB  


// --- Seleccionar la Base de Datos ---
use('hospitalDB');

// --- 1. Rol: Director General ---
// Acceso total de lectura y escritura a todas las colecciones de la base de datos.

db.createRole({
  role: "rolDirectorGeneral",
  privileges: [
    {
      resource: { db: "hospitalDB", collection: "" }, // El collection vacío aplica a todas
      actions: ["find", "insert", "update", "remove"]
    }
  ],
  roles: []
});

// --- 2. Rol: Médico Especialista ---
// Puede leer pacientes y tratamientos, y gestionar completamente las visitas médicas.

db.createRole({
  role: "rolMedicoEspecialista",
  privileges: [
    {
      resource: { db: "hospitalDB", collection: "patients" },
      actions: ["find", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "medicalVisits" },
      actions: ["find", "insert", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "treatments" },
      actions: ["find"] 
    },
    {
      resource: { db: "hospitalDB", collection: "medications" },
      actions: ["find"] 
    }
  ],
  roles: []
});

// --- 3. Rol: Enfermero/a ---
// Acceso más limitado. Puede ver pacientes y medicamentos, y actualizar visitas médicas.

db.createRole({
  role: "rolEnfermero",
  privileges: [
    {
      resource: { db: "hospitalDB", collection: "patients" },
      actions: ["find"] 
    },
    {
      resource: { db: "hospitalDB", collection: "medicalVisits" },
      actions: ["find", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "medications" },
      actions: ["find"] 
    }
  ],
  roles: []
});

// --- 4. Rol: Personal Administrativo ---
// Gestiona recursos (personal, inventarios) y logística (pacientes, hospitales).

db.createRole({
  role: "rolAdministrativo",
  privileges: [
    {
      resource: { db: "hospitalDB", collection: "personnel" },
      actions: ["find", "insert", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "medications" },
      actions: ["find", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "hospitals" },
      actions: ["find", "update"] 
    },
    {
      resource: { db: "hospitalDB", collection: "patients" },
      actions: ["find", "insert"] 
    }
  ],
  roles: []
});

// --- 5. Rol: Personal de Mantenimiento ---
// Acceso mínimo, solo de lectura para ver la información de los hospitales (ej. direcciones).
print('Creando rol: Personal de Mantenimiento...');
db.createRole({
  role: "rolMantenimiento",
  privileges: [
    {
      resource: { db: "hospitalDB", collection: "hospitals" },
      actions: ["find"] 
    }
  ],
  roles: []
});


//    Creación de Usuarios de Ejemplo y Asignación de Roles    


print('\nEliminando usuarios de ejemplo antiguos...');
db.dropUser("director_sofia");
db.dropUser("medico_sanz");
db.dropUser("enfermero_vives");
db.dropUser("admin_henao");
db.dropUser("mante_castaneda");

print('Creando usuarios de ejemplo...');
db.createUser({
  user: "director_sofia",
  pwd: "password123",
  roles: [{ role: "rolDirectorGeneral", db: "hospitalDB" }]
});

db.createUser({
  user: "medico_sanz",
  pwd: "password123",
  roles: [{ role: "rolMedicoEspecialista", db: "hospitalDB" }]
});

db.createUser({
  user: "enfermero_vives",
  pwd: "password123",
  roles: [{ role: "rolEnfermero", db: "hospitalDB" }]
});

db.createUser({
  user: "admin_henao",
  pwd: "password123",
  roles: [{ role: "rolAdministrativo", db: "hospitalDB" }]
});

db.createUser({
  user: "mante_castaneda",
  pwd: "password123",
  roles: [{ role: "rolMantenimiento", db: "hospitalDB" }]
});

