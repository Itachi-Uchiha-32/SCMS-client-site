import React from 'react';

const About = () => {
  return (
    <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src="https://i.ibb.co/G4TTR5p6/r0-0-5710-3223-w1200-h678-fmax.jpg"
          alt="About the club"
          className="rounded-xl w-full h-80 object-cover shadow-md"
        />

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-900">About Our Club</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EA Sports Club has been at the heart of community fitness for over a decade. We offer top-tier sports facilities including tennis, squash, and badminton courts. Our club is more than just a place to play — it’s a place to grow, connect, and thrive.
          </p>
          <p className="text-gray-600">
            Our mission is to provide accessible, high-quality training and booking experiences for athletes of all levels. Whether you're a beginner or a pro, EA Sports Club welcomes you to be part of the action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
