import * as yup from 'yup';

export const patientValidationSchema = yup.object().shape({
  name: yup.string().required(),
  allergy_info: yup.string(),
  asthma_info: yup.string(),
  autoimmune_info: yup.string(),
  organization_id: yup.string().nullable(),
});
