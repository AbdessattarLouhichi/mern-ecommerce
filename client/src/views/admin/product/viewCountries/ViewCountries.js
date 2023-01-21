import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getCountries } from 'src/store/api/countryApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

function ViewProducts() {
  const [search, setSearch] = useState('')
  const [filterCountries, setFilterCountries] = useState([])
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.country.countries)
  const columns = [
    {
      name: 'Country Flag',
      selector: (row) => <img alt="flag" width={50} height={50} src={row.flag} />,
    },
    {
      name: 'Country Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Country Capital',
      selector: (row) => row.capital,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex text-center">
          <button className="btn btn-success btn-sm me-2" onClick={() => alert(row.id)}>
            <FontAwesomeIcon icon={faPencil} className="text-white" />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => alert(row.id)}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]
  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase())
    })
    setFilterCountries(result)
  }, [countries, search])
  return (
    <DataTable
      title="Product List"
      columns={columns}
      data={filterCountries}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="500px"
      selectableRows
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="form-control w-25"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      }
    />
  )
}
export default ViewProducts
