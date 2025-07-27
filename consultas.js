db.patients.find({ "direccion": { $regex: /floridablanca/i } })

db.personnel.find({
  "salario": { $gt: 10000000 },
  "tipo": { $in: ["Medico Especialista", "Director General"] }
})


db.medicalVisits.aggregate([
  {
    $group: {
      _id: "$idMedico",
      numeroDeVisitas: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "personnel",
      localField: "_id",
      foreignField: "_id",
      as: "infoMedico"
    }
  },
  {
    $unwind: "$infoMedico"
  },
  {
    $project: {
      _id: 0,
      nombreMedico: "$infoMedico.nombre",
      especialidad: "$infoMedico.especialidad",
      numeroDeVisitas: 1
    }
  }
])


// db.hospitals.findOne({nombre: "Clínica San Pío"}) -> _id: "60c72b2f9e4b7b1b7c2d0005"

db.personnel.find({ idHospital: { "$oid": "60c72b2f9e4b7b1b7c2d0005" } })


db.medicalVisits.aggregate([
  {
    $group: {
      _id: "$idPaciente",
      totalVisitas: { $sum: 1 }
    }
  },
  {
    $match: {
      totalVisitas: { $gt: 1 }
    }
  },
  {
    $lookup: {
      from: "patients",
      localField: "_id",
      foreignField: "_id",
      as: "datosPaciente"
    }
  },
  { $unwind: "$datosPaciente" },
  {
    $project: {
      _id: 0,
      nombrePaciente: "$datosPaciente.nombre",
      numeroDeVisitas: "$totalVisitas"
    }
  }
])  
[
  // ========= Categoría: Estado Actual de Hospitales =========
  {
    "id_consulta": 16,
    "descripcion": "Listar los nombres de los hospitales y la cantidad de áreas especializadas que tiene cada uno",
    "consulta": "db.hospitals.find({}, { nombre: 1, numeroAreas: { $size: '$areasEspecializadas' }, _id: 0 })"
  },
  {
    "id_consulta": 17,
    "descripcion": "AGREGACIÓN: Contar la cantidad de médicos y enfermeros por cada hospital",
    "consulta": "db.hospitals.aggregate([ { $lookup: { from: 'personnel', localField: '_id', foreignField: 'idHospital', as: 'personal' } }, { $project: { _id: 0, nombreHospital: '$nombre', totalMedicos: { $size: { $filter: { input: '$personal', as: 'p', cond: { $eq: ['$$p.tipo', 'Medico Especialista'] } } } }, totalEnfermeros: { $size: { $filter: { input: '$personal', as: 'p', cond: { $eq: ['$$p.tipo', 'Enfermero/a'] } } } } } } ])"
  },

  // ========= Categoría: Inventarios de Medicamentos =========
  {
    "id_consulta": 18,
    "descripcion": "Encontrar los hospitales donde el inventario de 'Warfarina 5mg' es menor a 150 unidades",
    "consulta": "db.medications.find({ nombre: 'Warfarina 5mg', 'inventarioPorHospital.cantidad': { $lt: 150 } }, { 'inventarioPorHospital.$': 1 })"
  },
  {
    "id_consulta": 19,
    "descripcion": "AGREGACIÓN: Calcular el inventario total de cada medicamento sumando las cantidades de todos los hospitales",
    "consulta": "db.medications.aggregate([ { $unwind: '$inventarioPorHospital' }, { $group: { _id: '$nombre', inventarioTotal: { $sum: '$inventarioPorHospital.cantidad' } } }, { $sort: { inventarioTotal: 1 } } ])"
  },
  {
    "id_consulta": 20,
    "descripcion": "Listar todos los medicamentos que son de tipo 'Antiplaquetario' o 'Anticoagulante'",
    "consulta": "db.medications.find({ tipo: { $in: ['Antiplaquetario', 'Anticoagulante'] } })"
  },
  
  // ========= Categoría: Historiales Clínicos de Pacientes =========
  {
    "id_consulta": 21,
    "descripcion": "Encontrar todos los pacientes cuyo diagnóstico contenga la palabra 'prenatal' (usando regex)",
    "consulta": "db.patients.find({ 'historialClinico.diagnostico': { $regex: /prenatal/i } })"
  },
  {
    "id_consulta": 22,
    "descripcion": "Buscar qué paciente recibió el tratamiento de 'Crioterapia para verrugas'",
    "consulta": "db.patients.find({ 'historialClinico.tratamientosRealizados': ObjectId('60c72b2f9e4b7b1b7c2d0025') }, { nombre: 1 })"
  },
  {
    "id_consulta": 23,
    "descripcion": "AGREGACIÓN: Encontrar los 3 diagnósticos más comunes registrados en las visitas médicas",
    "consulta": "db.medicalVisits.aggregate([ { $group: { _id: '$diagnostico', numeroDeCasos: { $sum: 1 } } }, { $sort: { numeroDeCasos: -1 } }, { $limit: 3 } ])"
  },

  // ========= Categoría: Actividades del Personal =========
  {
    "id_consulta": 24,
    "descripcion": "Listar todas las visitas médicas atendidas por la 'Dra. Laura Pausini'",
    "consulta": "db.medicalVisits.find({ idMedico: ObjectId('60c72b2f9e4b7b1b7c2d0014') })"
  },
  {
    "id_consulta": 25,
    "descripcion": "Encontrar a todo el personal que no sea médico especialista (roles de soporte y administración)",
    "consulta": "db.personnel.find({ tipo: { $ne: 'Medico Especialista' } })"
  },
  {
    "id_consulta": 26,
    "descripcion": "AGREGACIÓN: Mostrar qué médicos han recetado el medicamento 'Clopidogrel 75mg'",
    "consulta": "db.patients.aggregate([ { $unwind: '$historialClinico' }, { $match: { 'historialClinico.medicamentosRecetados': ObjectId('60c72b2f9e4b7b1b7c2d0030') } }, { $lookup: { from: 'personnel', localField: 'historialClinico.idMedico', foreignField: '_id', as: 'medicoInfo' } }, { $unwind: '$medicoInfo' }, { $group: { _id: '$medicoInfo.nombre' } }, { $project: { _id: 0, medico: '$_id' } } ])"
  },

  // ========= Categoría: Gestión de Visitas Médicas y Estadísticas =========
  {
    "id_consulta": 27,
    "descripcion": "Listar todas las visitas médicas que ocurrieron después del 1 de septiembre de 2024",
    "consulta": "db.medicalVisits.find({ fecha: { $gt: new Date('2024-09-01') } })"
  },
  {
    "id_consulta": 28,
    "descripcion": "Encontrar las visitas donde el diagnóstico fue 'Control prenatal de 20 semanas'",
    "consulta": "db.medicalVisits.find({ diagnostico: 'Control prenatal de 20 semanas' })"
  },
  {
    "id_consulta": 29,
    "descripcion": "AGREGACIÓN: Listar el nombre de cada paciente junto con la cantidad total de visitas médicas que ha tenido",
    "consulta": "db.medicalVisits.aggregate([ { $group: { _id: '$idPaciente', totalVisitas: { $sum: 1 } } }, { $lookup: { from: 'patients', localField: '_id', foreignField: '_id', as: 'pacienteInfo' } }, { $unwind: '$pacienteInfo' }, { $project: { _id: 0, nombrePaciente: '$pacienteInfo.nombre', totalVisitas: 1 } }, { $sort: { totalVisitas: -1 } } ])"
  },
  {
    "id_consulta": 30,
    "descripcion": "AGREGACIÓN: ¿Cuál es el diagnóstico más común en la 'Clínica de la Mujer'?",
    "consulta": "db.medicalVisits.aggregate([ { $match: { idHospital: ObjectId('60c72b2f9e4b7b1b7c2d0003') } }, { $group: { _id: '$diagnostico', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 } ])"
  }
]