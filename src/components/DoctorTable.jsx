import React, { useState, useEffect } from 'react';
import EditDoctorForm from './EditDoctorForm';
import AddDoctorForm from './AddDoctorForm';

const baseUrl = 'https://localhost:7105/Doctor';

const createUrlWithParams = () =>{
  const url = new URL(baseUrl);
  url.searchParams.append('IsDescending', false);
  url.searchParams.append('PageNumber', 1);
  url.searchParams.append('PageSize', 5);
  url.searchParams.append('SortParameter', 'LastName');
  url.searchParams.append('SortParameter', 'CareerStartYear');
  return url;
}

function DoctorTable() {
  const [doctors, setDoctors] = useState([]); 
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [addingDoctor, setAddingDoctor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = createUrlWithParams(); 
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
  }, []);

  if (!doctors) {
    return <div>Loading...</div>;
  }

  const handleAdd = () => {
    setAddingDoctor(true);
  };
  
  const handleAddComplete = async () => {
    const url = createUrlWithParams();
    const response = await fetch(url);
    const data = await response.json();
    setDoctors(data.results);
    setAddingDoctor(false);
  }; 

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleUpdate = async () => {
    const url = createUrlWithParams();    
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
    <button onClick={handleAdd}>Добавить</button>
    {addingDoctor && (
        <AddDoctorForm 
          onClose={() => setAddingDoctor(false)} 
          onAdd={handleAddComplete} 
          url = {baseUrl}
          />
      )}
    </div>
  );
}

export default DoctorTable;