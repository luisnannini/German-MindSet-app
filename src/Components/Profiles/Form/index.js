import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfileById, updateProfile } from '../../../redux/Profiles/thunks';
import { closeErrorModal } from '../../../redux/Profiles/actions';

const Form = () => {
  const [profileValue, setProfileValue] = useState('');
  const [id, setProfileId] = useState(undefined);

  const error = useSelector((store) => store.profiles.error);
  const isLoading = useSelector((store) => store.profiles.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id');
    setProfileId(profileId);
    if (profileId) {
      dispatch(getProfileById(profileId)).then((selectedProfile) => {
        setProfileValue(selectedProfile.name);
      });
    }
  }, []);

  const onChangeProfileValue = (event) => {
    setProfileValue(event.target.value);
  };

  const submitProfile = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id');
    if (profileId) {
      dispatch(
        updateProfile(profileId, {
          name: profileValue
        })
      );
    } else {
      dispatch(
        createProfile({
          name: profileValue
        })
      );
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
          <Link to="/profiles">
            <ButtonCancel disabled={isLoading} />
          </Link>
          <ButtonConfirm disabled={isLoading} type={'submit'} />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
