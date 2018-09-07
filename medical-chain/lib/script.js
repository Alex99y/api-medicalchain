/** 
* Revocar acceso de un medico a un registro
* @param {org.example.empty.RevocarAccesoMedico } tx The sample transaction instance.
* @transaction
*/
async function RevocarAccesoMedico(tx) {
  // Modificar registro médico
  const id = tx.medico.id;
  const index = tx.registro.permisos.indexOf(id);
  if ( index > -1 ) {
    tx.registro.permisos.splice(index, 1);
  }
  const assetRegistry = await getAssetRegistry('org.example.empty.HistorialMedico');
  await assetRegistry.update(tx.registro);
  
  // Modificar medico
  const idP = tx.registro.paciente.id;
  const index2 = tx.medico.pacientes.indexOf(idP);
  if ( index2 > -1 ) {
    tx.medico.pacientes.splice(index2, 1);
  }
  const ParticipantRegistry = await getParticipantRegistry('org.example.empty.Medico');
  await ParticipantRegistry.update(tx.medico);
  console.log("Medico removido");
  
  // Modificar paciente
  const index3 = tx.registro.paciente.autorizados.indexOf(id);
  if ( index3 > -1 ) {
    tx.registro.paciente.autorizados.splice(index3, 1);
  }
  const ParticipantRegistry2 = await getParticipantRegistry('org.example.empty.Paciente');
  await ParticipantRegistry2.update(tx.registro.paciente);
  console.log("Medico removido");
}

/**
* Modificar un registro médico
* @param {org.example.empty.ModificarRegistroMedico} tx The sample transaction instance.
* @transaction
*/
async function ModificarRegistroMedico(tx) {
  tx.registro.version = tx.version;
  tx.registro.hash = tx.newHash;
  const assetRegistry = await getAssetRegistry('org.example.empty.HistorialMedico');
  await assetRegistry.update(tx.registro);
  console.log("Listo registro medico");  
}

/**
* Sample transaction processor function.
* @param {org.example.empty.AsignarPermisos} tx The sample transaction instance.
* @transaction
*/
async function AsignarPermisos(tx) {  
  // Actualizar el médico
  const id = tx.registro.paciente.id;
  const index = tx.medico.pacientes.indexOf(id);
  console.log(index)
  if ( index == -1 ) {
    tx.medico.pacientes.push(id);
    const ParticipantRegistry = await getParticipantRegistry('org.example.empty.Medico');
    await ParticipantRegistry.update(tx.medico);
    console.log("Listo medico");

    // Actualizar el historial medico
    const idm = tx.medico.id;
    tx.registro.permisos.push(idm);
    const assetRegistry = await getAssetRegistry('org.example.empty.HistorialMedico');
    await assetRegistry.update(tx.registro);
    console.log("Listo registro medico");

    // Actualizar el paciente
    tx.registro.paciente.autorizados.push(idm);
    const ParticipantRegistry2 = await getParticipantRegistry('org.example.empty.Paciente');
    await ParticipantRegistry2.update(tx.registro.paciente);
    console.log("Listo paciente");
  } else {
    console.log("El paciente ya tiene asignado los permisos al medico");
  }
}

