import React, { useState, useEffect } from 'react';
import EditDoctorForm from './EditDoctorForm';
import AddDoctorForm from './AddDoctorForm';
import './DoctorTable.css'

const baseUrl = 'https://localhost:7105/Doctor';

const createUrlWithParams = (currentPage, pageSize, sortField, sortDirection, searchQuery) => {
  const url = new URL(baseUrl);
  url.searchParams.append('IsDescending', sortDirection === 'desc');
  url.searchParams.append('PageNumber', currentPage);
  url.searchParams.append('PageSize', pageSize);
  url.searchParams.append('SortParameter', sortField);
  if (searchQuery) {
    url.searchParams.append('SearchValue', searchQuery);
  }
  return url;
};

function DoctorTable() {
  const [doctors, setDoctors] = useState([]); 
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [addingDoctor, setAddingDoctor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('LastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = createUrlWithParams(currentPage, pageSize, sortField, sortDirection, searchQuery); 
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      const data = await response.json();
      setDoctors(data.results);
    };

    fetchData();
  }, [currentPage, pageSize, sortField, sortDirection, searchQuery]);

  if (!doctors) {
    return <div>Loading...</div>;
  }

  const handleAdd = () => {
    setAddingDoctor(true);
  };
  
  const handleAddComplete = async () => {
    const url = createUrlWithParams(currentPage, pageSize, sortField, sortDirection, searchQuery);
    const response = await fetch(url);
    const data = await response.json();
    setDoctors(data.results);
    setAddingDoctor(false);
  }; 

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleUpdate = async () => {
    const url = createUrlWithParams(currentPage, pageSize, sortField, sortDirection, searchQuery);    
    const response = await fetch(url);
    const data = await response.json();
    setDoctors(data.results);
    setEditingDoctor(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(baseUrl+`?id=${id}`, {
        method: 'DELETE',
      });      
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
       <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sortField">Сортировать по:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="FirstName">Имя</option>
          <option value="LastName">Фамилия</option>
          <option value="MiddleName">Отчество</option>
          <option value="DateOfBirth">Дата Рождения</option>
          <option value="Email">Почта</option>
          <option value="Specialization">Специализация</option>
          <option value="Office">Офис</option>
          <option value="CareerStartYear">Год</option>          
        </select>
        <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
          <th>Почта</th>
          <th>Специализация</th>
          <th>Офис</th>
          <th>Год</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor.id}>
            <td>{doctor.firstName}</td>
            <td>{doctor.lastName}</td>
            <td>{doctor.middleName}</td>
            <td>{doctor.dateOfBirth}</td>
            <td>{doctor.email}</td>
            <td>{doctor.specialization}</td>
            <td>{doctor.office}</td>
            <td>{doctor.careerStartYear}</td>
            <td>{doctor.status}</td>
            <td>
              <button onClick={() => handleEdit(doctor)}>Изменить</button>              
              <button onClick={() => handleDelete(doctor.id)}>Удалить</button>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {editingDoctor && (
        <EditDoctorForm
          doctor={editingDoctor}
          onClose={() => setEditingDoctor(null)}
          onUpdate={handleUpdate}
          url={baseUrl}
        />
    )}    
    <button onClick={handleAdd}>Добавить доктора</button>
    {addingDoctor && (
        <AddDoctorForm 
          onClose={() => setAddingDoctor(false)} 
          onAdd={handleAddComplete} 
          url = {baseUrl}
          />
      )}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(doctors.totalCount / pageSize)}
        >
          Next
        </button>      
        <label>Размер страницы</label>
        <input
          type="number"          
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DoctorTable;