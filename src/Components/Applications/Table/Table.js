import edit from './edit.png';
import remove from './remove.png';

const Table = ({ applications, updateReq, removeReq }) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>ID</th>
          <th>Position</th>
          <th>Postulant</th>
          <th>ID Interview</th>
          <th>Result</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-body">
        {applications.map((app) => (
          <tr key={app._id}>
            <td>{app._id}</td>
            <td>{app.positions.jobDescription}</td>
            <td>
              {app.postulants.firstName} {app.postulants.lastName}
            </td>
            <td>{app.interview._id}</td>
            <td>{app.result}</td>
            <td>
              <img src={edit} alt="Edit" onClick={() => updateReq(app._id)} />
            </td>
            <td>
              <img src={remove} alt="Remove" onClick={() => removeReq(app._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
