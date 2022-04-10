import React from 'react';
import { Link } from 'react-router-dom';
import './Students.css';
import Table from './Table';

function Students() {
  let header = ["Name", "Surname", "Username", "Password", "Email", "Actions"]
  const [data, setData] = React.useState(null);
  fetch("/students").then((res) => {
    res.json().then((json) => {
      setData(json.students);
    })
  })
  return (
    <div className="Students">
      <Link to="/new" className="button">
        Add new student
      </Link>
      {!data ? <p className="loading">Loading...</p> : <Table head={header} body={data} />}
    </div>
  );
}

export default Students;
