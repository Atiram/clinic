import React, { useState } from 'react';

function EditDoctorForm({ doctor, onClose, onUpdate, url }) {
  const [firstName, setFirstName] = useState(doctor.firstName);
      const [lastName, setLastName] = useState(doctor.lastName);
      const [middleName, setMiddleName] = useState(doctor.middleName);
      const [dateOfBirth, setDateOfBirth] = useState(doctor.dateOfBirth);
      const [email, setEmail] = useState(doctor.email);
      const [specialization, setSpecialization] = useState(doctor.specialization);
      const [office, setOffice] = useState(doctor.office);
      const [careerStartYear, setCareerStartYear] = useState(doctor.careerStartYear);
      const [status, setStatus] = useState(doctor.status);

  const handleSave = async () => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...doctor, 
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
        onUpdate();
        onClose();
      } else {
        console.error('Ошибка при обновлении:', response);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <h2>Редактировать доктора</h2>
      <label>
        Имя:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Фамилия:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Отчество:
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </label>
      <label>
        Дата рождения:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </label>
      <label>
        Почта:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Специализация:
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </label>
      <label>
        Офис:
        <input
          type="text"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
        />
      </label>
      <label>
         Год начала работы:
        <input
          type="number"
          value={careerStartYear}
          onChange={(e) => setCareerStartYear(e.target.value)}
        />
      </label>
      <label>
        Статус:
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
}

export default EditDoctorForm;