import React from 'react';
import { Logo } from '../../components/Logo';
import './Style.css';
import Button from "../../base-components/Button";
import { Link } from "react-router-dom";
import { FA_IR, FA_IR_ERROR } from "../../language";
import LandingImage from "../../assets/images/landing/Frame.png";
import LandingImage2 from "../../assets/images/landing/Group 2.png";
import LandingImage3 from "../../assets/images/landing/maplanding.svg";
import LandingImage4 from "../../assets/images/landing/Personal trainer 1.svg";
import LandingImage5 from "../../assets/images/landing/Group.svg";

const Main = () => {
    return (
        <>
            <div className='bg-white w-screen absolute top-0 left-0 min-h-max ltr'>

                <div id='Top-menu' className='border border-red-600 ltr ' >

                    <div className='border border-red-600 '>
                        <Link to="/Login">
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0 bg-orange-600 text-white"
                            >
                                {FA_IR.Login} / {FA_IR.Register}
                            </Button>
                        </Link>
                    </div>

                    <ul className='w-5/12'>
                        <li>مربیان</li>
                        <li>باشگاه ها</li>
                        <li>تماس  با ما </li>
                        <li>درباره ما</li>
                    </ul>

                    <div id='logo'>
                        <p>دمبل</p>
                    </div>

                </div>

                <main id='main' className='ltr '>

                    <div className='row1'>

                        <div className='flex'>

                            <figure className='w-1/2 flex justify-center p-5'><img src={LandingImage} alt="landing" /></figure>

                            <figure id='neveshte' className='bg-orange-600 w-1/2'>
                                <img src={LandingImage2} alt="" />
                            </figure>

                        </div>

                    </div>
                    <div className="row2  py-10">
                        <figure className='rounded-lg w-1/4'><img src={LandingImage3} alt="imglanding" />
                            <h3>{FA_IR.Locationary}</h3>
                            <p>ورزشکاران میتوانند بر اساس اولویت های خود بهترین باشگاه را انتخاب کرده و در آن ثبت نام کنند</p>
                        </figure>
                        <figure className='rounded-lg w-1/4'><img src={LandingImage4} alt="imglanding" />
                            <h3>{FA_IR.TraineeObvious}</h3>
                            <p>ورزشکاران در دمبل پلن ورزشی اختصاصی خود را دارند و مربی بر تمام فعالیت های آنان نظارت دارد.</p>
                        </figure>
                        <figure className='rounded-lg w-1/4'>
                            <img src={LandingImage5} alt="imglanding" />
                            <h3>{FA_IR.FinancialManagment}</h3>
                            <p>دمبل به شما این امکان را میدهد که شهریه های واریزی ورزشکاران را مدیریت کرده و حقوق مربیان خود را آنلاین پرداخت کنید!</p>
                        </figure>
                    </div>
                    <div className="row3">
                        <div className='border border-red-600 w-3/4 rounded-lg'>
                            <h2 className='w-full text-center p-10'>دمبل در کنار شماست تا به سلامت جسم شما کمک کند</h2>
                            <div className='w-1/3 p-10'>
                                نفر
                                1000
                                مربی<i className="fa-duotone fa-chalkboard-user"></i>
                            </div>
                            <div className='w-1/3 p-10'>
                                عدد
                                1000
                                باشگاه <i className="fa-solid fa-dumbbell"></i>
                            </div>
                            <div className='w-1/3 p-10'>
                                نفر
                                1000
                                ورزشکار   <i className="fa-solid fa-person-walking"></i>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>

                </footer>
            </div>
        </>
    )
}

export default Main
