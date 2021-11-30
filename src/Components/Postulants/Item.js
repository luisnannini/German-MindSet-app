import style from './postulants-Item.module.css';
import Button from './Button';

function Item({ postulant, onDelete, setModal, openForm }) {
  return (
    <tr>
      {Object.keys(postulant).map((postulantKey) => {
        if (typeof postulant[postulantKey] === 'boolean') {
          return (
            <td>
              <input type="checkbox" checked={postulant[postulantKey]} disabled={true}></input>
            </td>
          );
        }
        return <td>{postulant[postulantKey]}</td>;
      })}
      <Button
        title="Edit"
        onClick={() =>
          (window.location.href = `${window.location.origin}/postulants?id=${postulant._id}`)
        }
      />
      <Button
        title="Delete"
        onClick={
          () => {
            setModal({
              // muestra el modal y le pasa la funcion para sus botones
              id: postulant._id,
              title: 'Delete',
              message: 'Are you sure?',
              state: true,
              action: onDelete,
              type: 'confirm'
            });
          } // logro mostrar el modal
        }
      />
    </tr>
  );
}

export default Item;
