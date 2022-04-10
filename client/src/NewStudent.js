import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function NewStudent() {
  let inputs = [
    { name: "name", label: "Name", validation: (a) => a.length >= 3 },
    { name: "surname", label: "Surname", validation: (a) => a.length >= 4 },
    { name: "username", label: "Username", validation: (a) => a.length >= 2 },
    { name: "password", type: "password", label: "Password", validation: (a) => a.length >= 8 },
    { name: "email", label: "Email", validation: (a) => new RegExp('[A-Z0-9._%+-]+@[A-Z0-9-]+[.]{1}[A-Z]{2,4}').test(a.toUpperCase()) },
  ]
  return (
    <div className="NewStudent">
      <Link to="/" className="button">
        Back
      </Link>
      <Form inputs={inputs} api="student" submit="Add" />
    </div>
  );
}

export default NewStudent;
