import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Banner from './Banner';
import About from './About';
import LocationSection from './LocationSection';
import Promotions from './Promotions';
import useTitle from '../../hooks/useTitle';

const HomePage = () => {
     useTitle('Home');
    return (
        <div className='space-y-4'>
            <Navbar/>
            <Banner/>
            <About/>
            <LocationSection/>
            <Promotions/>
            <Footer/>
        </div>
    );
};

export default HomePage;