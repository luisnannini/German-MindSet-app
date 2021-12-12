import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import { addAdmin, updateAdmin } from '../../../redux/Admins/thunks';
import { adminCloseErrorModal } from '../../../redux/Admins/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = new URLSearchParams(history.location.search);
  const admins = useSelector((store) => store.admins.admins);
  const adminId = params.get('_id');
  const [admin, setAdmin] = useState({
    name: '',
    username: '',
    password: ''
  });
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    if (adminId) {
      setAdmin(admins.find((admin) => admin._id === adminId));
    }
  }, []);

  const onChangeFullNameValue = (event) => {
    setAdmin({ ...admin, name: event.target.value });
  };

  const onChangeUsernameValue = (event) => {
    setAdmin({ ...admin, username: event.target.value });
  };

  const onChangePasswordValue = (event) => {
    setAdmin({ ...admin, password: event.target.value });
  };

  const submitAdmin = (e) => {
    e.preventDefault();
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    };

    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
      dispatch(updateAdmin(url, options, () => history.goBack()));
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
      dispatch(addAdmin(url, options, () => history.goBack()));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitAdmin}>
        <div className={styles.header}>
          <h2 className={styles.title}>{adminId ? 'Update Admin' : 'Create Admin'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Full Name'}
              type={'text'}
              value={admin.name}
              placeholder={'Full name'}
              onChange={onChangeFullNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Username'}
              type={'text'}
              value={admin.username}
              placeholder={'Username'}
              onChange={onChangeUsernameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Password'}
              type={'password'}
              value={admin.password}
              placeholder={'Password'}
              onChange={onChangePasswordValue}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          />
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => adminCloseErrorModal({ show: false })} />
      </form>
    </div>
  );
};

export default Form;
