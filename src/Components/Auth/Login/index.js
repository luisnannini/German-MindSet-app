import { useHistory } from 'react-router-dom';
import { login } from 'redux/auth/thunks';
import { closeErrorModal } from 'redux/Auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './login.module.css';
import Input from 'Components/Shared/Input';
import ModalError from 'Components/Shared/Modals/ModalError';
import Button from 'Components/Shared/Buttons/ButtonConfirm';

function AdminsForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((store) => store.auth.error);

  const onSubmit = (formValues) => {
    return dispatch(login(formValues)).then((response) => {
      if (response) {
        history.push('/admin');
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
          <form onSubmit={formProps.handleSubmit}>
            <h2>Login</h2>
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
            <div className={styles.buttonContainer}>
              <Button
                label="Login"
                disabled={formProps.submitting || formProps.pristine}
                type="submit"
              />
            </div>
          </form>
        )}
      />
    </>
  );
}

export default AdminsForm;
