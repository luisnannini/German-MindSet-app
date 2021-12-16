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

function Form() {
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

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };

  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };

  const onChangeCountryInput = (event) => {
    setCountryValue(event.target.value);
  };

  const onChangeStateInput = (event) => {
    setStateValue(event.target.value);
  };

  const onChangeCityInput = (event) => {
    setCityValue(event.target.value);
  };

  const onChangeAddressInput = (event) => {
    setAddressValue(event.target.value);
  };

  const onChangeLogoInput = (event) => {
    setLogoValue(event.target.value);
  };

  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };

  const submitClients = (event) => {
    event.preventDefault();
    const clientId = query.get('_id');
    if (clientId) {
      dispatch(
        updateClient(clientId, {
          name: nameValue,
          phone: parseInt(phoneValue),
          location: {
            country: countryValue,
            state: stateValue,
            city: cityValue,
            address: addressValue
          },
          logo: logoValue,
          description: descriptionValue
        })
      ).then((response) => {
        if (response) history.push('/admin/clients');
      });
    } else {
      dispatch(
        createClient({
          name: nameValue,
          phone: parseInt(phoneValue),
          location: {
            country: countryValue,
            state: stateValue,
            city: cityValue,
            address: addressValue
          },
          logo: logoValue,
          description: descriptionValue
        })
      ).then((response) => {
        if (response) history.push('/admin/clients');
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitClients}>
        <div className={styles.header}>
          <h2 className={styles.title}>{clientId ? 'Update Client' : 'Create a Client'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Name'}
              name={'name'}
              type={'text'}
              value={nameValue}
              placeholder={'Insert Client name...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeNameInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Address'}
              name={'address'}
              type={'address'}
              value={addressValue}
              placeholder={'Insert Client address...'}
              onChange={onChangeAddressInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Country'}
              name={'country'}
              type={'text'}
              value={countryValue}
              placeholder={'Insert Client country...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeCountryInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Logo'}
              name={'logo'}
              type={'text'}
              value={logoValue}
              placeholder={'Insert Client logo...'}
              onChange={onChangeLogoInput}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Phone Number'}
              name={'phone'}
              type={'number'}
              value={phoneValue}
              placeholder={'Insert Client phone...'}
              pattern={'[0-9]'}
              onChange={onChangePhoneInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'City'}
              name={'city'}
              type={'text'}
              value={cityValue}
              placeholder={'Insert Client city...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeCityInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'State'}
              name={'state'}
              type={'text'}
              value={stateValue}
              placeholder={'Insert Client state...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeStateInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Description'}
              name={'description'}
              type={'text'}
              value={descriptionValue}
              placeholder={'Insert Client description...'}
              onChange={onChangeDescriptionInput}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/admin/clients')} />
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
}

export default Form;
