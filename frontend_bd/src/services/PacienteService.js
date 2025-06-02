// services/PacienteService.js
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/pacientes'

export async function getAllPacientes() {
  try {
    const response = await axios.get(API_URL+"/getAll")
    return response.data.pacientes || []
  } catch (error) {
    console.error('Error al obtener pacientes:', error.message)
    return []
  }
}

export async function createPaciente(paciente) {
  const formData = new URLSearchParams()
  formData.append('num_Historia_clinica', paciente.num_Historia_clinica)
  formData.append('nombre_Paciente', paciente.nombre_Paciente)
  formData.append('apellidos', paciente.apellidos)
  formData.append('fecha_Nacimiento', paciente.fecha_Nacimiento)
  formData.append('direccion_Paciente', paciente.direccion_Paciente)

  const response = await axios.post(API_URL, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response.data
}