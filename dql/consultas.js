

// 1. Encontrar todos los datos del paciente 'Roberto Carlos'
db.patients.findOne({ nombre: 'Roberto Carlos' })

// 2. Encontrar todos los pacientes que pertenecen a la EPS 'Sura EPS'
db.patients.find({ segurosMedicos: 'Sura EPS' })

// 3. Encontrar todas las visitas médicas realizadas en el año 2024
db.medicalVisits.find({ fecha: { $gte: new Date('2024-01-01'), $lt: new Date('2025-01-01') } })

// 4. Listar el historial clínico de un paciente específico por su número de historia
db.patients.findOne({ numeroHistoriaClinica: 'HCL-2024-009' }, { historialClinico: 1, _id: 0 })

// 5. Encontrar todos los pacientes que han tenido más de una entrada en su historial clínico
db.patients.find({ 'historialClinico.1': { $exists: true } })

// 6. Encontrar todos los pacientes cuyo diagnóstico contenga la palabra 'prenatal' (usando regex)
db.patients.find({ 'historialClinico.diagnostico': { $regex: /prenatal/i } })

// 7. Buscar qué paciente recibió el tratamiento de 'Crioterapia para verrugas'
db.patients.find({ 'historialClinico.tratamientosRealizados': ObjectId('60c72b2f9e4b7b1b7c2d0025') }, { nombre: 1 })

// 8. Listar todas las visitas médicas atendidas por la 'Dra. Laura Pausini'
db.medicalVisits.find({ idMedico: ObjectId('60c72b2f9e4b7b1b7c2d0014') })

// 9. Listar todas las visitas médicas que ocurrieron después del 1 de septiembre de 2024
db.medicalVisits.find({ fecha: { $gt: new Date('2024-09-01') } })

// 10. Encontrar las visitas donde el diagnóstico fue 'Control prenatal de 20 semanas'
db.medicalVisits.find({ diagnostico: 'Control prenatal de 20 semanas' })

// 11. Encontrar a los pacientes que viven en Girón
db.patients.find({ direccion: /Girón/i })

// 12. Listar el nombre y teléfono de los pacientes que tienen más de un seguro médico
db.patients.find({ 'segurosMedicos.1': { $exists: true } }, { nombre: 1, telefono: 1, _id: 0 })

// 13. Encontrar las visitas médicas que no tienen un diagnóstico registrado o está vacío
db.medicalVisits.find({ diagnostico: { $in: [null, ''] } })

// 14. Encontrar pacientes que tienen exactamente un seguro médico
db.patients.find({ segurosMedicos: { $size: 1 } })

// 15. Listar las visitas médicas del mes de agosto de 2024
db.medicalVisits.find({ fecha: { $gte: new Date('2024-08-01'), $lt: new Date('2024-09-01') } })

// 16. Encontrar pacientes cuyo nombre contenga 'Manuel' o 'Valentina'
db.patients.find({ nombre: /Manuel|Valentina/i })

// 17. Obtener las 5 visitas médicas más recientes
db.medicalVisits.find().sort({ fecha: -1 }).limit(5)

// 18. Encontrar la primera entrada del historial clínico del paciente 'Lucía Gil'
db.patients.findOne({ nombre: 'Lucía Gil' }, { 'historialClinico': { $slice: 1 } })

// 19. Buscar visitas médicas que ocurrieron en un fin de semana (domingo=1, sábado=7)
db.medicalVisits.find({ $expr: { $in: [{ $dayOfWeek: '$fecha' }, [1, 7]] } })

// 20. Verificar si algún paciente tiene más de 2 seguros médicos
db.patients.find({ 'segurosMedicos.2': { $exists: true } })

// 21. Listar pacientes cuyo número de historia clínica sea del año 2025
db.patients.find({ numeroHistoriaClinica: /^HCL-2025/ })

// 22. Encontrar pacientes que han sido diagnosticados con 'Hipertensión Arterial' Y 'Diabetes'
db.patients.find({ 'historialClinico.diagnostico': { $all: ['Hipertensión Arterial', 'Diabetes Mellitus Tipo 2'] } })

// 23. Encontrar la visita médica más antigua registrada en la base de datos
db.medicalVisits.find().sort({ fecha: 1 }).limit(1)




// 24. Listar todos los médicos especialistas en 'Cardiología'
db.personnel.find({ tipo: 'Medico Especialista', especialidad: 'Cardiología' })

// 25. Encontrar el personal (médicos, enfermeras) que trabaja en el 'Instituto Cardiovascular de Santander'
db.personnel.find({ idHospital: ObjectId('60c72b2f9e4b7b1b7c2d0001') })

// 26. Listar los hospitales ubicados en 'Bucaramanga'
db.hospitals.find({ direccion: /Bucaramanga/i })

// 27. Encontrar el personal cuyo salario es superior a 10,000,000 COP
db.personnel.find({ salario: { $gt: 10000000 } })

// 28. Listar los nombres de los hospitales y la cantidad de áreas especializadas que tiene cada uno
db.hospitals.find({}, { nombre: 1, numeroAreas: { $size: '$areasEspecializadas' }, _id: 0 })

// 29. Encontrar a todo el personal que no sea médico especialista (roles de soporte y administración)
db.personnel.find({ tipo: { $ne: 'Medico Especialista' } })

// 30. Encontrar al personal con el salario más alto
db.personnel.find().sort({ salario: -1 }).limit(1)

// 31. Encontrar al personal con el salario más bajo
db.personnel.find({ salario: { $ne: null } }).sort({ salario: 1 }).limit(1)

// 32. Listar los hospitales que tienen 'Dermatología' entre sus áreas especializadas
db.hospitals.find({ areasEspecializadas: 'Dermatología' })

// 33. Encontrar al personal cuyo nombre empieza por 'Dr. A'
db.personnel.find({ nombre: { $regex: /^Dr\. A/ } })

// 34. Listar todo el personal cuyo email no sea de un dominio '.com'
db.personnel.find({ email: { $not: /\.com$/ } })

// 35. Encontrar hospitales que tengan 4 o más áreas especializadas
db.hospitals.find({ areasEspecializadas: { $size: 4 } })

// 36. Listar el personal en un rango salarial entre 4,000,000 y 5,000,000
db.personnel.find({ salario: { $gte: 4000000, $lte: 5000000 } })

// 37. Obtener los 3 empleados más antiguos (simulado por ObjectId)
db.personnel.find().sort({ _id: 1 }).limit(3)

// 38. Encontrar personal que no tenga un hospital asignado (Directores Generales)
db.personnel.find({ idHospital: null })

// 39. Encontrar el total de personal en la base de datos
db.personnel.countDocuments()

// 40. Encontrar qué hospitales tienen 'Unidad de Cuidados Intensivos (UCI)' o 'Urgencias'
db.hospitals.find({ areasEspecializadas: { $in: ['Unidad de Cuidados Intensivos (UCI)', 'Urgencias'] } })

// 41. Encontrar al personal que sea 'Enfermero/a' y gane más de 4,500,000
db.personnel.find({ tipo: 'Enfermero/a', salario: { $gt: 4500000 } })

// 42. Buscar hospitales que se encuentren en una 'Avenida' o 'Carrera'
db.hospitals.find({ direccion: { $regex: /Avenida|Carrera/i } })

// 43. Buscar personal cuyo teléfono empiece con el prefijo '310'
db.personnel.find({ telefono: /^310/ })




// 44. Encontrar todos los medicamentos fabricados por 'CardioPharma'
db.medications.find({ fabricante: 'CardioPharma' })

// 45. Listar todos los tratamientos cuyo costo sea inferior a 200
db.treatments.find({ costo: { $lt: 200 } })

// 46. Obtener los detalles del tratamiento llamado 'Bypass Coronario'
db.treatments.findOne({ nombre: 'Bypass Coronario' })

// 47. Encontrar hospitales donde el inventario de 'Warfarina 5mg' es menor a 150 unidades
db.medications.find({ nombre: 'Warfarina 5mg', 'inventarioPorHospital.cantidad': { $lt: 150 } }, { 'inventarioPorHospital.$': 1 })

// 48. Listar todos los medicamentos que son de tipo 'Antiplaquetario' o 'Anticoagulante'
db.medications.find({ tipo: { $in: ['Antiplaquetario', 'Anticoagulante'] } })

// 49. Encontrar medicamentos cuyo inventario en un hospital específico sea mayor a 400
db.medications.find({ 'inventarioPorHospital.idHospital': ObjectId('60c72b2f9e4b7b1b7c2d0001'), 'inventarioPorHospital.cantidad': { $gt: 400 } })

// 50. Listar tratamientos con un costo entre 1000 y 5000
db.treatments.find({ costo: { $gte: 1000, $lte: 5000 } })

// 51. Listar todos los tipos de medicamentos distintos (usando distinct)
db.medications.distinct('tipo')

// 52. Encontrar medicamentos cuyo inventario en un hospital sea exactamente 200
db.medications.find({ inventarioPorHospital: { $elemMatch: { idHospital: ObjectId('60c72b2f9e4b7b1b7c2d0002'), cantidad: 200 } } })

// 53. Listar todos los fabricantes de medicamentos de forma única
db.medications.distinct('fabricante')

// 54. Encontrar medicamentos del tipo 'Vitamina' o 'Suplemento'
db.medications.find({ tipo: { $regex: /vitamina|suplemento/i } })

// 55. Encontrar los 5 tratamientos más caros
db.treatments.find().sort({ costo: -1 }).limit(5)

// 56. Encontrar los 5 tratamientos más baratos (que no sean gratis)
db.treatments.find({ costo: { $gt: 0 } }).sort({ costo: 1 }).limit(5)

// 57. Buscar tratamientos cuya descripción contenga 'mínimamente invasiva'
db.treatments.find({ descripcion: /mínimamente invasiva/i })

// 58. Listar los medicamentos cuyo nombre incluye la dosis en 'mg'
db.medications.find({ nombre: /mg/i })

// 59. Buscar tratamientos que no tengan descripción
db.treatments.find({ descripcion: { $in: [null, ''] } })

// 60. Encontrar el inventario de 'Amoxicilina 500mg' en el 'Centro Pediátrico HIC'
db.medications.findOne({ nombre: 'Amoxicilina 500mg' }, { inventarioPorHospital: { $elemMatch: { idHospital: ObjectId('60c72b2f9e4b7b1b7c2d000E') } } })

// 61. Listar todos los tratamientos de 'Cirugía' que cuesten más de 7000
db.treatments.find({ areaMedicaRelacionada: { $regex: /cirugía/i }, costo: { $gt: 7000 } })




// 62. Contar la cantidad de médicos y enfermeros por cada hospital
db.hospitals.aggregate([ { $lookup: { from: 'personnel', localField: '_id', foreignField: 'idHospital', as: 'personal' } }, { $project: { _id: 0, nombreHospital: '$nombre', totalMedicos: { $size: { $filter: { input: '$personal', as: 'p', cond: { $eq: ['$$p.tipo', 'Medico Especialista'] } } } }, totalEnfermeros: { $size: { $filter: { input: '$personal', as: 'p', cond: { $eq: ['$$p.tipo', 'Enfermero/a'] } } } } } } ])

// 63. Calcular el inventario total de cada medicamento sumando las cantidades de todos los hospitales
db.medications.aggregate([ { $unwind: '$inventarioPorHospital' }, { $group: { _id: '$nombre', inventarioTotal: { $sum: '$inventarioPorHospital.cantidad' } } }, { $sort: { inventarioTotal: 1 } } ])

// 64. Encontrar los 3 diagnósticos más comunes registrados en las visitas médicas
db.medicalVisits.aggregate([ { $group: { _id: '$diagnostico', numeroDeCasos: { $sum: 1 } } }, { $sort: { numeroDeCasos: -1 } }, { $limit: 3 } ])

// 65. Mostrar qué médicos han recetado el medicamento 'Clopidogrel 75mg'
db.patients.aggregate([ { $unwind: '$historialClinico' }, { $match: { 'historialClinico.medicamentosRecetados': ObjectId('60c72b2f9e4b7b1b7c2d0030') } }, { $lookup: { from: 'personnel', localField: 'historialClinico.idMedico', foreignField: '_id', as: 'medicoInfo' } }, { $unwind: '$medicoInfo' }, { $group: { _id: '$medicoInfo.nombre' } }, { $project: { _id: 0, medico: '$_id' } } ])

// 66. Listar el nombre de cada paciente junto con la cantidad total de visitas médicas que ha tenido
db.medicalVisits.aggregate([ { $group: { _id: '$idPaciente', totalVisitas: { $sum: 1 } } }, { $lookup: { from: 'patients', localField: '_id', foreignField: '_id', as: 'pacienteInfo' } }, { $unwind: '$pacienteInfo' }, { $project: { _id: 0, nombrePaciente: '$pacienteInfo.nombre', totalVisitas: 1 } }, { $sort: { totalVisitas: -1 } } ])

// 67. ¿Cuál es el diagnóstico más común en la 'Clínica de la Mujer'?
db.medicalVisits.aggregate([ { $match: { idHospital: ObjectId('60c72b2f9e4b7b1b7c2d0003') } }, { $group: { _id: '$diagnostico', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 } ])

// 68. Simular la "antigüedad" de los pacientes basado en su primera visita
db.patients.aggregate([ { $unwind: '$historialClinico' }, { $group: { _id: '$_id', nombre: { $first: '$nombre' }, fechaPrimeraVisita: { $min: '$historialClinico.fecha' } } }, { $project: { nombre: 1, _id: 0, antiguedadComoPaciente_dias: { $round: [ { $divide: [ { $subtract: [ new Date(), '$fechaPrimeraVisita' ] }, 1000 * 60 * 60 * 24 ] } ] } } } ])

// 69. Para cada paciente, listar todos los diagnósticos diferentes que ha recibido
db.patients.aggregate([ { $unwind: '$historialClinico' }, { $group: { _id: '$nombre', todosLosDiagnosticos: { $addToSet: '$historialClinico.diagnostico' } } } ])

// 70. Calcular el salario promedio por tipo de personal (Director, Médico, etc.)
db.personnel.aggregate([ { $group: { _id: '$tipo', salarioPromedio: { $avg: '$salario' } } }, { $project: { tipoDePersonal: '$_id', salarioPromedio: { $round: ['$salarioPromedio', 2] }, _id: 0 } } ])

// 71. Listar todas las especialidades médicas distintas que existen en la base de datos
db.personnel.aggregate([ { $match: { especialidad: { $exists: true, $ne: null } } }, { $group: { _id: '$especialidad' } }, { $project: { _id: 0, especialidad: '$_id' } } ])

// 72. ¿Qué hospital tiene más personal contratado?
db.personnel.aggregate([ { $group: { _id: '$idHospital', numeroEmpleados: { $sum: 1 } } }, { $sort: { numeroEmpleados: -1 } }, { $limit: 1 }, { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospitalInfo' } }, { $unwind: '$hospitalInfo' }, { $project: { _id: 0, hospital: '$hospitalInfo.nombre', numeroEmpleados: 1 } } ])

// 73. Encontrar los medicamentos que están disponibles en más de un hospital
db.medications.aggregate([ { $project: { nombre: 1, numeroDeHospitales: { $size: '$inventarioPorHospital' } } }, { $match: { numeroDeHospitales: { $gt: 1 } } } ])

// 74. ¿Cuál es el fabricante con más medicamentos registrados en la base de datos?
db.medications.aggregate([ { $group: { _id: '$fabricante', totalMedicamentos: { $sum: 1 } } }, { $sort: { totalMedicamentos: -1 } }, { $limit: 1 } ])

// 75. Obtener un reporte completo de una visita, incluyendo nombres de paciente, médico y hospital
db.medicalVisits.aggregate([ { $match: { _id: ObjectId('60c72b2f9e4b7b1b7c2d0055') } }, { $lookup: { from: 'patients', localField: 'idPaciente', foreignField: '_id', as: 'paciente' } }, { $lookup: { from: 'personnel', localField: 'idMedico', foreignField: '_id', as: 'medico' } }, { $lookup: { from: 'hospitals', localField: 'idHospital', foreignField: '_id', as: 'hospital' } }, { $unwind: '$paciente' }, { $unwind: '$medico' }, { $unwind: '$hospital' }, { $project: { _id: 0, fecha: 1, diagnostico: 1, paciente: '$paciente.nombre', medico: '$medico.nombre', hospital: '$hospital.nombre' } } ])

// 76. ¿Cuál es el hospital con el mayor inventario total de medicamentos (sumando todas las unidades)?
db.medications.aggregate([ { $unwind: '$inventarioPorHospital' }, { $group: { _id: '$inventarioPorHospital.idHospital', inventarioTotal: { $sum: '$inventarioPorHospital.cantidad' } } }, { $sort: { inventarioTotal: -1 } }, { $limit: 1 }, { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospitalInfo' } }, { $unwind: '$hospitalInfo' }, { $project: { _id: 0, hospital: '$hospitalInfo.nombre', inventarioTotal: 1 } } ])

// 77. Contar cuántas visitas médicas se han realizado por mes y año
db.medicalVisits.aggregate([ { $project: { anio: { $year: '$fecha' }, mes: { $month: '$fecha' } } }, { $group: { _id: { anio: '$anio', mes: '$mes' }, numeroDeVisitas: { $sum: 1 } } }, { $sort: { '_id.anio': 1, '_id.mes': 1 } } ])

// 78. Para un paciente, mostrar su historial clínico con los nombres de los tratamientos y medicamentos
db.patients.aggregate([ { $match: { nombre: 'Roberto Carlos' } }, { $unwind: '$historialClinico' }, { $lookup: { from: 'treatments', localField: 'historialClinico.tratamientosRealizados', foreignField: '_id', as: 'infoTratamientos' } }, { $lookup: { from: 'medications', localField: 'historialClinico.medicamentosRecetados', foreignField: '_id', as: 'infoMedicamentos' } }, { $project: { _id: 0, 'fecha': '$historialClinico.fecha', 'diagnostico': '$historialClinico.diagnostico', 'tratamientos': '$infoTratamientos.nombre', 'medicamentos': '$infoMedicamentos.nombre' } } ])

// 79. Contar cuántos pacientes hay por cada tipo de seguro médico (EPS)
db.patients.aggregate([ { $unwind: '$segurosMedicos' }, { $group: { _id: '$segurosMedicos', totalPacientes: { $sum: 1 } } }, { $sort: { totalPacientes: -1 } } ])

// 80. Listar pacientes que han sido atendidos en más de un hospital
db.medicalVisits.aggregate([ { $group: { _id: '$idPaciente', hospitalesVisitados: { $addToSet: '$idHospital' } } }, { $match: { 'hospitalesVisitados.1': { $exists: true } } }, { $lookup: { from: 'patients', localField: '_id', foreignField: '_id', as: 'paciente' } }, { $unwind: '$paciente' }, { $project: { _id: 0, nombrePaciente: '$paciente.nombre' } } ])

// 81. Encontrar el hospital con el salario promedio más alto para sus médicos especialistas
db.personnel.aggregate([ { $match: { tipo: 'Medico Especialista' } }, { $group: { _id: '$idHospital', salarioPromedio: { $avg: '$salario' } } }, { $sort: { salarioPromedio: -1 } }, { $limit: 1 }, { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospital' } }, { $unwind: '$hospital' }, { $project: { _id: 0, nombreHospital: '$hospital.nombre', salarioPromedio: 1 } } ])

// 82. Listar los directores generales y los hospitales que dirigen
db.hospitals.aggregate([ { $lookup: { from: 'personnel', localField: 'idDirectorGeneral', foreignField: '_id', as: 'director' } }, { $unwind: '$director' }, { $project: { _id: 0, director: '$director.nombre', hospital: '$nombre' } } ])

// 83. Listar cada área médica y el tratamiento más caro dentro de esa área
db.treatments.aggregate([ { $sort: { costo: -1 } }, { $group: { _id: '$areaMedicaRelacionada', tratamientoMasCaro: { $first: '$nombre' }, costoMaximo: { $first: '$costo' } } } ])

// 84. Encontrar el mes con más visitas médicas en el año 2024
db.medicalVisits.aggregate([ { $match: { fecha: { $gte: new Date('2024-01-01'), $lt: new Date('2025-01-01') } } }, { $group: { _id: { $month: '$fecha' }, totalVisitas: { $sum: 1 } } }, { $sort: { totalVisitas: -1 } }, { $limit: 1 } ])

// 85. Encontrar qué medicamentos nunca han sido recetados
db.medications.aggregate([ { $lookup: { from: 'patients', localField: '_id', foreignField: 'historialClinico.medicamentosRecetados', as: 'recetas' } }, { $match: { recetas: { $size: 0 } } }, { $project: { _id: 0, nombre: 1 } } ])

// 86. Listar pacientes y el costo total de todos los tratamientos que han recibido
db.patients.aggregate([ { $unwind: '$historialClinico' }, { $unwind: '$historialClinico.tratamientosRealizados' }, { $lookup: { from: 'treatments', localField: 'historialClinico.tratamientosRealizados', foreignField: '_id', as: 'infoTratamiento' } }, { $unwind: '$infoTratamiento' }, { $group: { _id: '$nombre', costoTotal: { $sum: '$infoTratamiento.costo' } } }, { $sort: { costoTotal: -1 } } ])

// 87. Calcular el número total de camas (simulado por cant de médicos * 2) por hospital
db.personnel.aggregate([ { $match: { tipo: 'Medico Especialista' } }, { $group: { _id: '$idHospital', numMedicos: { $sum: 1 } } }, { $project: { camasEstimadas: { $multiply: ['$numMedicos', 2] } } }, { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospital' } }, { $unwind: '$hospital' }, { $project: { _id: 0, hospital: '$hospital.nombre', camasEstimadas: 1 } } ])

// 88. ¿Cuál es el promedio de visitas médicas por paciente?
db.medicalVisits.aggregate([ { $group: { _id: '$idPaciente', totalVisitas: { $sum: 1 } } }, { $group: { _id: null, promedioVisitasPorPaciente: { $avg: '$totalVisitas' } } } ])

// 89. Listar el número de empleados por cada rol ('tipo') en la base de datos
db.personnel.aggregate([ { $group: { _id: '$tipo', cantidad: { $sum: 1 } } }, { $project: { _id: 0, rol: '$_id', cantidad: 1 } } ])

// 90. Encontrar la cantidad de pacientes por ciudad (extrayendo de la dirección)
db.patients.aggregate([ { $project: { ciudad: { $arrayElemAt: [ { $split: ['$direccion', ', '] }, -1 ] } } }, { $group: { _id: '$ciudad', numeroDePacientes: { $sum: 1 } } } ])

// 91. Listar los 3 hospitales con la mayor variedad de medicamentos en stock
db.medications.aggregate([ { $unwind: '$inventarioPorHospital' }, { $group: { _id: '$inventarioPorHospital.idHospital', variedadMedicamentos: { $sum: 1 } } }, { $sort: { variedadMedicamentos: -1 } }, { $limit: 3 }, { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospital' } }, { $unwind: '$hospital' }, { $project: { _id: 0, hospital: '$hospital.nombre', variedadMedicamentos: 1 } } ])


//  92 Actualizar el teléfono del "Instituto Cardiovascular de Santander"
db.hospitals.updateOne(
  { nombre: "Instituto Cardiovascular de Santander" },
  { $set: { telefono: "607-555-3030" } }
)

//  93 Eliminar la visita con el _id "60c72b2f9e4b7b1b7c2d0050"
db.medicalVisits.deleteOne({ _id: ObjectId("60c72b2f9e4b7b1b7c2d0050") })

//  94Incrementar el costo de todos los tratamientos de 'Cardiología' en un 10%
db.treatments.updateMany({ areaMedicaRelacionada: 'Cardiología' }, { $mul: { costo: 1.10 } })

//  95Añadir un nuevo hospital al inventario de un medicamento
db.medications.updateOne({ nombre: 'Donepezilo 10mg' }, { $push: { inventarioPorHospital: { idHospital: ObjectId('60c72b2f9e4b7b1b7c2d0001'), cantidad: 120 } } })

// 96 Eliminar un hospital del inventario de un medicamento
db.medications.updateOne({ nombre: 'Clopidogrel 75mg' }, { $pull: { inventarioPorHospital: { idHospital: ObjectId('60c72b2f9e4b7b1b7c1d7e04') } } })
// 97. Paciente con el Historial Médico Más Largo
// Encuentra al paciente con la mayor cantidad de tiempo entre su primera y última visita.
db.patients.aggregate([
  { $unwind: "$historialClinico" },
  {
    $group: {
      _id: "$nombre",
      primeraVisita: { $min: "$historialClinico.fecha" },
      ultimaVisita: { $max: "$historialClinico.fecha" }
    }
  },
  {
    $project: {
      _id: 0,
      paciente: "$_id",
      duracionHistorialDias: {
        $round: [
          { $divide: [{ $subtract: ["$ultimaVisita", "$primeraVisita"] }, 1000 * 60 * 60 * 24] }
        ]
      }
    }
  },
  { $sort: { duracionHistorialDias: -1 } },
  { $limit: 1 }
])


// 98. Hospitales con Bajo Inventario de un Medicamento Específico
// Busca en qué hospitales el inventario de "Ibuprofeno 400mg" es menor a 500 unidades.
db.medications.aggregate([
  { $match: { nombre: "Ibuprofeno 400mg" } },
  { $unwind: "$inventarioPorHospital" },
  { $match: { "inventarioPorHospital.cantidad": { $lt: 500 } } },
  {
    $lookup: {
      from: "hospitals",
      localField: "inventarioPorHospital.idHospital",
      foreignField: "_id",
      as: "hospitalInfo"
    }
  },
  { $unwind: "$hospitalInfo" },
  {
    $project: {
      _id: 0,
      hospital: "$hospitalInfo.nombre",
      cantidadRestante: "$inventarioPorHospital.cantidad"
    }
  }
])


//99. Cálculo de la Nómina Mensual por Hospital
// Suma los salarios de todo el personal de cada hospital para obtener el costo total de la nómina.
db.personnel.aggregate([
  { $match: { idHospital: { $ne: null } } },
  {
    $group: {
      _id: "$idHospital",
      nominaTotal: { $sum: "$salario" }
    }
  },
  {
    $lookup: {
      from: "hospitals",
      localField: "_id",
      foreignField: "_id",
      as: "hospitalInfo"
    }
  },
  { $unwind: "$hospitalInfo" },
  {
    $project: {
      _id: 0,
      hospital: "$hospitalInfo.nombre",
      nominaMensual: "$nominaTotal"
    }
  },
  { $sort: { nominaMensual: -1 } }
])


// 100. Las 3 Especialidades Médicas Más Concurridas
// Determina qué 3 especialidades han atendido el mayor número de visitas médicas.
db.medicalVisits.aggregate([
  {
    $lookup: {
      from: "personnel",
      localField: "idMedico",
      foreignField: "_id",
      as: "medicoInfo"
    }
  },
  { $unwind: "$medicoInfo" },
  { $match: { "medicoInfo.especialidad": { $exists: true } } },
  {
    $group: {
      _id: "$medicoInfo.especialidad",
      numeroDeVisitas: { $sum: 1 }
    }
  },
  { $sort: { numeroDeVisitas: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      especialidad: "$_id",
      totalVisitas: "$numeroDeVisitas"
    }
  }
])