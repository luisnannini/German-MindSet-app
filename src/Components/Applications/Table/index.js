import styles from './table.module.css';
//import ButtonUpdate from '../../Shared/ButtonUpdate';
import ButtonDelete from '../../Shared/ButtonDelete';

const Table = ({ applications, removeReq }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Position</th>
          <th>Postulant</th>
          <th>ID Interview</th>
          <th>Result</th>
          {/* <th></th> */}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app._id}>
            <td>{app._id}</td>
            <td>{app.positions.jobDescription}</td>
            <td>
              {app.postulants.firstName} {app.postulants.lastName}
            </td>
            <td>{app.interview._id}</td>
            <td>{app.result}</td>
            {/* <td>
              <ButtonUpdate onClick={() => updateReq(app._id)} />
            </td> (Update not available at back-end)*/}
            <td>
              <ButtonDelete onClick={() => removeReq(app._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
