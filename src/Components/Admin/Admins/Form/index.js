import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, updateAdmin, getAdmin } from '../../../../redux/Admins/thunks';
import { adminCloseErrorModal } from '../../../../redux/Admins/actions';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../../Shared/Input';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';
import { Form, Field } from 'react-final-form';

const AdminsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = new URLSearchParams(history.location.search);
  const adminId = params.get('_id');
  const [admin, setAdmin] = useState({
    name: '',
    username: '',
    password: ''
  });
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    if (adminId) {
      dispatch(getAdmin(adminId, (admin) => setAdmin(admin)));
    }
  }, []);

  const submitAdmin = (formValues) => {
    const adminValues = {
      name: formValues.name,
      username: formValues.username,
      password: formValues.password
    };
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminValues)
    };

    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
      dispatch(updateAdmin(url, options, () => history.goBack()));
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
      dispatch(createAdmin(url, options, () => history.goBack()));
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Full Name is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Full name must be at least 5 characters';
    }
    if (!formValues.name?.match(/^([a-zA-Z]+ [a-zA-Z]+)+$/)) {
      errors.name = 'Full name must contain only letters and a space in between';
    }
    if (formValues.username?.length < 5) {
      errors.username = 'Username must contain at least 5 characters';
    }
    if (formValues.username?.search(/[a-zA-Z]/) < 0 || formValues.username?.search(/[0-9]/) < 0) {
      errors.username = 'Username must contain letters and numbers';
    }
    if (formValues.password?.length < 8) {
      errors.password = 'Password must contain at least 8 characters';
    }
    if (formValues.password?.search(/[a-zA-Z]/) < 0 || formValues.password?.search(/[0-9]/) < 0) {
      errors.password = 'Password must contain letters and numbers';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form onSubmit={submitAdmin} validate={validate}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>{adminId ? 'Update Admin' : 'Create Admin'}</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  label={'Full Name'}
                  name="name"
                  type={'text'}
                  initialValue={admin.name}
                  placeholder={'Full name'}
                  component={Input}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  label={'Username'}
                  name="username"
                  type={'text'}
                  initialValue={admin.username}
                  placeholder={'Username'}
                  component={Input}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  label={'Password'}
                  name="password"
                  initialValue={admin.password}
                  placeholder={'Password'}
                  component={Input}
                  disabled={formProps.submitting}
                  validate={required}
                />
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={formProps.submitting}
                onClick={() => {
                  history.push('/admin/admins');
                }}
              />
              <ButtonConfirm disabled={formProps.submitting || formProps.pristine} type="submit" />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(adminCloseErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
};

export default AdminsForm;
