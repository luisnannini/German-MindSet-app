import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfileById, updateProfile } from '../../../redux/Profiles/thunks';
import { closeErrorModal } from '../../../redux/Profiles/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

const Form = () => {
  const dispatch = useDispatch();
  const [id, setProfileId] = useState(undefined);
  const [profileValue, setProfileValue] = useState('');
  const history = useHistory();
  const isLoading = useSelector((store) => store.profiles.isLoading);
  const error = useSelector((store) => store.profiles.error);
  const query = useQuery();

  useEffect(() => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(getProfileById(profileId)).then((selectedProfile) => {
        setProfileId(profileId);
        setProfileValue(selectedProfile.name);
      });
    }
  }, []);

  const onChangeProfileValue = (event) => {
    setProfileValue(event.target.value);
  };

  const submitProfile = (event) => {
    event.preventDefault();

    const profileId = query.get('_id');
    if (profileId) {
      dispatch(
        updateProfile(profileId, {
          name: profileValue
        })
      ).then((response) => {
        if (response) history.push('/profiles');
      });
    } else {
      dispatch(
        createProfile({
          name: profileValue
        })
      ).then((response) => {
        if (response) history.push('/profiles');
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitProfile}>
        <div className={styles.header}>
          <h2 className={styles.title}>{id ? 'Update a Profile' : 'Create a Profile'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Profile'}
              name={'profile'}
              value={profileValue}
              placeholder={'Write a new profile'}
              pattern="[A-Za-z ]*"
              onChange={onChangeProfileValue}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/profiles')} />
          <ButtonConfirm disabled={isLoading} type={'submit'} />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
