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
import { useAppSelector } from '../../redux/hooks';

const Main = () => {
    const auth = useAppSelector((state: any) => state.auth);
    function open() {
        let x = document.getElementsByClassName('mobile-menu')[0];
        x.classList.toggle('right-1');
        document.getElementById('mmenubtn')?.classList.toggle('top-3/4')
    }
    return (
        <>
            <div className='bg-white w-screen absolute top-0 left-0 min-h-max ltr px-2 base'>

                <div id='Top-menu' className='p-5 ltr border hidden lg:flex ' >

                    <div className=' '>
                        <Link to={!auth.access ? "/auth/login" : "/dashboard"}>
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0 bg-orange-600 text-white"
                            >
                            {  !auth.access ? `${FA_IR.Login} / ${FA_IR.Register}` : FA_IR.Dashboard}
                            </Button>
                        </Link>
                    </div>

                    <ul className='w-5/12 menu hover:cursor-pointer '>
                        <li className=''>مربیان</li>
                        <li>باشگاه ها</li>
                        <li>تماس  با ما </li>
                        <li>درباره ما</li>
                    </ul>

                    <div id='logo'>
                        <p>دمبل</p>
                    </div>

                </div>

                <button id='mmenubtn' className='border bg-orange-600 rounded-full w-16 h-16 fixed top-10 right-10 text-white z-10 lg:hidden' onClick={open}>|||</button>
              
                <div className="mobile-menu p-5 overflow-hidden -right-96 ">
                    <div className=' '>
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

                    <ul className='rtl w-full menu hover:cursor-pointer mt-2 '>
                        <li className='p-5 text-gray-50 text-lg transition-all duration-500 hover:text-black'>مربیان</li>
                        <li className='p-5 text-gray-50 text-lg transition-all duration-500 hover:text-black'>باشگاه ها</li>
                        <li className='p-5 text-gray-50 text-lg transition-all duration-500 hover:text-black'>تماس  با ما </li>
                        <li className='p-5 text-gray-50 text-lg transition-all duration-500 hover:text-black'>درباره ما</li>
                    </ul>
                </div>
                <main id='main' className='ltr '>

                    <div className='row1 border'>

                        <div className='flex'>

                            <figure className='w-1/2 flex justify-center p-5'><img src={LandingImage} alt="landing" /></figure>

                            <figure id='neveshte' className='bg-orange-600 w-1/2 px-11'>
                                <img src={LandingImage2} alt="" />
                            </figure>

                        </div>

                    </div>
                    <div className="row2  p-10 border lg:flex ">
                        <figure className='rounded-lg w-full lg:w-1/4 '><img src={LandingImage3} alt="imglanding" />
                            <h3 className='p-3'>{FA_IR.Locationary}</h3>
                            <p className='p-3'>ورزشکاران میتوانند بر اساس اولویت های خود بهترین باشگاه را انتخاب کرده و در آن ثبت نام کنند</p>
                        </figure>
                        <figure className='rounded-lg w-full lg:w-1/4 '><img src={LandingImage4} alt="imglanding" />
                            <h3 className='p-3'>{FA_IR.TraineeObvious}</h3>
                            <p className='p-3'>ورزشکاران در دمبل پلن ورزشی اختصاصی خود را دارند و مربی بر تمام فعالیت های آنان نظارت دارد.</p>
                        </figure>
                        <figure className='rounded-lg w-full lg:w-1/4 '>
                            <img src={LandingImage5} alt="imglanding" />
                            <h3 className='p-3'>{FA_IR.FinancialManagment}</h3>
                            <p className='p-3'>دمبل به شما این امکان را میدهد که شهریه های واریزی ورزشکاران را مدیریت کرده و حقوق مربیان خود را آنلاین پرداخت کنید!</p>
                        </figure>
                    </div>
                    <div className="row3 p-5">
                        <div className='w-3/4 rounded-lg'>
                            <h2 className='w-full text-center p-8 '>دمبل در کنار شماست تا به سلامت جسم شما کمک کند</h2>
                            <div className='w-1/3 p-10 '>
                                نفر
                                1000
                                مربی<i className="fa-duotone fa-chalkboard-user"></i>
                            </div>
                            <div className='w-1/3 p-10 '>
                                عدد
                                1000
                                باشگاه <i className="fa-solid fa-dumbbell"></i>
                            </div>
                            <div className='w-1/3 p-10 '>
                                نفر
                                1000
                                ورزشکار   <i className="fa-solid fa-person-walking"></i>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className='border'>
                    <ul className='w-5/12  text-lg'>
                        <li>مربیان</li>
                        <li>باشگاه ها</li>
                        <li>تماس  با ما </li>
                        <li>درباره ما</li>
                    </ul>

                    <div className='w-full text-center p-5'>
                        <i className="fa-brands fa-telegram p-3 text-4xl"></i>
                        <i className="fa-brands fa-instagram p-3 text-4xl"></i>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Main
