"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import styles from "./Sponsors.module.css"

const images = [
  "/images/logoNavGreen.png",
  "/images/logoNavGreen.png",
  "/images/logoNavGreen.png",
  "/images/logoNavGreen.png",
  "/images/logoNavGreen.png",
]

const settings = {
  className: "slider variable-width",
  dots: false,
  arrows: false,
  infinite: true,
  variableWidth: true,
  autoplay: true,
  slidesToShow: 5,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  draggable: false
}

export default function SponsorsSection() {
  
    return (
      <section className={styles.sponsors}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={styles.wrapper}>
              <img src={image} className={styles.image} />
            </div>
          ))}
        </Slider>
      </section>
    );
}
