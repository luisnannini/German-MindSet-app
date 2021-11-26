import './postulants-Item.module.css';

function Item({ postulantKey, dataType, rowType }) {
  if (rowType === 'head') return <th>{postulantKey}</th>;
  return <td>{postulantKey}</td>;
}

export default Item;
