import React from 'react';

// Component
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Home, About, BookingPage, Promotion } from '../..';

import { FieldArray, Formik, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

import { Link, useSearchParams, createSearchParams } from 'react-router-dom';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css/navigation';

//Icons
import { FaTimes } from 'react-icons/fa';
import { BiAddToQueue } from 'react-icons/bi';

// Custom style
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList, postSetting } from '../../../store/actions';
import { CustomReactQuill, UploadModal } from '../../../components';
import { useContact } from '../../../hooks/useContact';

function AdminWeb() {
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    let currentContent = params?.get?.('content');

    React.useEffect(() => {
        dispatch(getSettingList(params.get('content')));
    }, [dispatch, currentContent]);

    return (
        <section>
            <Row className="align-items-center">
                <Col xs="auto">
                    <h3>Web Content</h3>
                    <p>You can edit your own content</p>
                </Col>
                <Col xs="auto">
                    <div className="mb-3">
                        <ListWeb></ListWeb>
                    </div>
                </Col>
            </Row>

            {params.get('content') ? (
                <PageDemo page={params.get('content')}></PageDemo>
            ) : (
                <ContactInformation></ContactInformation>
            )}
        </section>
    );
}

function ContactInformation() {
    const dispatch = useDispatch();
    const contact = useContact();

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
        initialValues: {
            phone: contact?.phone || '61432842392',
            email: contact?.email || 'abc@gmail.com',
            facebook: contact?.facebook || 'facebook.com@littlespa',
            instagram: contact?.instagram || 'sdkodfosdjf',
            whatsapp: contact?.whatsapp || '2543534543',
            latitude: contact?.latitude || '',
            longitude: contact?.longitude || '',
            address: contact?.address || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(postSetting(values, 'contact'));
        },
    });

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Contact Information</h3>
            <p>You can edit your own contact</p>
            <ul>
                <li>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.phone && !!errors?.phone}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors?.email}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                            name="facebook"
                            value={values.facebook}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.facebook && !!errors?.facebook}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.facebook}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control
                            name="instagram"
                            value={values.instagram}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.instagram && !!errors?.instagram}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.instagram}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Whatsapp</Form.Label>
                        <Form.Control
                            name="whatsapp"
                            value={values.whatsapp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.whatsapp && !!errors?.whatsapp}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.whatsapp}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                            name="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.latitude && !!errors?.latitude}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.latitude}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                            name="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.longitude && !!errors?.longitude}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.longitude}</Form.Control.Feedback>
                    </Form.Group>
                </li>
                <li>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.address && !!errors?.address}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors?.address}</Form.Control.Feedback>
                    </Form.Group>
                </li>
            </ul>
            <Button type="submit">Update Dial</Button>
        </Form>
    );
}

function PageDemo({ page }) {
    const [_, setSections] = React.useState(null);
    const [editTool, setEditTool] = React.useState({
        sectionName: '',
        page,
        show: false,
    });

    React.useEffect(() => {
        const elements = document.querySelectorAll('[id*="st-"]');
        setSections(elements);

        document.querySelectorAll('[id*="st-"]').forEach((section) => {
            if (!section.classList.contains('admin-control')) {
            }
            section.classList.add('admin-control');

            section.addEventListener('click', () => {
                let sectionName = section.id.replace('st-', '');
                setEditTool({
                    sectionName,
                    page,
                    show: true,
                });
            });
        });

        return () => {};
    }, [page]);

    const Render = React.useCallback(() => {
        switch (page) {
            case 'home':
                return <Home></Home>;

            case 'about':
                return <About />;

            case 'navbar':
                return;

            case 'footer':
                return;

            case 'booking':
                return <BookingPage></BookingPage>;

            default:
                return <ContactInformation></ContactInformation>;
        }
    }, [page]);

    return (
        <>
            <EditTool
                show={editTool?.show}
                onHide={() => setEditTool((e) => (e.show = false))}
                sectionName={editTool.sectionName}
                page={editTool.page}
            ></EditTool>

            <div style={{ overflowX: 'scroll' }}>
                <Render></Render>
            </div>
        </>
    );
}

function ListWeb() {
    const linkStyle = {
        color: 'initial',
        textDecoration: 'none',
    };
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant="outline" className="btn-primary-outline">
                Select page to edit
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'home',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        Homepage
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'about',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        About us
                    </Link>
                </Dropdown.Item>

                {/* <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'navbar',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        Navbar
                    </Link>
                </Dropdown.Item> */}
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'footer',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        Footer
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link
                        to={{
                            search: createSearchParams({
                                content: 'contact',
                            }).toString(),
                        }}
                        style={linkStyle}
                    >
                        Contact
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function EditTool({ sectionName, page, show, onHide }) {
    const dispatch = useDispatch();

    const { content } = useSelector((state) => ({
        content: state.Setting?.setting?.content?.[page],
    }));
    const validation = useFormik({
        initialValues: {
            title: content?.[sectionName]?.title,
            subtitle: content?.[sectionName]?.subtitle,
            content: content?.[sectionName]?.content,
            images: content?.[sectionName]?.images || [],
            childImage: content?.[sectionName]?.childImage || [],
            child: content?.[sectionName]?.child || [],
        },
        onSubmit: (values, formikHelper) => {
            formikHelper.setSubmitting(false);
            dispatch(
                postSetting(
                    {
                        ...content,
                        [sectionName]: { ...content?.[sectionName], ...values },
                    },
                    page,
                ),
            );
            onHide();
        },
        enableReinitialize: true,
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = validation;

    // Handle Images
    const [uploadModal, setUploadModal] = React.useState(false);
    const [uploadModalChild, setUploadModalChild] = React.useState(false);
    const [uploadModalChildImage, setUploadModalChildImage] = React.useState(false);

    return (
        <Modal
            style={{ width: '100%', overflow: 'unset', background: 'none' }}
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton style={{ margin: '0 auto', width: '80%', background: 'white' }}>
                <Modal.Title id="contained-modal-title-vcenter">Edit Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    margin: '0 auto',
                    maxWidth: 'unset',
                    background: 'white',
                    width: '80%',
                    overflow: 'scroll',
                    maxHeight: '75vh',
                }}
            >
                <FormikProvider value={validation}>
                    <Form onSubmit={handleSubmit} className="edit-form-content">
                        <h4>
                            #{sectionName} - {page}
                        </h4>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name={`title`}
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.title && !!errors?.title}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subtitle</Form.Label>
                            <Form.Control
                                name={`subtitle`}
                                value={values.subtitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched?.subtitle && !!errors?.subtitle}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{errors?.subtitle}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <CustomReactQuill
                                name="content"
                                value={values?.content}
                                onChange={(htmlText) => {
                                    setFieldValue('content', htmlText);
                                }}
                            ></CustomReactQuill>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="py-4">
                                <div className="admin-image-form-title">Image</div>
                                <Button variant="success" onClick={() => setUploadModal(true)}>
                                    Upload your image
                                </Button>
                                <UploadModal
                                    show={uploadModal}
                                    onSave={(hasShown) => {}}
                                    onSelected={(selected) => {}}
                                    selected={''}
                                    onHide={() => {
                                        setUploadModal(false);
                                    }}
                                    onCopyLink={(link) => {
                                        setFieldValue('images', [...values.images, link]);
                                        setUploadModal(false);
                                    }}
                                ></UploadModal>
                                <div className="admin-images-form">
                                    {values?.images?.map((item, index) => {
                                        return (
                                            <div style={{ textAlign: 'right' }} key={index}>
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'images',
                                                            values.images.filter((e) => e !== values.images[index]),
                                                        );
                                                    }}
                                                ></FaTimes>
                                                <img src={item} width={'100%'} />;
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="admin-image-form-title">Child Image</div>
                                <Button variant="success" onClick={() => setUploadModalChild(true)}>
                                    Upload your child images
                                </Button>
                                <UploadModal
                                    show={uploadModalChild}
                                    onSave={(hasShown) => {}}
                                    onSelected={(selected) => {}}
                                    selected={''}
                                    onHide={() => {
                                        setUploadModalChild(false);
                                    }}
                                    onCopyLink={(link) => {
                                        setFieldValue('childImage', [...values.childImage, link]);
                                        setUploadModalChild(false);
                                    }}
                                ></UploadModal>
                                <div className="admin-images-form">
                                    {values?.childImage?.map((item, index) => {
                                        return (
                                            <div style={{ textAlign: 'right' }} key={index}>
                                                <FaTimes
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setFieldValue(
                                                            'childImage',
                                                            values.childImage.filter(
                                                                (e) => e !== values.childImage[index],
                                                            ),
                                                        );
                                                    }}
                                                ></FaTimes>
                                                <img src={item} width={'100%'} />;
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Form.Group>
                        <FieldArray name="child">
                            {(arrayHelpers) => (
                                <Form.Group>
                                    <Form.Label className="admin-image-form-title">Child Content</Form.Label>

                                    <BiAddToQueue
                                        style={{ margin: '0 10px', cursor: 'pointer', fontSize: '20px' }}
                                        onClick={() => {
                                            arrayHelpers.push({
                                                title: '',
                                                subtitle: '',
                                                content: '',
                                                image: '',
                                            });
                                        }}
                                    ></BiAddToQueue>
                                    <Swiper
                                        pagination={{
                                            type: 'fraction',
                                        }}
                                        cssMode={true}
                                        allowSlideNext={true}
                                        allowSlidePrev={true}
                                        mousewheel={true}
                                        navigation={true}
                                        keyboard={true}
                                        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
                                        className="mySwiper"
                                        name="child"
                                    >
                                        {values?.child?.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index} className="child-content-swiper">
                                                    <Form.Group>
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control
                                                            name={`child.${index}.title`}
                                                            value={item?.title}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={
                                                                touched?.child?.[index]?.title &&
                                                                !!errors?.child?.[index]?.title
                                                            }
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.title}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Subtitle</Form.Label>
                                                        <Form.Control
                                                            name={`child.${index}.subtitle`}
                                                            value={item?.subtitle}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={
                                                                touched?.child?.[index]?.subtitle &&
                                                                !!errors?.child?.[index]?.subtitle
                                                            }
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.subtitle}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Content</Form.Label>
                                                        <Form.Control
                                                            name={`child.${index}.content`}
                                                            as="textarea"
                                                            value={item?.content}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={
                                                                touched?.child?.[index]?.content &&
                                                                !!errors?.child?.[index]?.content
                                                            }
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors?.child?.[index]?.content}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <div className="py-4">
                                                        <div className="">Image</div>
                                                        <Button
                                                            variant="success"
                                                            onClick={() => setUploadModalChildImage(true)}
                                                        >
                                                            Upload your image
                                                        </Button>
                                                        <UploadModal
                                                            show={uploadModalChildImage}
                                                            onSave={(hasShown) => {}}
                                                            onSelected={(selected) => {}}
                                                            selected={''}
                                                            onHide={() => {
                                                                setUploadModalChildImage(false);
                                                            }}
                                                            onCopyLink={(link) => {
                                                                setFieldValue(`child[${index}].image`, link);
                                                                setUploadModalChildImage(false);
                                                            }}
                                                        ></UploadModal>
                                                        <div className="admin-images-form">
                                                            <div style={{ textAlign: 'right' }}>
                                                                {item.image ? (
                                                                    <FaTimes
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() => {
                                                                            setFieldValue(`child[${index}].image`, '');
                                                                        }}
                                                                    ></FaTimes>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {values?.child?.[index]?.image ? (
                                                                    <img
                                                                        src={values?.child?.[index]?.image}
                                                                        width={'100%'}
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Form.Group>
                            )}
                        </FieldArray>
                        <Button type="submit" variant="primary" className="my-4">
                            Submit
                        </Button>
                    </Form>
                </FormikProvider>
            </Modal.Body>
        </Modal>
    );
}

function EditLayout({ layout }) {
    const dispatch = useDispatch();

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: layout === 'navbar' ? {} : layout === 'footer' ? {} : {},
        onSubmit: (values, helpers) => {
            helpers.setSubmitting(false);
            dispatch(postSetting(values, 'layout'));
        },
    });

    switch (layout) {
        case 'navbar':
            return <Form onSubmit={handleSubmit}></Form>;

        case 'footer':
            return <></>;

        default:
            return;
    }
}

export default AdminWeb;
