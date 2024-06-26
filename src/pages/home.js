import React from 'react';

import * as DOMPurify from 'dompurify';

import './style/home.css';

import bannerSmall from '../images/bannerSmall.png';
import bannerBig from '../images/bannerBig.png';
import introBig from '../images/introBig.png';
import introSmall from '../images/introSmall.png';
import nailCare from '../images/nailCare.png';
import nailArt from '../images/nailArt.png';

import lashesServices from '../images/lashesService.png';
import lahesSercviceBottom from '../images/lashesServiceBottom.png';
import otherBig from '../images/otherBig.png';
import otherSmall from '../images/otherSmall.png';
import homeFlowerDeco from '../images/home/flower.svg';

// Content
// import home from '../config/content/home.json';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../store/settings/action';
import { Link } from 'react-router-dom';

// Hooks
import useService from '../hooks/useServices';

// Animation
import { useSpring } from '@react-spring/web';
import { Modal } from 'react-bootstrap';

function Home() {
    const [menu, setMenu] = React.useState(false);
    document.title = 'Little Daisy - Home';
    const dispatch = useDispatch();

    const { home } = useSelector((state) => {
        return {
            home: state.Setting?.setting?.content?.home,
        };
    });

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    React.useEffect(() => {
        dispatch(getSettingList('home'));
    }, [dispatch]);

    const [openedDescription, setOpenDescription] = React.useState({
        open: false,
        serviceId: null,
    });

    // Animation
    const animatedDescription = useSpring({
        to: {
            maxHeight: openedDescription?.open ? '200px' : null,
            transition: 'max-height 0.4s linear',
        },
    });

    return (
        <section>
            {/* Banner */}
            <div className="banner" id="st-hero">
                <h1 className="banner-title">{home?.hero?.title}</h1>
                <h2>{home?.hero?.subtitle}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(home?.hero?.content),
                    }}
                ></p>

                <div className="banner-img">
                    <div className="banner-img-big">
                        <img alt="banner" src={home?.hero?.images?.[0] || bannerBig} width={'100%'} loading="lazy" />
                    </div>
                    <div className="banner-img-extra">
                        <div className="banner-img-flower">
                            <img
                                alt="banner"
                                src={home?.hero?.images?.[1] || homeFlowerDeco}
                                width={'100%'}
                                loading="lazy"
                            />
                        </div>
                        <div className="banner-img-small">
                            <img
                                alt="banner"
                                src={home?.hero?.images?.[2] || bannerSmall}
                                width={'100%'}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            {/* Introduce */}
            <div className="intro" id="st-intro">
                <div className="intro-bg"></div>
                <div className="intro-form">
                    <div className="intro-img">
                        <div className="intro-img-form">
                            <div className="intro-img-big">
                                <img
                                    alt="intro"
                                    src={home?.intro?.images?.[0] || introBig}
                                    width={'100%'}
                                    loading="lazy"
                                />
                            </div>
                            <div className="intro-img-small">
                                <img
                                    alt="intro"
                                    src={home?.intro?.images?.[1] || introSmall}
                                    width={'100%'}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="intro-content">
                        <div className="intro-img-flower-top">
                            <img
                                alt="deco"
                                src={home?.intro?.images?.[2] || homeFlowerDeco}
                                width={'100%'}
                                loading="lazy"
                            />
                        </div>
                        <div className="intro-content-form">
                            <div>
                                <h6>{home?.intro?.subtitle}</h6>
                                <h2 className="intro-title">{home?.intro?.title}</h2>
                            </div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(home?.intro?.content),
                                }}
                            ></p>
                            <div>
                                <h5>{home?.intro?.child?.title}</h5>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(home?.intro?.child?.content),
                                    }}
                                ></p>
                            </div>
                            {/* <div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline"
                                >
                                    About Us
                                </Button>
                            </div> */}
                        </div>
                        <div className="intro-img-flower-bot">
                            <img
                                alt="deco"
                                src={home?.intro?.images?.[3] || homeFlowerDeco}
                                width={'100%'}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Service Quality */}
            <div className="quality" id="st-introServices">
                <div className="quality-form">
                    <h1 className="quality-title">{home?.introServices?.title}</h1>
                </div>
            </div>
            {/* Nail Services */}
            <div className="other" id="st-nailService">
                <div className="other-bg">
                    <div className="other-img-flower">
                        <img alt="deco" src={homeFlowerDeco} width={'100%'} loading="lazy" />
                    </div>
                </div>
                <div className="other-form">
                    <div className="other-img">
                        <div className="other-img-form">
                            <div className="other-img-big">
                                <img
                                    src={home?.nailService?.images?.[0] || otherBig}
                                    alt="Service"
                                    width={'100%'}
                                    loading="lazy"
                                />
                            </div>
                            <div className="other-img-small">
                                <img
                                    src={home?.nailService?.images?.[1] || otherSmall}
                                    alt="Service"
                                    width={'100%'}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="other-content">
                        <div className="other-content-form">
                            <h1 className="other-title">Nail Services</h1>
                            <div className="other-list">
                                {services
                                    ?.find?.((e) => e.serviceId === 1 || e.serviceName === 'Nail')
                                    ?.childs?.map?.((item, index) => {
                                        return (
                                            <div key={index} className="other-list-item-form">
                                                <Link to={`/service?name=${item?.serviceName}`}>
                                                    <div className="other-list-item">
                                                        <p>
                                                            <b>{item.serviceName}</b>
                                                        </p>
                                                        <div className="other-list-dashed"></div>
                                                        <p>
                                                            <b>{item.duration}</b>
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div className="other-item-explain">
                                                    <div className="mb-1">{item?.description}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="mt-2">
                                <div className="btn-frame-dark">
                                    <Link to="/booking" className="link-text">
                                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Lashes Services */}
            <div className="lashes" id="st-lashesService">
                <div className="lashes-bg"></div>
                <div className="lashes-form">
                    <div className="lashes-content">
                        <div className="lashes-content-form">
                            <h1 className="lashes-title">Lashes Services</h1>
                            <div className="lashes-list">
                                {services
                                    ?.find?.((e) => {
                                        return e.serviceId === 3 || e.serviceName === 'Lashes';
                                    })
                                    ?.childs?.map?.((item, index) => {
                                        return (
                                            <div key={index} className="other-list-item-form">
                                                <Link to={`/service?name=${item?.serviceName}`}>
                                                    <div className="other-list-item">
                                                        <p>
                                                            <b>{item.serviceName}</b>
                                                        </p>
                                                        <div className="other-list-dashed"></div>
                                                        <p>
                                                            <b>{item.duration}</b>
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div className="other-item-explain">
                                                    <div className="mb-1">{item?.description}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {services
                                    ?.find?.((e) => {
                                        return e.serviceId === 32 || e.serviceName === 'Eyebrow';
                                    })
                                    ?.childs?.map?.((item, index) => {
                                        return (
                                            <div key={index} className="other-list-item-form">
                                                <Link to={`/service?name=${item?.serviceName}`}>
                                                    <div className="other-list-item">
                                                        <p>
                                                            <b>{item.serviceName}</b>
                                                        </p>
                                                        <div className="other-list-dashed"></div>
                                                        <p>
                                                            <b>{item.duration}</b>
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div className="other-item-explain">
                                                    <div className="mb-1">{item?.description}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div>
                                <div className="btn-frame-dark">
                                    <Link to="/booking" className="link-text">
                                        <button className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lashes-img">
                        <div className="lashes-img-form">
                            <div className="lashes-img-big">
                                <img
                                    src={home?.lashesService?.images?.[0] || lashesServices}
                                    alt="Service"
                                    width={'100%'}
                                    loading="lazy"
                                />
                            </div>
                            <div className="lashes-img-small">
                                <img
                                    src={home?.lashesService?.images?.[1] || lahesSercviceBottom}
                                    alt="Service"
                                    width={'100%'}
                                    loading="lazy"
                                />
                                <div className="lashes-img-flower">
                                    <img
                                        alt="deco"
                                        src={home?.lashesService?.images?.[2] || homeFlowerDeco}
                                        width={'100%'}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-promotion">
                <div className="home-promotion-form">
                    <div className="home-promotion-content">
                        <div className="home-promotion-title">Your Perfect Spa Journey</div>
                        <div>
                            <Link to={'/promotion'}>
                                <button
                                    onClick={() => setMenu(true)}
                                    className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark home-promotion-btn"
                                >
                                    Starts Here
                                </button>
                            </Link>
                        </div>
                        <button
                            onClick={() => setMenu(true)}
                            className="my-btn text-uppercase btn-primary-outline btn btn-outline btn-dark home-promotion-btn"
                        >
                            our menu
                        </button>
                        <Menu show={menu} hide={() => setMenu(false)} />
                        <div className="home-promotion-slogan">Access to explore our special offers or our menu</div>
                    </div>
                    <div className="home-promotion-img-form">
                        <div className="home-promotion-img-nail">
                            <img src={home?.lashesService?.images?.[3] || bannerSmall} />
                        </div>
                        <div className="home-promotion-img-lash">
                            <img src={home?.lashesService?.images?.[4] || lashesServices} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            {/* <div className="gallery" id="st-galleries">
                <div className="gallery-form">
                    <h1 className="gallery-title">Gallery</h1>
                    <div className="gallery-img-form">
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryFirst1} width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryFirst2} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={gallerySecond1} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={gallerySecond2} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                        <div className="gallery-item">
                            <div className="gallery-img-1">
                                <img src={galleryThird1} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                            <div className="gallery-img-2">
                                <img src={galleryThird2} alt="Service" width={'100%'} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="gallery-view-more">
                        View More
                        <HiOutlineArrowNarrowDown></HiOutlineArrowNarrowDown>
                    </div>
                </div>
            </div> */}
            {/* Comment and Review */}
            {/* <div className="review py-5" id="st-testimonials">
                <div className="review-form">
                    <div className="review-header">
                        <h1 className="review-intro">{home?.testimonials?.subtitle}</h1>
                        <div className="review-title">{home?.testimonials?.title}</div>
                    </div>
                    <div className="review-list">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 200,
                                slideShadows: false,
                                modifier: 1,
                            }}
                            navigation={true}
                            initialSlide={1 || 0}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {home?.testimonials?.review?.map((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img
                                                        src={item?.image || reviewUser}
                                                        alt="Service"
                                                        width={'100%'}
                                                        height={'100%'}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="review-user-name">{item?.title}</div>
                                                <div
                                                    className="review-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(item?.content),
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div> */}
            {/* Comment and Review Responsive*/}
            {/* <div className="review-res py-5" id="st-testimonials">
                <div className="review-form">
                    <div className="review-header">
                        <h1 className="review-intro">TESTEMONIALS THOUGHTS</h1>
                        <div className="review-title">Comments & Reviews</div>
                    </div>
                    <div className="review-list">
                        <Swiper
                            navigation={true}
                            pagination={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="review-mySwiper"
                        >
                            {home?.testimonials?.review?.map?.((item, index) => {
                                return (
                                    <SwiperSlide className="review-slide" key={index}>
                                        {({ isActive }) => (
                                            <div className={`review-item ${isActive ? 'active-slide' : ''}`}>
                                                <div className="review-img">
                                                    <img
                                                        src={item?.image || reviewUser}
                                                        alt="Service"
                                                        width={'100%'}
                                                        height={'100%'}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="review-user-name">{item?.title}</div>
                                                <div
                                                    className="review-content"
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(item?.content),
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div> */}
        </section>
    );
}

function Menu({ show, hide }) {
    return (
        <>
            <Modal
                style={{ width: '100%', overflow: 'unset', background: 'none' }}
                show={show}
                onHide={hide}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{ margin: '0 auto', width: '80%', background: 'white' }} closeButton>
                    <Modal.Title>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        margin: '0 auto',
                        maxWidth: 'unset',
                        background: 'white',
                        width: '80%',
                        overflow: 'scroll',
                        height: '80vh',
                    }}
                >
                    <iframe
                        src="https://drive.google.com/file/d/1cYuShpGJQmVB90rxETGrvRFXgSU9gfrG/preview"
                        width={'100%'}
                        height={'100%'}
                    ></iframe>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Home;
