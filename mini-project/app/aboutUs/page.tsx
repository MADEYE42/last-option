import React from 'react';

const aboutUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-900 mb-10">About Us</h1>
      
      <div className="flex flex-wrap justify-center space-x-4 space-y-4">
        {/* Team Member 1 */}
        <div className="w-64 p-6 bg-red-900 text-white rounded-lg shadow-lg transition transform hover:-translate-y-3 hover:shadow-2xl duration-300 ease-in-out">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="mt-2">Founder & CEO</p>
          <p className="mt-4 text-sm">
            John is passionate about building innovative solutions to solve everyday problems.
          </p>
        </div>

        {/* Team Member 2 */}
        <div className="w-64 p-6 bg-red-900 text-white rounded-lg shadow-lg transition transform hover:-translate-y-3 hover:shadow-2xl duration-300 ease-in-out">
          <h2 className="text-xl font-semibold">Jane Smith</h2>
          <p className="mt-2">Chief Technology Officer</p>
          <p className="mt-4 text-sm">
            Jane leads the tech team with a focus on scalable and secure software solutions.
          </p>
        </div>

        {/* Team Member 3 */}
        <div className="w-64 p-6 bg-red-900 text-white rounded-lg shadow-lg transition transform hover:-translate-y-3 hover:shadow-2xl duration-300 ease-in-out">
          <h2 className="text-xl font-semibold">Emily Johnson</h2>
          <p className="mt-2">Lead Designer</p>
          <p className="mt-4 text-sm">
            Emily brings creativity and design thinking to every project, ensuring a user-centric experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default aboutUs;
