import React, { useState, useEffect } from 'react';

function DoctorTable() {
  const [doctor, setDoctors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('https://localhost:7105/Doctor'); // Use URL constructor for easier query parameter handling
  
      // Add query parameters (adjust these as needed)
      url.searchParams.append('IsDescending', false);
      url.searchParams.append('PageNumber', 1);
      url.searchParams.append('PageSize', 5);
      url.searchParams.append('SortParameter', 'LastName'); 
      url.searchParams.append('SortParameter', 'CareerStartYear');
  
      const response = await fetch(url, { // Use the constructed URL
        method: 'GET', // Use GET for fetching data
        headers: {
          'accept': 'application/json' // Expect JSON response
        }
      });
  
      const data = await response.json();
      setDoctors(data.results);// Assuming the API returns an array of doctors
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
          {/* ... другие заголовки */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{doctor[0].firstName}</td>
          <td>{doctor[0].lastName}</td>
          <td>{doctor[0].middleName}</td>
          {/* ... другие данные */}
        </tr>
        <tr>
          <td>{doctor[1].firstName}</td>
          <td>{doctor[1].lastName}</td>
          <td>{doctor[1].middleName}</td>
          {/* ... другие данные */}
        </tr>
        <tr>
          <td>{doctor[2].firstName}</td>
          <td>{doctor[2].lastName}</td>
          <td>{doctor[2].middleName}</td>
          {/* ... другие данные */}
        </tr>
      </tbody>
    </table>
  );
}

export default DoctorTable;