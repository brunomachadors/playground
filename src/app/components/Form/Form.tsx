'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Errors, FormData } from '@/app/types/form';
import Button from '../Buttons/Buttons';

function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    hobbies: [],
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    password: '',
    country: '',
    gender: '',
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const hobbies = formData.hobbies.includes(value)
        ? formData.hobbies.filter((hobby) => hobby !== value)
        : [...formData.hobbies, value];
      setFormData({ ...formData, hobbies });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors: Errors = {
      name: '',
      email: '',
      password: '',
      country: '',
      gender: '',
    };

    if (!formData.name) {
      newErrors.name = 'O campo nome é obrigatório.';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'O campo email é obrigatório.';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'O campo senha é obrigatório.';
      valid = false;
    }
    if (!formData.country) {
      newErrors.country = 'O campo país é obrigatório.';
      valid = false;
    }
    if (!formData.gender) {
      newErrors.gender = 'O campo gênero é obrigatório.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      router.push('/submittedform');
    }
  };

  return (
    <div
      id="formContainer"
      className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-100"
    >
      <form id="registrationForm" className="space-y-4" onSubmit={handleSubmit}>
        <h2
          id="formHeader"
          className="text-2xl font-bold mb-6 text-gray-100 text-center"
        >
          Cadastro
        </h2>

        {/* Nome */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-100"
          >
            Nome <span className="text-gray-100">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-gray-100"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
          {errors.name && (
            <p id="nameError" className="text-red-400 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email <span className="text-gray-100">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-gray-100"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
          {errors.email && (
            <p id="emailError" className="text-red-400 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Senha */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            Senha <span className="text-gray-100">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-gray-100"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          {errors.password && (
            <p id="passwordError" className="text-red-400 text-sm">
              {errors.password}
            </p>
          )}
        </div>

        {/* País */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-100"
          >
            País <span className="text-gray-100">*</span>
          </label>
          <select
            id="country"
            name="country"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-gray-100"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Selecione um país</option>
            <option value="brazil">Brasil</option>
            <option value="canada">Canadá</option>
            <option value="usa">Estados Unidos</option>
            <option value="mexico">México</option>
            <option value="portugal">Portugal</option>
          </select>
          {errors.country && (
            <p id="countryError" className="text-red-400 text-sm">
              {errors.country}
            </p>
          )}
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-sm font-medium text-gray-100">
            Gênero <span className="text-gray-100">*</span>
          </label>
          <div id="genderGroup" className="mt-1 text-gray-100">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-radio"
                onChange={handleChange}
                checked={formData.gender === 'male'}
              />
              <span className="ml-2">Masculino</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-radio"
                onChange={handleChange}
                checked={formData.gender === 'female'}
              />
              <span className="ml-2">Feminino</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="other"
                className="form-radio"
                onChange={handleChange}
                checked={formData.gender === 'other'}
              />
              <span className="ml-2">Outro</span>
            </label>
          </div>
          {errors.gender && (
            <p id="genderError" className="text-red-400 text-sm">
              {errors.gender}
            </p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <label className="block text-sm font-medium text-gray-100">
            Lazer
          </label>
          <div
            id="hobbiesGroup"
            className="mt-1 grid grid-cols-2 gap-4 text-gray-100"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="reading"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('reading')}
              />
              <span className="ml-2">Ler</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="travelling"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('travelling')}
              />
              <span className="ml-2">Viajar</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="gaming"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('gaming')}
              />
              <span className="ml-2">Jogos</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="sports"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('sports')}
              />
              <span className="ml-2">Esportes</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="television"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('television')}
              />
              <span className="ml-2">Televisão</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value="sing"
                className="form-checkbox"
                onChange={handleChange}
                checked={formData.hobbies.includes('sing')}
              />
              <span className="ml-2">Cantar</span>
            </label>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Button type="submit" id="submitBtn">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
