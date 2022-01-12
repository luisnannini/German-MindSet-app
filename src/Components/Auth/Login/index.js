/* eslint-disable react/no-unescaped-entities */
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeErrorModal } from 'redux/Auth/actions';
import { login } from 'redux/Auth/thunks';
import { Form, Field } from 'react-final-form';
import styles from './login.module.css';
import Input from 'Components/Shared/Input';
import ModalError from 'Components/Shared/Modals/ModalError';
import Button from 'Components/Shared/Buttons/ButtonConfirm';
import { getPostulantData } from 'redux/Auth/thunks';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((store) => store.auth.error);

  const onSubmit = (formValues) => {
    return dispatch(login(formValues)).then((response) => {
      if (response) {
        switch (response.payload?.role) {
          case 'POSTULANT':
            dispatch(getPostulantData(formValues.email));
            return history.push('/postulant');
          case 'ADMIN':
            return history.push('/admin');
          default:
            break;
        }
      }
    });
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form
        onSubmit={onSubmit}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <Field
              name="email"
              label="Email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Insert Password"
              type="password"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <div className={styles.button}>
              <Button disabled={formProps.submitting || formProps.pristine} type="submit" />
            </div>
            <span className={styles.signUp} onClick={() => history.push('/auth/register')}>
              Don't have an account? Sign up!
            </span>
          </form>
        )}
      />
    </>
  );
}

export default LoginForm;
