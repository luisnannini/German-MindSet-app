import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createApplication, getApplications } from 'redux/Applications/thunks';
import { getPositions } from 'redux/Positions/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import { getInterviews } from 'redux/Interviews/thunks';
import { applicationsErrorModal } from 'redux/Applications/actions';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import Select from 'Components/Shared/Select';
import TextArea from 'Components/Shared/TextArea';
import ModalError from 'Components/Shared/Modals/ModalError';

const ApplicationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const positions = useSelector((store) => store.positions.list);
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getPositions());
    dispatch(getInterviews());
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
                  object={positions.map((p) => ({
                    value: p._id,
                    name: p.jobDescription
                  }))}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  name="postulants"
                  label="Postulants:"
                  title="- Select a postulant -"
                  object={postulants.map((p) => ({
                    value: p._id,
                    name: `${p.firstName} ${p.lastName}`
                  }))}
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
                  object={interviews.map((i) => ({
                    value: i._id,
                    name: i._id
                  }))}
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
