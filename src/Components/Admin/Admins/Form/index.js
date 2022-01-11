import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, updateAdmin, getAdmin } from 'redux/Admins/thunks';
import { adminCloseErrorModal } from 'redux/Admins/actions';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';

const AdminsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = new URLSearchParams(history.location.search);
  const adminId = params.get('_id');
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: ''
  });
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    if (adminId) {
      dispatch(getAdmin(adminId, (admin) => setAdmin(admin)));
    }
  }, []);

  const submitAdmin = (formValues) => {
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(formValues)
    };

    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
      dispatch(updateAdmin(url, options, () => history.goBack()));
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/auth/registerAdmin`;
      dispatch(createAdmin(url, options, () => history.goBack()));
    }
  };

  const validate = (formValues) => {
    const errors = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formValues.name?.length < 5) {
      errors.name = 'Full name must be at least 5 characters';
    }
    if (!formValues.name?.match(/^([a-zA-Z]+ [a-zA-Z]+)+$/)) {
      errors.name = 'Full name must contain only letters and a space in between';
    }
    if (!formValues.email?.match(emailRegex)) {
      errors.email = 'Invalid email format';
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
                  initialValue={admin.name}
                  placeholder={'Full name'}
                  component={Input}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  label={'Email'}
                  name="email"
                  initialValue={admin.email}
                  placeholder={'Email'}
                  component={Input}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  label={'Password'}
                  name="password"
                  type="password"
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
