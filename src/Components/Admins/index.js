import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmin, adminCloseErrorModal } from '../../redux/actions/adminActions';

function Admins() {
  const dispatch = useDispatch();
  const [adminId, setAdminId] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const admins = useSelector((store) => store.admins.admins);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this Admin?"
        isLoading={isLoading}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false);
          dispatch(deleteAdmin(adminId));
        }}
      />
      <ModalError error={error} onConfirm={() => dispatch(adminCloseErrorModal({ show: false }))} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Administrators</h2>
          <Link to="/admins/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.username}</td>
                <td>
                  <Link to={`admins/form?id=${admin._id}`}>
                    <ButtonUpdate />
                  </Link>
                  <ButtonDelete
                    onClick={(event) => {
                      event.stopPropagation();
                      setAdminId(admin._id);
                      setShowDelete(true);
                    }}
                    disabled={isLoading}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Admins;
