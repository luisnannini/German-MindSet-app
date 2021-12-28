import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfileById, updateProfile } from 'redux/Profiles/thunks';
import { closeErrorModal } from 'redux/Profiles/actions';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';

const ProfilesForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.profiles.error);
  const history = useHistory();
  const query = useQuery();
  const [profileValue, setProfileValue] = useState('');
  const [id, setProfileId] = useState(undefined);

  useEffect(() => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(getProfileById(profileId)).then((selectedProfile) => {
        setProfileId(profileId);
        setProfileValue(selectedProfile.name);
      });
    }
  }, []);

  const submitProfile = (formValues) => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(
        updateProfile(profileId, {
          name: formValues.profile
        })
      ).then((response) => {
        if (response) history.push('/admin/profiles');
      });
    } else {
      dispatch(
        createProfile({
          name: profileValue
        })
      ).then((response) => {
        if (response) history.push('/admin/profiles');
      });
    }
  };
  const required = (value) => (value ? undefined : 'Required');
  const validate = (formValues) => {
    const errors = {};
    if (
      !formValues.profile?.match(/^[A-Za-z ]{3,30}$/) ||
      formValues.profile?.length < 3 ||
      formValues.profile?.length > 30
    ) {
      errors.profile = 'Input should contain between 3 and 30 letters';
    }
    return errors;
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={submitProfile} validate={validate}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>{id ? 'Update a Profile' : 'Create a Profile'}</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  label={'Profile'}
                  name={'profile'}
                  initialValue={profileValue}
                  S
                  placeholder={'Write a new profile'}
                  validate={required}
                  component={Input}
                  disabled={formProps.submitting}
                />
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={formProps.submitting}
                onClick={() => history.push('/admin/profiles')}
              />
              <ButtonConfirm disabled={formProps.submitting || formProps.pristine} type="submit" />
            </div>
          </form>
        )}
      </Form>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
    </div>
  );
};

export default ProfilesForm;
