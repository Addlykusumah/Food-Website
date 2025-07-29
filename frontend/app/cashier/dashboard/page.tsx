'use client';

import Image from "next/image";
import main_photo from "@/public/image/main_photo.png"
import { FaCirclePlay, FaRegCirclePlay } from "react-icons/fa6";
import about from "@/public/image/about.jpg"
import about2 from "@/public/image/about-2.jpg"
import { FaCheckCircle } from "react-icons/fa";

const DashboardPage = () => {
    return (
        <>
            <div className="bg-White-900">
                <div className="bg-white w-full">
                    <div className="flex justify-evenly items-center py-10">
                        <div className="space-y-4">
                            <h1 className="font-amatic text-7xl leading-tight text-dasar1 font-bold w-[400px]">Enjoy Your Healthy Delicious Food</h1>
                            <p className="font-normal text-xl text-abu font-roboto w-[540px]">We are team of talented designers making websites with Next JS</p>
                            <div className="flex justify-start items-center space-x-5">
                                <button className="bg-primary text-white font-medium text-base rounded-full py-3 px-7">Book a Table</button>
                                <div className="flex justify-center items-center space-x-3">
                                    <FaRegCirclePlay className="text-3xl text-primary" />
                                    <button>Watch Video</button>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={main_photo}
                            alt="main_photo"
                            width={480}
                            className="spin"/>
                    </div>
                </div>
                <div className="py-10 space-y-8">
                    <h1 className="font-normal text-base text-abu text-center">About Us</h1>
                    <h1 className="font-amatic font-medium text-5xl text-center">Learn More <span className="text-primary">About Us</span></h1>
                </div>

                <div className="py-8">
                    <div className="flex justify-center">
                        <div className="px-28 space-y-8">
                            <Image
                                src={about}
                                alt="gambar about"
                                width={800} />
                            <div className="font-roboto border-2 border-abu text-center">
                                <div className="py-3">
                                    <h1 className="font-bold text-abu">Book a Table</h1>
                                    <h1 className="text-primary font-semibold">+1 5589 55488 55</h1>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <i className="text-abu inline-block w-[470px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </i>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <FaCheckCircle className="text-primary text-lg"/>
                                    <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaCheckCircle className="text-primary text-lg"/>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
                                </div>
                                <div className="flex space-x-3">
                                    <FaCheckCircle className="text-primary text-lg"/>
                                    <p className="w-[470px]">Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                            <p className="w-[450px]">Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</p>
                            <div className="relative">
                                <Image
                                src={about2}
                                alt="about2"
                                width={410}/>
                                <div>
                                <FaCirclePlay className="text-primary text-5xl absolute top-1/2 left-48 hover:text-white duration-300 ease-in-out transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DashboardPage;
