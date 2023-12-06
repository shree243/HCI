import React from 'react'
import Layout from './Layout';
import { Link } from 'react-router-dom';
import Banner from "../images/banner5.jpg";
import "../styles/HomeStyles.css";
import Carousal from "./carousal";
import { data } from '../images/mock.js'

const Home = () => {
    return (
        <>
            <Layout>
                <Carousal data={data} />
                <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
                    <div className="headerContainer">
                        <h1>Eagle</h1>
                        <p>Best Driving School In  India</p>
                        <Link to="/tutorials">
                            <button>Tutorials  </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Home
