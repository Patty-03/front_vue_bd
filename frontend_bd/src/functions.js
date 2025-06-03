import axios from 'axios'

//PACIENTE
export async function getPacientes() {
  try {
    const response = await axios.get('http://localhost:8080/api/pacientes/getAll', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.pacientes || []
  } catch (error) {
    console.error('Error al obtener pacientes:', error.response?.data || error.message)
    return []
  }
}

export async function createPaciente(paciente) {
  const formData = new URLSearchParams()
  formData.append('num_Historia_clinica', paciente.num_Historia_clinica)
  formData.append('nombre_Paciente', paciente.nombre_Paciente)
  formData.append('direccion_Paciente', paciente.direccion_Paciente || '')
  formData.append('fecha_Nacimiento', paciente.fecha_Nacimiento)
  
  try {
    const response = await axios.post(
      'http://localhost:8080/api/pacientes/create',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error al crear paciente:', error.response?.data || error.message)
    throw error
  }
}

export async function deletePaciente(num_Historia_Clinica) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/pacientes/delete/${num_Historia_Clinica}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    alert(response.statusText)
  } catch (error) {
    alert(error)
  }
}

export async function getPacienteByHistoria(historia) {
  try {
    const response = await axios.get(`http://localhost:8080/api/pacientes/${historia}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data || {}
  } catch (error) {
    console.error('Error al obtener paciente:', error.response?.data || error.message)
    return {}
  }
}

export async function updatePaciente(historia, paciente) {
  const formData = new URLSearchParams()
  formData.append('nombre_Paciente', paciente.nombre_Paciente)
  formData.append('fecha_Nacimiento', paciente.fecha_Nacimiento)
  formData.append('direccion_Paciente', paciente.direccion_Paciente)
  formData.append('cod_Unidad', paciente.cod_Unidad)

  try {
    const response = await axios.put(
      `http://localhost:8080/api/pacientes/update/${historia}`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error al actualizar paciente:', error.response?.data || error.message)
    throw error
  }
}

//----------------------------------------------------------------MEDICO
export async function getAllMedicos() {
  try {
    const response = await axios.get(`http://localhost:8080/api/medicos/getAll`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.medicos || []
  } catch (error) {
    console.error('Error al obtener médicos:', error.response?.data || error.message)
    return []
  }
}

export async function getMedicoByCodigo(cod_Med) {
  try {
    const response = await axios.get(`http://localhost:8080/api/medicos/${cod_Med}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data || {}
  } catch (error) {
    console.error('Error al obtener médico:', error.response?.data || error.message)
    return {}
  }
}
export async function updateMedico(cod_Med, medico) {
  const formData = new URLSearchParams()
  formData.append('nombre_Med', medico.nombre_Med)
  formData.append('apellidos', medico.apellidos)
  formData.append('especialidad', medico.especialidad)
  formData.append('num_Licencia', medico.num_Licencia)
  formData.append('telefono', medico.telefono)
  formData.append('anios_Expmed', medico.anios_Expmed)
  formData.append('datos_Contacto', medico.datos_Contacto)
  formData.append('cod_Unidad', medico.cod_Unidad)

  try {
    const response = await axios.put(`${API_URL}/medicos/${cod_Med}`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al actualizar médico:', error.response?.data || error.message)
    throw error
  }
}

export async function deleteMedico(cod_Med) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/medicos/${cod_Med}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al eliminar médico:', error.response?.data || error.message)
    throw error
  }
}

export async function createMedico(medico) {
  const formData = new URLSearchParams()
  formData.append('cod_Med', medico.cod_Med)
  formData.append('nombre_Med', medico.nombre_Med)
  formData.append('Apellidos', medico.Apellidos)
  formData.append('especialidad', medico.especialidad)
  formData.append('num_Licencia', medico.num_Licencia)
  formData.append('telefono', medico.telefono)
  formData.append('anios_Expmed', medico.anios_Expmed)
  formData.append('datos_Contacto', medico.datos_Contacto)
  formData.append('cod_Unidad', medico.cod_Unidad)
  formData.append('cod_Dpto', medico.cod_Dpto)
  formData.append('cod_Hptal', medico.cod_Hptal)

  const response = await axios.post('http://localhost:8080/api/medicos/create', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })

  return response.data
}

//HOSPITAL
export async function getAllHospitals() {
  try {
    const response = await axios.get(`http://localhost:8080/api/hospitales/getAll`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.hospitales || []
  } catch (error) {
    console.error('Error al obtener hospitales:', error.response?.data || error.message)
    return []
  }
}

export async function createHospital(hospital) {
  const formData = new URLSearchParams()
  formData.append('cod_Hptal', hospital.cod_Hptal)
  formData.append('nombre_hptal', hospital.nombre_hptal)

  const response = await axios.post(`http://localhost:8080/api/create`, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
}

export async function updateHospital(hospital) {
  const formData = new URLSearchParams()
  formData.append('cod_Hptal', hospital.cod_Hptal)
  formData.append('nombre_hptal', hospital.nombre_hptal)

  const response = await axios.put(`http://localhost:8080/api/update`, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
}

export async function deleteHospital(cod_Hptal) {
  const response = await axios.delete(`http://localhost:8080/api/delete/${cod_Hptal}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
}

//DEPARTAMENTO
export async function createDepartamento(departamento) {
  const formData = new URLSearchParams()
  formData.append('cod_Dpto', departamento.cod_Dpto)
  formData.append('nombre_Dpto', departamento.nombre_Dpto)
  formData.append('cod_Hptal', departamento.cod_Hptal)

  try {
    const response = await axios.post(`http://localhost:8080/api/departamentos`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al crear departamento:', error.response?.data || error.message)
    throw error
  }
}

export async function getAllDepartamentos() {
  try {
    const response = await axios.get(`http://localhost:8080/api/departamentos/getAll`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.departamentos || []
  } catch (error) {
    console.error('Error al obtener departamentos:', error.response?.data || error.message)
    return []
  }
}

export async function updateDepartamento(params) {
  alert("CODIGO DE MODIFICAR")
}

export async function deleteDepartamento(params) {
  alert("CODIGO DE BORRAR")
}

//UNIDAD
export async function createUnidad(unidad) {
  const formData = new URLSearchParams()
  formData.append('cod_Unidad', unidad.cod_Unidad)
  formData.append('nombre_Unidad', unidad.nombre_Unidad)
  formData.append('ubic_Hptal', unidad.ubic_Hptal)
  formData.append('cod_Dpto', unidad.cod_Dpto)
  formData.append('cod_Hosp', unidad.cod_Hosp)

  try {
    const response = await axios.post(`http://localhost:8080/api/unidades`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al crear unidad:', error.response?.data || error.message)
    throw error
  }
}

export async function updateUnidad(params) {
  alert("CODIGO DE MODIFICAR")
}

export async function deleteUnidad(params) {
  alert("CODIGO DE BORRAR")
}

export async function getAllUnidades() {
  try {
    const response = await axios.get(`http://localhost:8080/api/unidades/getAll`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.unidades || []
  } catch (error) {
    console.error('Error al obtener unidades:', error.response?.data || error.message)
    return []
  }
}

//REGISTRO
export async function updateRegistro(params) {
  alert("CODIGO DE MODIFICAR")
}

export async function deleteRegistro(params) {
  alert("CODIGO DE BORRAR")
}

export async function getAllRegistros() {
  try {
    const response = await axios.get(`http://localhost:8080/api/registro/getAll`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.registros || []
  } catch (error) {
    console.error('Error al obtener registros:', error.response?.data || error.message)
    return []
  }
}

export async function createRegistro(registro) {
  try {
  const formData = new URLSearchParams()
  formData.append('num_Historia_Clinica', registro.num_Historia_Clinica)
  formData.append('cod_Unidad', registro.cod_Unidad)
  formData.append('fue_Atendido', registro.fue_Atendido ? 'true' : 'false')
  formData.append('causa_No_Atendido', registro.causa_No_Atendido || '')
  formData.append('estado', registro.estado)
  formData.append('fecha_Registro', registro.fecha_Registro)

  const response = await axios.post('http://localhost:8080/api/registro/create', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
  } catch (err) {
    console.error('Error al crear médico:', err.response?.data || err.message)
    throw new Error(`No se pudo crear el médico: ${err.message}`)
  }
}

export async function getRegistroByHistoriaUnidad(historia, cod_Unidad) {
  try {
    const response = await axios.get(`http://localhost:8080/api/registro/${historia}/${cod_Unidad}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data || {}
  } catch (error) {
    console.error('Error al obtener registro:', error.response?.data || error.message)
    return {}
  }
}

//INFORME
export async function createInforme(informe) {
  const formData = new URLSearchParams()
  formData.append('num_Inf', informe.num_Inf)
  formData.append('cod_Unidad', informe.cod_Unidad)
  formData.append('cant_Pacientes_Atendidos', informe.cant_Pacientes_Atendidos)
  formData.append('cant_Pacientes_Alta', informe.cant_Pacientes_Alta)
  formData.append('cant_pac_adm', informe.cant_pac_adm)
  formData.append('cant_Total_Pacientes', informe.cant_Total_Pacientes)
  formData.append('num_Turno', informe.num_Turno)
  formData.append('hora_Inf', informe.hora_Inf)
  formData.append('fecha_Inf', informe.fecha_Inf)
  formData.append('cod_Hosp', informe.cod_Hosp)
  formData.append('cod_Dpto', informe.cod_Dpto)

  try {
    const response = await axios.post(`http://localhost:8080/api/informes`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al crear informe:', error.response?.data || error.message)
    throw error
  }
}

export async function getAllInformes() {
  try {
    const response = await axios.get(`http://localhost:8080/api/informes/getAll`)
    return response.data.informes || []
  } catch (error) {
    console.error('Error al obtener informes:', error.response?.data || error.message)
    return []
  }
}

export async function updateInforme(params) {
  alert("CODIGO DE MODIFICAR")
}

export async function deleteInforme(params) {
  alert("CODIGO DE BORRAR")
}

//TURNO
export async function createTurno(turno) {
  const formData = new URLSearchParams()
  formData.append('num_Turno', turno.num_Turno)
  formData.append('cod_Unidad', turno.cod_Unidad)
  formData.append('cant_Pacientes_Asignados', turno.cant_Pacientes_Asignados)
  formData.append('cant_Pacientes_Atendidos', turno.cant_Pacientes_Atendidos)

  try {
    const response = await axios.post(`http://localhost:8080/api/turnos`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al crear turno:', error.response?.data || error.message)
    throw error
  }
}

export async function getAllTurnos() {
  try {
    const response = await axios.get(`http://localhost:8080/api/turnos/getAll`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.turnos || []
  } catch (error) {
    console.error('Error al obtener turnos:', error.response?.data || error.message)
    return []
  }
}

export async function updateTurno(params) {
  alert("CODIGO DE MODIFICAR")
}

export async function deleteTurno(params) {
  alert("CODIGO DE BORRAR")
}

//REPORTES
export async function getHospitalesConMasDe100Pacientes() {
  try {
    const response = await axios.get(`http://localhost:8080/api/hospitales/masde100`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.hospitales || []
  } catch (error) {
    console.error(
      'Error al obtener hospitales con más de 100 pacientes:',
      error.response?.data || error.message,
    )
    return []
  }
}

export async function getResumenPorHospitales() {
  try {
    const response = await axios.get(`http://localhost:8080/api/resumen/hospitales`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.resumen || []
  } catch (error) {
    console.error('Error al obtener resumen por hospitales:', error.response?.data || error.message)
    return []
  }
}

export async function getUnidadesARevisar() {
  try {
    const response = await axios.get(`http://localhost:8080/api/unidades/revisar-turno`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data.unidades || []
  } catch (error) {
    console.error('Error al obtener unidades a revisar:', error.response?.data || error.message)
    return []
  }
}


export async function getConsultasExitosas() {
  try {
    const response = await axios.get('http://localhost:8080/api/reportes/getConsultasExitosas', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.consultas || []
  } catch (error) {
    console.error('Error al obtener consultas exitosas:', error.response?.data || error.message)
    return []
  }
}