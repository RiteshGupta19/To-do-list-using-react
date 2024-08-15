import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [todo, todofunc] = useState([]);

  let button = (event) => {
    event.preventDefault();
    let val = event.target.inp.value;

    if (!todo.includes(val)) {
      let list = [...todo, val];
      todofunc(list);
      event.target.inp.value = '';
    } else {
      alert("The Value Already Exists in the List!!");
    }
  };

  let listmap = todo.map((value, i) => {
    return (
      <List value={value} key={i} index={i} todo={todo} todofunc={todofunc} />
    );
  });

  return (
    <div className="App bg-light vh-100">
      <h1 className='text-danger'>ToDo List</h1>
      <form className='d-flex justify-content-center mt-5' onSubmit={button}>
        <input type='text' name='inp' className='fs-4 form-control w-50 me-4' placeholder='Enter Items Here' /><button className='px-5 fs-3 btn btn-outline-primary'>Save</button>
      </form>
      <ul className=''>
        {listmap}
      </ul>
    </div>
  );
}

export default App;

function List({ value, index, todo, todofunc }) {
  let [edit, setEdit] = useState(false);
  let [newValue, setNewValue] = useState(value);

  let del = () => {
    let final = todo.filter((v, i) => i !== index);
    todofunc(final);
  };

  let saveEdit = (e) => {
    e.preventDefault();
    let updatedTodo = [...todo];
    updatedTodo[index] = newValue;
    todofunc(updatedTodo);
    setEdit(false);
  };

  return (
    <div className='d-flex w-50 position-relative m-auto'>
      {edit ? (
        <form onSubmit={saveEdit} className="w-100">
          <input
            type="text"
            className="form-control fs-4 mt-4 py-2 bg-black text-white text-start ps-3 rounded-3"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button type="submit" className="btn btn-success fs-4 mt-2">Update</button>
        </form>
      ) : (
        <li className={`mt-4 py-2 fs-4 list-unstyled bg-black text-white w-100 text-start ps-3 rounded-3`}>
          {index + 1}. {value}
        </li>
      )}
      {!edit && (
        <span className='fs-4 me-5 position-absolute text-warning end-0 mt-4 pt-2' onClick={() => setEdit(true)}>Edit</span>
      )}
      <span className='fs-2 me-3 position-absolute text-primary end-0 mt-4' onClick={del}>&times;</span>
    </div>
  );
}
