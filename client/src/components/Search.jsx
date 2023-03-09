import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi";

function Search({value, onChange}) {
  return (
    <Form className="d-flex mx-5 col-10 col-lg-8 ">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 rounded-pill"
        aria-label="Search"
        value={value}
        onChange={onChange}
      />
      <Button variant="outline-success" className='rounded-pill'>Search</Button>
    </Form>
  )
}

export default Search