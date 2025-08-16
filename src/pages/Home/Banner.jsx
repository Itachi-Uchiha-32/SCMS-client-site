import React from 'react';
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
    const slides = [
    {
      url: 'https://i.ibb.co/ZpWNRj0r/shutterstock-1026630514-LR.jpg',
      heading: 'Welcome to EA Sports Club',
      desc: 'Your journey to fitness and fun begins here.',
    },
    {
      url: 'https://i.ibb.co/qLDz4d1y/sports-balls.jpg',
      heading: 'Premium Facilities',
      desc: 'Book your sessions with just a few clicks.',
    },
    {
      url: 'https://i.ibb.co/1G61VBm3/pexels-photo-262524.jpg',
      heading: 'Join the Action',
      desc: 'Engage in a variety of sports activities.',
    },
  ];
  return (
    <div data-aos="zoom-in" className="max-w-screen-xl mx-auto mb-10">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[300px] md:h-[450px] w-full bg-black">
            <img
              src={slide.url}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 bg-black/30">
              <h2 className="text-xl md:text-4xl font-bold">{slide.heading}</h2>
              <p className="mt-2 text-sm md:text-lg">{slide.desc}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
