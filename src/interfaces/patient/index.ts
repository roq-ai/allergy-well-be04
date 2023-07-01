import { AppointmentInterface } from 'interfaces/appointment';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  name: string;
  allergy_info?: string;
  asthma_info?: string;
  autoimmune_info?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  organization?: OrganizationInterface;
  _count?: {
    appointment?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  allergy_info?: string;
  asthma_info?: string;
  autoimmune_info?: string;
  organization_id?: string;
}
