import React, { useState, useEffect } from 'react';

function DoctorTable() {
  const [doctor, setDoctors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('https://localhost:7105/Doctor'); 
  
      
      url.searchParams.append('IsDescending', false);
      url.searchParams.append('PageNumber', 1);
      url.searchParams.append('PageSize', 5);
      url.searchParams.append('SortParameter', 'LastName'); 
      url.searchParams.append('SortParameter', 'CareerStartYear');
  
      const response = await fetch(url, { 
        method: 'GET', 
        headers: {
          'accept': 'application/json' 
        }
      });
  
      const data = await response.json();
      setDoctors(data.results);
    };
  
    fetchData();
  },); 

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (    
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Отчество</th>          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{doctor[0].firstName}</td>
          <td>{doctor[0].lastName}</td>
          <td>{doctor[0].middleName}</td>          
        </tr>
        <tr>
          <td>{doctor[1].firstName}</td>
          <td>{doctor[1].lastName}</td>
          <td>{doctor[1].middleName}</td>          
        </tr>
        <tr>
          <td>{doctor[2].firstName}</td>
          <td>{doctor[2].lastName}</td>
          <td>{doctor[2].middleName}</td>         
        </tr>
      </tbody>
    </table>
  );
}

export default DoctorTable;