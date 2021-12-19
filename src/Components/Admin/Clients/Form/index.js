import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient, getClientById, updateClient } from '../../../../redux/Clients/thunks';
import { closeErrorModal } from '../../../../redux/Clients/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../../Shared/Input';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';
import { Form, Field } from 'react-final-form';

function ClientsForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [clientId, setClientId] = useState(undefined);
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const isLoading = useSelector((store) => store.clients.isLoading);
  const error = useSelector((store) => store.clients.error);
  const query = useQuery();

  useEffect(() => {
    const clientId = query.get('_id');
    if (clientId) {
      dispatch(getClientById(clientId)).then((selectedClient) => {
        setClientId(clientId);
        setNameValue(selectedClient.name);
        setPhoneValue(selectedClient.phone);
        setCountryValue(selectedClient.location.country);
        setStateValue(selectedClient.location.state);
        setCityValue(selectedClient.location.city);
        setAddressValue(selectedClient.location.address);
        setLogoValue(selectedClient.logo);
        setDescriptionValue(selectedClient.description);
      });
    }
  }, []);

  // const onChangeNameInput = (event) => {
  //   setNameValue(event.target.value);
  // };

  // const onChangePhoneInput = (event) => {
  //   setPhoneValue(event.target.value);
  // };

  // const onChangeCountryInput = (event) => {
  //   setCountryValue(event.target.value);
  // };

  // const onChangeStateInput = (event) => {
  //   setStateValue(event.target.value);
  // };

  // const onChangeCityInput = (event) => {
  //   setCityValue(event.target.value);
  // };

  // const onChangeAddressInput = (event) => {
  //   setAddressValue(event.target.value);
  // };

  // const onChangeLogoInput = (event) => {
  //   setLogoValue(event.target.value);
  // };

  // const onChangeDescriptionInput = (event) => {
  //   setDescriptionValue(event.target.value);
  // };

  const submitClients = (formValues) => {
    const clientId = query.get('_id');
    if (clientId) {
      dispatch(
        updateClient(clientId, {
          name: formValues.name,
          phone: parseInt(formValues.phone),
          location: {
            country: formValues.country,
            state: formValues.state,
            city: formValues.city,
            address: formValues.address
          },
          logo: formValues.logo,
          description: formValues.description
        })
      ).then((response) => {
        if (response) history.push('/admin/clients');
      });
    } else {
      dispatch(
        createClient({
          name: formValues.name,
          phone: parseInt(formValues.phone),
          location: {
            country: formValues.country,
            state: formValues.state,
            city: formValues.city,
            address: formValues.address
          },
          logo: formValues.logo,
          description: formValues.description
        })
      ).then((response) => {
        if (response) history.push('/admin/clients');
      });
    }
  };
  const validate = (formValues) => {
    const errors = {};
    // Name
    if (!formValues.name?.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)) {
      errors.name = 'Name must contain only letters';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 letters long';
    }
    // Address
    if (formValues.address?.search(/[a-zA-Z]/) < 0 || formValues.address?.search(/[0-9]/) < 0) {
      errors.address = 'Address must contain a name and a number';
    }
    // Phone Number
    if (!formValues.phone?.toString().match(/^\d+$/)) {
      errors.phone = 'Phone number must contain only numbers';
    }
    if (formValues.phone?.length < 7 || formValues.phone?.length > 14) {
      errors.phone = 'Phone number must be between 7 and 14 numbers';
    }
    // Country
    if (formValues.country?.length < 5) {
      errors.country = 'School must contain at least 5 characters';
    }
    if (formValues.country?.length > 50) {
      errors.country = 'School must be less than 50 characters';
    }
    // City
    if (formValues.city?.length < 3) {
      errors.city = 'City must contain at least 3 characters';
    }
    if (formValues.city?.length > 50) {
      errors.city = 'City must be less than 50 characters';
    }
    // State
    if (formValues.state?.length < 3) {
      errors.state = 'State must contain at least 3 characters';
    }
    if (formValues.state?.length > 50) {
      errors.state = 'State must be less than 50 characters';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form onSubmit={submitClients} validate={validate}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>{clientId ? 'Update Client' : 'Create a Client'}</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  label={'Name'}
                  name={'name'}
                  initialValue={nameValue}
                  placeholder={'Insert Client name...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Address'}
                  name={'address'}
                  type={'address'}
                  initialValue={addressValue}
                  placeholder={'Insert Client address...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Country'}
                  name={'country'}
                  initialValue={countryValue}
                  placeholder={'Insert Client country...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Logo'}
                  name={'logo'}
                  initialValue={logoValue}
                  placeholder={'Insert Client logo...'}
                  disabled={isLoading}
                  component={Input}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  label={'Phone Number'}
                  name={'phone'}
                  type={'number'}
                  initialValue={phoneValue}
                  placeholder={'Insert Client phone...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'City'}
                  name={'city'}
                  initialValue={cityValue}
                  placeholder={'Insert Client city...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'State'}
                  name={'state'}
                  initialValue={stateValue}
                  placeholder={'Insert Client state...'}
                  disabled={isLoading}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Description'}
                  name={'description'}
                  initialValue={descriptionValue}
                  placeholder={'Insert Client description...'}
                  disabled={isLoading}
                  component={Input}
                />
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel disabled={isLoading} onClick={() => history.push('/admin/clients')} />
              <ButtonConfirm disabled={isLoading} type="submit" />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
}

export default ClientsForm;
