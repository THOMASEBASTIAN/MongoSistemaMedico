// 1. Encontrar un paciente por su nombre completo
db.system.js.save({
  _id: "getPacientePorNombre",
  value: function(nombreCompleto) {
    return db.patients.findOne({ nombre: nombreCompleto });
  }
});

// 2. Obtener todas las visitas médicas de un paciente por su ID
db.system.js.save({
  _id: "getVisitasPorPaciente",
  value: function(pacienteId) {
    return db.medicalVisits.find({ idPaciente: ObjectId(pacienteId) }).toArray();
  }
});

// 3. Listar todo el personal que trabaja en un hospital específico
db.system.js.save({
  _id: "getPersonalPorHospital",
  value: function(hospitalId) {
    return db.personnel.find({ idHospital: ObjectId(hospitalId) }).toArray();
  }
});

// 4. Encontrar todos los médicos de una especialidad dada
db.system.js.save({
  _id: "getMedicosPorEspecialidad",
  value: function(especialidad) {
    return db.personnel.find({ tipo: 'Medico Especialista', especialidad: especialidad }).toArray();
  }
});

// 5. Verificar el inventario de un medicamento en un hospital específico
db.system.js.save({
  _id: "getInventarioDeMedicamentoEnHospital",
  value: function(nombreMedicamento, hospitalId) {
    return db.medications.findOne(
      { nombre: nombreMedicamento },
      { inventarioPorHospital: { $elemMatch: { idHospital: ObjectId(hospitalId) } } }
    );
  }
});

// 6. Generar un reporte de visitas médicas dentro de un rango de fechas
db.system.js.save({
  _id: "generarReporteVisitasPorFechas",
  value: function(fechaInicio, fechaFin) {
    return db.medicalVisits.find({
      fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
    }).sort({ fecha: 1 }).toArray();
  }
});

// 7. Calcular la nómina total mensual de un hospital
db.system.js.save({
  _id: "calcularNominaTotalHospital",
  value: function(hospitalId) {
    return db.personnel.aggregate([
      { $match: { idHospital: ObjectId(hospitalId) } },
      { $group: { _id: "$idHospital", nominaTotal: { $sum: "$salario" } } }
    ]).toArray();
  }
});

// 8. Encontrar pacientes que han sido diagnosticados con una condición (usando regex)
db.system.js.save({
  _id: "getPacientesPorDiagnostico",
  value: function(diagnosticoRegex) {
    return db.patients.find({ "historialClinico.diagnostico": { $regex: diagnosticoRegex, $options: 'i' } }).toArray();
  }
});

// 9. Contar el número de pacientes por cada EPS
db.system.js.save({
  _id: "contarPacientesPorEPS",
  value: function() {
    return db.patients.aggregate([
      { $unwind: '$segurosMedicos' },
      { $group: { _id: '$segurosMedicos', totalPacientes: { $sum: 1 } } },
      { $sort: { totalPacientes: -1 } }
    ]).toArray();
  }
});

// 10. Obtener tratamientos dentro de un rango de costo
db.system.js.save({
  _id: "getTratamientosPorRangoDeCosto",
  value: function(costoMin, costoMax) {
    return db.treatments.find({ costo: { $gte: costoMin, $lte: costoMax } }).sort({ costo: 1 }).toArray();
  }
});

// 11. Calcular el inventario total de un medicamento en todos los hospitales
db.system.js.save({
  _id: "getDisponibilidadMedicamentoGeneral",
  value: function(nombreMedicamento) {
    return db.medications.aggregate([
      { $match: { nombre: nombreMedicamento } },
      { $unwind: '$inventarioPorHospital' },
      { $group: { _id: '$nombre', inventarioTotal: { $sum: '$inventarioPorHospital.cantidad' } } }
    ]).toArray();
  }
});

// 12. Obtener un resumen de la actividad de un médico
db.system.js.save({
  _id: "getResumenActividadMedico",
  value: function(medicoId) {
    return db.medicalVisits.aggregate([
      { $match: { idMedico: ObjectId(medicoId) } },
      { $group: {
          _id: "$idMedico",
          totalVisitas: { $sum: 1 },
          pacientesUnicos: { $addToSet: "$idPaciente" }
      }},
      { $project: {
          _id: 0,
          totalVisitas: 1,
          numeroPacientesAtendidos: { $size: "$pacientesUnicos" }
      }}
    ]).toArray();
  }
});

// 13. Encontrar los N tratamientos más caros
db.system.js.save({
  _id: "getTopTratamientosMasCaros",
  value: function(limite) {
    return db.treatments.find().sort({ costo: -1 }).limit(limite).toArray();
  }
});

// 14. Buscar hospitales que ofrezcan un área especializada
db.system.js.save({
  _id: "buscarHospitalPorArea",
  value: function(areaEspecializada) {
    return db.hospitals.find({ areasEspecializadas: areaEspecializada }).toArray();
  }
});

// 15. Obtener el historial clínico completo de un paciente con nombres en lugar de IDs
db.system.js.save({
  _id: "getHistorialCompletoPaciente",
  value: function(pacienteId) {
    return db.patients.aggregate([
      { $match: { _id: ObjectId(pacienteId) } },
      { $unwind: '$historialClinico' },
      { $lookup: { from: 'treatments', localField: 'historialClinico.tratamientosRealizados', foreignField: '_id', as: 'infoTratamientos' } },
      { $lookup: { from: 'medications', localField: 'historialClinico.medicamentosRecetados', foreignField: '_id', as: 'infoMedicamentos' } },
      { $lookup: { from: 'personnel', localField: 'historialClinico.idMedico', foreignField: '_id', as: 'infoMedico' } },
      { $unwind: '$infoMedico' },
      { $project: {
          _id: 0,
          fecha: '$historialClinico.fecha',
          diagnostico: '$historialClinico.diagnostico',
          resultados: '$historialClinico.resultadosObtenidos',
          medico: '$infoMedico.nombre',
          tratamientos: '$infoTratamientos.nombre',
          medicamentos: '$infoMedicamentos.nombre'
      }}
    ]).toArray();
  }
});

// 16. Contar el número de visitas por cada especialidad médica
db.system.js.save({
  _id: "contarVisitasPorEspecialidad",
  value: function() {
    return db.medicalVisits.aggregate([
      { $lookup: { from: "personnel", localField: "idMedico", foreignField: "_id", as: "medicoInfo" } },
      { $unwind: "$medicoInfo" },
      { $match: { "medicoInfo.especialidad": { $exists: true } } },
      { $group: { _id: "$medicoInfo.especialidad", numeroDeVisitas: { $sum: 1 } } },
      { $sort: { numeroDeVisitas: -1 } }
    ]).toArray();
  }
});

// 17. Encontrar todos los medicamentos con inventario bajo en cualquier hospital
db.system.js.save({
  _id: "getMedicamentosConBajoStock",
  value: function(cantidadMinima) {
    return db.medications.find({ "inventarioPorHospital.cantidad": { $lt: cantidadMinima } }).toArray();
  }
});

// 18. Calcular el costo promedio de los tratamientos por área médica
db.system.js.save({
  _id: "getPromedioCostoTratamientoPorArea",
  value: function() {
    return db.treatments.aggregate([
      { $group: { _id: '$areaMedicaRelacionada', costoPromedio: { $avg: '$costo' } } },
      { $sort: { costoPromedio: -1 } }
    ]).toArray();
  }
});

// 19. Encontrar pacientes que han tenido más de N visitas
db.system.js.save({
  _id: "getPacientesConMultiplesVisitas",
  value: function(numeroMinimoDeVisitas) {
    return db.medicalVisits.aggregate([
      { $group: { _id: '$idPaciente', totalVisitas: { $sum: 1 } } },
      { $match: { totalVisitas: { $gt: numeroMinimoDeVisitas } } },
      { $lookup: { from: 'patients', localField: '_id', foreignField: '_id', as: 'pacienteInfo' } },
      { $unwind: '$pacienteInfo' },
      { $project: { _id: 0, nombrePaciente: '$pacienteInfo.nombre', totalVisitas: 1 } }
    ]).toArray();
  }
});

// 20. Listar todos los hospitales con el nombre de su Director General
db.system.js.save({
  _id: "getDirectoresDeHospitales",
  value: function() {
    return db.hospitals.aggregate([
      { $lookup: { from: 'personnel', localField: 'idDirectorGeneral', foreignField: '_id', as: 'director' } },
      { $unwind: '$director' },
      { $project: { _id: 0, hospital: '$nombre', director: '$director.nombre' } }
    ]).toArray();
  }
});