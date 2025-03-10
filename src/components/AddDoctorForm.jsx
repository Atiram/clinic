import React, { useState } from 'react';

function AddDoctorForm({ onClose, onAdd, url }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [office, setOffice] = useState('');
  const [careerStartYear, setCareerStartYear] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          middleName,
          dateOfBirth,
          email,
          specialization,
          office,
          careerStartYear,
          status
        }),
      });

      if (response.ok) {
        onAdd();
        onClose();
      } else {
        console.error('Ошибка при добавлении');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <h2>Добавить доктора</h2>      
      <input
        type="text"
        placeholder="Имя"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Фамилия"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Отчество"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      /> 
      <input
        type="date"
        placeholder="Дата рождения"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <input
        type="email"
        placeholder="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Специализация"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <input
        type="text"
        placeholder="Офис"
        value={office}
        onChange={(e) => setOffice(e.target.value)}
      /> 
      <input
        type="number"
        placeholder="Год начала работы"
        value={careerStartYear}
        onChange={(e) => setCareerStartYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Статус"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />         
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
}

export default AddDoctorForm;