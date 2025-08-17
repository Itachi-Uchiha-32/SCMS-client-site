import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Banner from './Banner';
import About from './About';
import LocationSection from './LocationSection';
import Promotions from './Promotions';
import useTitle from '../../hooks/useTitle';
import FeaturedCourts from './FeaturedCourts';
import CustomerReviews from './CustomerReviews';
import UpcomingEvents from './UpcomingEvents';
import NewsletterSignup from './NewsletterSignup';
import FAQ from './FAQ';

const HomePage = () => {
     useTitle('Home');
    return (
        <div className='space-y-4'>
            <Navbar/>
            <div className='pt-14'>
                <Banner/>
                <FeaturedCourts/>
                <About/>
                <UpcomingEvents/>
                <LocationSection/>
                <Promotions/>
                <CustomerReviews/>
                <FAQ/>
                <NewsletterSignup/>
                <Footer/>
            </div>
        </div>
    );
};

export default HomePage;