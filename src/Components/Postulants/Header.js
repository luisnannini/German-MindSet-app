import 'postulants-Header.module.css';

//import styles from './postulants.module.css';
//import AddItem from './Item';

function Header({ title }) {
  const onCLick = () => {
    console.log('asd');
  };
  return (
    <>
      <h1>{title}</h1>
      <button onClick={onCLick}>Add</button>
    </>
  );
}

export default Header;
