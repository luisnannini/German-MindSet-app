import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import {
  getAdmin,
  adminCloseErrorModal,
  addAdmin,
  updateAdmin,
  setAdmin
} from '../../../redux/actions/adminActions';
import { useSelector, useDispatch } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const adminId = params.get('id');
  const admin = useSelector((store) => store.admins.admin);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    if (adminId) {
      dispatch(getAdmin(adminId));
    }
  }, []);

  const onChangeFullNameValue = (event) => {
    dispatch(setAdmin({ ...admin, name: event.target.value }));
  };

  const onChangeUsernameValue = (event) => {
    dispatch(setAdmin({ ...admin, username: event.target.value }));
  };

  const onChangePasswordValue = (event) => {
    dispatch(setAdmin({ ...admin, password: event.target.value }));
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
      url = `${process.env.REACT_APP_API}/admins/618da298735af3cddf27e7786`;
      dispatch(updateAdmin(url, options));
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
      dispatch(addAdmin(url, options));
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
          <Link to="/admins">
            <ButtonCancel disabled={isLoading} />
          </Link>
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => adminCloseErrorModal({ show: false })} />
      </form>
    </div>
  );
};

export default Form;
