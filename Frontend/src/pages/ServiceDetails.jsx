import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceId } = useParams();

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-md mt-10 rounded-xl">
      <h1 className="text-3xl font-bold text-blue-900 capitalize mb-4">
        {serviceId.replace('-', ' ')} Service
      </h1>
      <p className="text-slate-600 mb-6">
        Welcome to the official portal for {serviceId}. Here you can apply for new services or track existing applications.
      </p>
      
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
          <li>Ensure you have your National ID ready.</li>
          <li>Digital copies of supporting documents are required.</li>
          <li>Processing time usually takes 3-5 working days.</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetails;