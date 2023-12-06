import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import city1 from '../images/city1.jpg'
import drive1 from '../images/drive1.jpg'
// import city3 from '../images/city3.jpg'


const Carousal = () => {
    const data =
        [
            {
                "image": city1,
                "title": "hii1 image",
                "subTitle": "ddssfsfs"
            },
            {
                "image": drive1,
                "title": "hiirtret image",
                "subTitle": "tryrtyr"
            },
            {
                "image": city1,
                "title": "hii3 image",
                "subTitle": "ddssfsfs"
            }
        ]
    return (
        <>
            <Carousel>
                {/* {console.log(data, "data")}
                {console.log(images, "images")} */}

                {data.map((dt) => (
                    <Carousel.Item key={dt.image}>
                        {console.log(dt, "images")}
                        <img style={{ height: '90vh', backgroundSize: 'cover' }}
                            src={dt.image}
                            className='d-block w-100'
                            alt={dt.title}
                        />
                        <Carousel.Caption>
                            <h3>{dt.title} </h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export default Carousal
