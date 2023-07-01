import axios from 'axios';
import queryString from 'query-string';
import { AppointmentInterface, AppointmentGetQueryInterface } from 'interfaces/appointment';
import { GetQueryInterface } from '../../interfaces';

export const getAppointments = async (query?: AppointmentGetQueryInterface) => {
  const response = await axios.get(`/api/appointments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAppointment = async (appointment: AppointmentInterface) => {
  const response = await axios.post('/api/appointments', appointment);
  return response.data;
};

export const updateAppointmentById = async (id: string, appointment: AppointmentInterface) => {
  const response = await axios.put(`/api/appointments/${id}`, appointment);
  return response.data;
};

export const getAppointmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/appointments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAppointmentById = async (id: string) => {
  const response = await axios.delete(`/api/appointments/${id}`);
  return response.data;
};
