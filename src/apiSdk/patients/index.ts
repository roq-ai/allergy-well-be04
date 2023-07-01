import axios from 'axios';
import queryString from 'query-string';
import { PatientInterface, PatientGetQueryInterface } from 'interfaces/patient';
import { GetQueryInterface } from '../../interfaces';

export const getPatients = async (query?: PatientGetQueryInterface) => {
  const response = await axios.get(`/api/patients${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPatient = async (patient: PatientInterface) => {
  const response = await axios.post('/api/patients', patient);
  return response.data;
};

export const updatePatientById = async (id: string, patient: PatientInterface) => {
  const response = await axios.put(`/api/patients/${id}`, patient);
  return response.data;
};

export const getPatientById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/patients/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePatientById = async (id: string) => {
  const response = await axios.delete(`/api/patients/${id}`);
  return response.data;
};
