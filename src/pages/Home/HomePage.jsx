import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Banner from './Banner';
import About from './About';
import LocationSection from './LocationSection';
import Promotions from './Promotions';
import useTitle from '../../hooks/useTitle';
import FeaturedCourts from './FeaturedCourts';

const HomePage = () => {
     useTitle('Home');
    return (
        <div className='space-y-4'>
            <Navbar/>
            <div className='pt-14'>
                <Banner/>
                <FeaturedCourts/>
                <About/>
                <LocationSection/>
                <Promotions/>
                <Footer/>
            </div>
        </div>
    );
};

export default HomePage;