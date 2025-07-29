// --- Creación para la base de datos 'hospitals' ---
use('hospitalDB');



// --- Creación de la Colección 'hospitals' ---

db.createCollection('hospitals');
// Crear un índice en el nombre del hospital para búsquedas rápidas
db.hospitals.createIndex({ "nombre": 1 });

// --- Creación de la Colección 'personnel' ---

db.createCollection('personnel');
// Crear un índice único en idEmpleado y otro en el tipo de personal
db.personnel.createIndex({ "idEmpleado": 1 }, { unique: true });
db.personnel.createIndex({ "tipo": 1 });

// --- Creación de la Colección 'patients' ---

db.createCollection('patients');
// Crear un índice único en el número de historia clínica para un acceso rápido
db.patients.createIndex({ "numeroHistoriaClinica": 1 }, { unique: true });

// --- Creación de la Colección 'medicalVisits' ---

db.createCollection('medicalVisits');

db.medicalVisits.createIndex({ "idPaciente": 1 });
db.medicalVisits.createIndex({ "fecha": -1 }); 

// --- Creación de la Colección 'treatments' ---

db.createCollection('treatments');
// Crear un índice en el nombre y en el área médica
db.treatments.createIndex({ "nombre": 1 });
db.treatments.createIndex({ "areaMedicaRelacionada": 1 });

// --- Creación de la Colección 'medications' ---

db.createCollection('medications');
// Crear un índice en el nombre del medicamento y en el tipo
db.medications.createIndex({ "nombre": 1 });
db.medications.createIndex({ "tipo": 1 });