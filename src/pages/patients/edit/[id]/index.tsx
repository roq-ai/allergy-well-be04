import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPatientById, updatePatientById } from 'apiSdk/patients';
import { Error } from 'components/error';
import { patientValidationSchema } from 'validationSchema/patients';
import { PatientInterface } from 'interfaces/patient';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function PatientEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PatientInterface>(
    () => (id ? `/patients/${id}` : null),
    () => getPatientById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PatientInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePatientById(id, values);
      mutate(updated);
      resetForm();
      router.push('/patients');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PatientInterface>({
    initialValues: data,
    validationSchema: patientValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Patient
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="allergy_info" mb="4" isInvalid={!!formik.errors?.allergy_info}>
              <FormLabel>Allergy Info</FormLabel>
              <Input
                type="text"
                name="allergy_info"
                value={formik.values?.allergy_info}
                onChange={formik.handleChange}
              />
              {formik.errors.allergy_info && <FormErrorMessage>{formik.errors?.allergy_info}</FormErrorMessage>}
            </FormControl>
            <FormControl id="asthma_info" mb="4" isInvalid={!!formik.errors?.asthma_info}>
              <FormLabel>Asthma Info</FormLabel>
              <Input type="text" name="asthma_info" value={formik.values?.asthma_info} onChange={formik.handleChange} />
              {formik.errors.asthma_info && <FormErrorMessage>{formik.errors?.asthma_info}</FormErrorMessage>}
            </FormControl>
            <FormControl id="autoimmune_info" mb="4" isInvalid={!!formik.errors?.autoimmune_info}>
              <FormLabel>Autoimmune Info</FormLabel>
              <Input
                type="text"
                name="autoimmune_info"
                value={formik.values?.autoimmune_info}
                onChange={formik.handleChange}
              />
              {formik.errors.autoimmune_info && <FormErrorMessage>{formik.errors?.autoimmune_info}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'patient',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PatientEditPage);
