import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApplication, getApplications } from '../../../../redux/Applications/thunks';
import { applicationsErrorModal } from '../../../../redux/Applications/actions';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Select from '../../../Shared/Select';
import TextArea from '../../../Shared/TextArea';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';

const ApplicationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [position, setPosition] = useState([]);
  const [postulant, setPostulant] = useState([]);
  const [interview, setInterview] = useState([]);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPosition(
          response.data.map((position) => ({
            _id: position._id,
            value: position._id,
            name: position.jobDescription
          }))
        );
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulant(
          response.data.map((postulant) => ({
            _id: postulant._id,
            value: postulant._id,
            name: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      });
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setInterview(
          response.data.map((interview) => ({
            _id: interview._id,
            value: interview._id,
            name: interview._id
          }))
        );
      });
  }, []);

  const submitApplications = (formValues) => {
    dispatch(
      createApplication({
        positions: formValues.positions,
        postulants: formValues.postulants,
        interview: formValues.interview,
        result: formValues.result
      })
    ).then((response) => {
      if (response) {
        history.push('/admin/applications');
        dispatch(getApplications());
      }
    });
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form onSubmit={submitApplications}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>Create Application</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  className={styles.select}
                  name="positions"
                  label="Positions:"
                  title="- Select a position -"
                  object={position}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  name="postulants"
                  label="Postulants:"
                  title="- Select a postulant -"
                  object={postulant}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  className={styles.select}
                  name="interview"
                  label="Id interview:"
                  title="- Select an interview -"
                  object={interview}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.textArea}
                  label="Result"
                  name="result"
                  placeholder="Result"
                  component={TextArea}
                  required={true}
                  disabled={isLoading}
                />
                <span>Results should have a maximum of 250 characters</span>
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={isLoading}
                onClick={() => history.push('/admin/applications')}
              />
              <ButtonConfirm type="submit" disabled={formProps.submitting || formProps.pristine} />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(applicationsErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
};

export default ApplicationForm;
