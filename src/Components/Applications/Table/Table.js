const Table = (props) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>ID</th>
          <th>ID Position</th>
          <th>ID Postulant</th>
          <th>ID Interview</th>
          <th>Result</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-body">
        {props.applications.map((app) => (
          <tr key={app._id}>
            <td>{app._id}</td>
            <td>{app.positions._id}</td>
            <td>{app.postulants._id}</td>
            <td>{app.interview._id}</td>
            <td>{app.result}</td>
            <td>
              <img src="German-MindSet-app/public/edit.png" alt="Edit"></img>
            </td>
            <td>
              <img src="German-MindSet-app/public/remove.png" alt="Remove"></img>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
