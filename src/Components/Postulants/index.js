import styles from './postulants.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulants, deletePostulant } from '../../redux/Postulants/thunks';
import { closeErrorModal } from '../../redux/Postulants/actions';
import Postulant from './Postulant';
import CreateButton from '../Shared/Buttons/ButtonCreate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

const Postulants = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [selectedPostulant, setSelectedPostulant] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);

  const postulants = useSelector((store) => store.postulants.list);
  const error = useSelector((store) => store.postulants.error);
  const isLoading = useSelector((store) => store.postulants.isLoading);

  useEffect(() => {
    if (!postulants.length) {
      dispatch(getPostulants());
    }
  }, [postulants]);

  const handleDelete = (postulant) => {
    setSelectedPostulant(postulant._id);
    setShowDelete(true);
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Modal
          show={showDelete}
          title="Delete a Postulant"
          message="Are you sure you want to delete this postulant?"
          onConfirm={() => {
            dispatch(deletePostulant(selectedPostulant)).then(() => {
              setSelectedPostulant(undefined);
              setShowDelete(false);
            });
          }}
          onCancel={() => setShowDelete(false)}
        />
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
        <div className={styles.header}>
          <h2>Postulants</h2>
          <Link to="postulants/form">
            <CreateButton></CreateButton>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Age</th>
              <th className={styles.th}>Address</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Profiles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postulants.map((postulant) => {
              return (
                <Postulant
                  key={postulant._id}
                  id={postulant._id}
                  name={`${postulant.firstName} ${postulant.lastName}`}
                  age={postulant.birthday}
                  address={postulant.address}
                  status={postulant.available}
                  profiles={postulant.profiles}
                  onDelete={() => handleDelete(postulant)}
                  onEdit={() => history.push(`/postulants/form?_id=${postulant._id}`)}
                />
              );
            })}
          </tbody>
        </table>
        {isLoading && <div className={styles.loader}></div>}
      </section>
    </div>
  );
};

export default Postulants;
