import edit from './edit.png';
import remove from './remove.png';

const Table = ({ applications, onClickEdit, editReq, removeReq }) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>ID</th>
          <th>ID Position</th>
          <th>ID Postulant</th>
          {/* <th>ID Interview</th> */}
          <th>Result</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-body">
        {applications.map((app) => (
          <tr key={app._id}>
            <td>{app._id}</td>
            <td>{app.positions._id}</td>
            <td>{app.postulants._id}</td>
            {/* <td>{app.interview._id}</td> */}
            <td>{app.result}</td>
            <td>
              <img
                src={edit}
                alt="Edit"
                onClick={() => {
                  onClickEdit;
                  editReq(app._id);
                }}
              />
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
