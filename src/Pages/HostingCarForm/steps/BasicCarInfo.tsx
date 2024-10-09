/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select, {  } from 'react-select';
import { useFormContext } from 'react-hook-form';
import makeAnimated from 'react-select/animated'; 

const BasicCarInfo: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

  const featuresOptions = [
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'Air Conditioning', label: 'Air Conditioning' },
    { value: 'USB Charging', label: 'USB Charging' },
    { value: 'GPS Navigation', label: 'GPS Navigation' },
    { value: 'Heated Seats', label: 'Heated Seats' },
  ];

  const categoriesOptions = [
    { value: 'SUV', label: 'SUV' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Hatchback', label: 'Hatchback' },
    { value: 'Coupe', label: 'Coupe' },
    { value: 'Convertible', label: 'Convertible' },
    { value: 'Truck', label: 'Truck' },
  ];

  const handleFeatureChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setValue('basicCarInfo.features', selectedValues);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setValue('basicCarInfo.category', selectedOption ? selectedOption.value : '');
  };

  const animatedComponents = makeAnimated(); 

  return (
    <>
    {/* Car Category */}
    <div className="mb-4">
        <label className="block font-semibold mb-2">Car Category</label>
        <Select
          options={categoriesOptions}
          onChange={handleCategoryChange}
          classNamePrefix="select"
          isClearable
          required
        />
        {errors.basicCarInfo && 'category' in errors.basicCarInfo && typeof errors.basicCarInfo.category?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.category.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="make" className="block font-semibold mb-2">Make</label>
        <input
          id="make"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.make', { required: 'Make is required' })}
        />
        {errors.basicCarInfo && 'make' in errors.basicCarInfo && typeof errors.basicCarInfo.make?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.make.message}</p>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
      <div className="mb-4 w-full">
        <label htmlFor="model" className="block font-semibold mb-2">Model</label>
        <input
          id="model"
          className="w-full border border-gray-300 rounded p-2"
          {...register('basicCarInfo.model', { required: 'Model is required' })}
        />
        {errors.basicCarInfo && 'model' in errors.basicCarInfo && typeof errors.basicCarInfo.model?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.model.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block font-semibold mb-2">Year</label>
        <select {...register('basicCarInfo.year', { required: true })} className="border rounded p-2 text-gray-700" required>
          {Array.from({ length: 30 }, (_, index) => {
            const year = new Date().getFullYear() - index; // Current year minus index
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {errors.basicCarInfo && 'year' in errors.basicCarInfo && typeof errors.basicCarInfo.year?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.year.message}</p>
        )}
      </div>
      </div>

      

    
       {/* Seat Count */}
       <div className="mb-4">
        <label htmlFor="seatCount" className="block font-semibold mb-2">Seat Count</label>
        <Select
          options={Array.from({ length: 8 }, (_, index) => ({
            value: index + 1,
            label: `${index + 1} seat${index === 0 ? '' : 's'}`,
          }))}
          onChange={(selectedOption) => {
            setValue('basicCarInfo.seatCount', selectedOption ? selectedOption.value : '');
          }}
          classNamePrefix="select"
          isClearable
        />
        {errors.basicCarInfo && 'seatCount' in errors.basicCarInfo && typeof errors.basicCarInfo.seatCount?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.seatCount.message}</p>
        )}
      </div>

      {/* Features */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Features</label>
        <Select
          options={featuresOptions}
          isMulti
          onChange={handleFeatureChange}
          components={animatedComponents} 
          classNamePrefix="select"
        />
        {errors.basicCarInfo && 'features' in errors.basicCarInfo && typeof errors.basicCarInfo.features?.message === 'string' && (
          <p className="text-red-500">{errors.basicCarInfo.features.message}</p>
        )}
      </div>
    </>
  );
};

export default BasicCarInfo;
