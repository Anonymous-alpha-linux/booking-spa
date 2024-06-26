import { AxiosRequestConfig } from 'axios';
import { BlogOrderBy, BlogSearchBy, BlogStatus } from './enum';

// *** Type Helper
interface APIResponse<Type> {
    result: Type;
    message: string;
    isSuccess: boolean;
    errors: string[];
}

interface APIListResponse<Type> {
    list: Type[];
    page: number;
    take: number;
    total: number;
}

interface Pagination {
    take: number;
    skip: number;
}

// 1. Blog
type SingleBlog = {
    blogId: number;
    articleTitle: string;
    articleContent: object;
    createdDate: Date;
    categories: number[];
    status: BlogStatus;
    presentedImage: string;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
};

interface CreateBlog {
    articleTitle: string;
    articleContent: object;
    createdDate: Date;
    categories: number[];
    status: BlogStatus;
    presentedImage: string;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
}

interface UpdateBlog {
    articleTitle: string;
    articleContent: object;
    ceatedDate: Date;
    categories: number[];
    presentedImage: string;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
}

interface BlogRequest {
    orderBy: BlogOrderBy;
    searchBy: BlogSearchBy;
    keyword: string;
    skip: number;
    take: number;
}

// 2. Comment
type CommentResponse = {};
type PostComment = {};

// 3. Upload

// *** Axios Response Types
// 1. Blog
/**
 * Lấy danh sách blog.
 * @param request Phân trang.
 * @returns Phản hồi bất đồng bộ của kiểu dữ liệu danh sách blog.
 */
export declare const getBlogList: (
    request: BlogRequest,
    config?: AxiosRequestConfig,
) => Promise<APIListResponse<SingleBlog> | APIResponse<APIListResponse<SingleBlog>> | string>;
export declare const getSingleBlog: (
    id: number,
    config?: AxiosRequestConfig,
) => Promise<APIListResponse<SingleBlog> | SingleBlog | string>;
export declare const postBlog: (body: CreateBlog, config?: AxiosRequestConfig) => Promise<APIResponse<SingleBlog>>;
export declare const putBlog: (
    id: number,
    body: UpdateBlog,
    config?: AxiosRequestConfig,
) => Promise<APIResponse<SingleBlog>>;
export const deleteBlog: (id: number) => Promise<APIResponse<number>>;
// 2. Comment
export declare const getCommentList: (pagination) => Promise<APIResponse<CommentResponse>>;
export declare const postComment: (
    body: PostComment,
    config: AxiosRequestConfig,
) => Promise<APIResponse<CommentResponse>>;

// 3. Upload
type UploadDTO = {
    assetId: string;
    assetLink: string;
    createdAt: Date;
    updatedAt: Date;
};
type CreateUploadDTO = {
    file: File;
};
type UpdateUploadDTO = {
    file: File;
};

export declare const getAssets: (
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<Array<UploadDTO>>>;

export declare const getAsset: (
    id: string,
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<UploadDTO>>;

export declare const postAsset: (body: CreateUploadDTO, config: AxiosRequestConfig) => Promise<APIResponse<UploadDTO>>;

export declare const putAsset: (
    id: string,
    body: UpdateUploadDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<UploadDTO>>;

export declare const deleteAsset: (id: number, config: AxiosRequestConfig) => Promise<APIResponse<UploadDTO>>;

// 4. Service
type ServiceDTO = {
    serviceId: number;
    serviceName: string;
    description: string;
    duration: string;
    createdDate: Date;
    parentId: number;
    price: number;
    duration: string;
    description: string;
    promotion: any;
    childs: Array<ServiceDTO>;
};
type BlogOfServiceDTO = {
    serviceId: number;
    blogContent: string;
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
    postedDate: Date;
};
type CreateServiceDTO = {
    serviceName: string;
    description: string;
    duration: string;
    parentId: number;
    createdDate: Date;
    price: number;
    promotion?: {
        promotionName: string;
        startDate: Date;
        endDate: Date;
        discountRates: number;
        isDeleted: boolean;
    };
};
type UpdateServiceDTO = {
    serviceName: string;
    description: string;
    duration: string;
    parentId: number;
    price: number;

    promotion?: {
        promotionName: string;
        startDate: Date;
        endDate: Date;
        discountRates: number;
        isDeleted: boolean;
    };
};
type PostBlogService = {
    blogContent: {
        value: string;
    };
    metaKeywords: string;
    metaTitle: string;
    metaDescription: string;
    postedDate: Date;
};
export declare const getServiceList: (request: Pagination) => Promise<Array<ServiceDTO>>;
export declare const getSingleService: (id: number, config?: AxiosRequestConfig) => Promise<ServiceDTO>;
export declare const getBlogOfService: (id: number, config?: AxiosRequestConfig) => Promise<BlogOfServiceDTO>;
export declare const postService: (body: CreateServiceDTO) => Promise<APIResponse<ServiceDTO>>;
export declare const putBlogOfService: (
    id: number,
    body: PostBlogService,
    config?: AxiosRequestConfig,
) => Promise<BlogOfServiceDTO>;
export declare const putService: (
    id: number,
    body: UpdateServiceDTO,
    config?: AxiosRequestConfig,
) => Promise<APIResponse<ServiceDTO>>;

// 5. Testimonial
type TestimonialDTO = {
    testimonialId: number;
};
type CreateTestimonialDTO = {};
type UpdateTestimonialDTO = {};

export declare const getTestimonials: (
    request: Pagination,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const getTestimonial: (
    id: number,
    request: any,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const postTestimonial: (
    body: CreateTestimonialDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const putTestimonial: (
    id: number,
    body: UpdateTestimonialDTO,
    config: AxiosRequestConfig,
) => Promise<APIResponse<TestimonialDTO>>;

export const deleteTestimonial: (id: number) => Promise<APIResponse<number>>;

// 6. Customer
type CustomerDTO = {
    customerId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    howtoknow: [];
    isDeleted: boolean;
};
type Howtoknow = 'Facebook' | 'Instagram' | 'Google' | 'Letter' | 'Walkedpast' | 'Friend';
type CreateCustomerDTO = {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    howtoknow: Howtoknow[];
};
type SearchCustomerDTO = {
    email: string;
    phone: string;
    id: number;
};
export declare const postCustomer: (body: CreateCustomerDTO) => Promise<APIResponse<CustomerDTO>>;

export declare const searchCustomer: (request: SearchCustomerDTO) => Promise<APIResponse<CustomerDTO>>;

// 7. Booking
type BookingDTO = {
    bookingId: number;
    createdDate: Date;
    checkinDate: Date;
    checkoutDate: Date;
    isCancelled: boolean;
    couponId: number;
    serviceId: number;
    slot: {
        slotId: number;
        start_Hour: string;
        end_Hour: string;
    };
    customers: CustomerDTO[];
    categories: [];
};

type UpdateBookingDTO = {
    checkinDate: Date;
    checkoutDate: Date;
    isCancelled: boolean;
    serviceId: number;
    slot: {
        slotId: number;
        start_Hour: string;
        end_Hour: string;
    };
};

type CreateBookingDTO = {
    createdDate: Date;
    isCancelled: boolean;
    serviceId: number;
    serviceName: string;
    checkinDate: string;
    slot: {
        start_Hour: string;
        end_Hour: string;
    };
};

type BookingCustomerDTO = {
    bookingId: number;
    customerId: number;
};

type SearchBookingDTO = {
    orderBy: 'CreatedDate' | 'CheckinDate' | 'CheckoutDate' | 'IsCancelled' | 'None';
    searchBy: 'None' | 'Date' | 'Month';
    keyword: string;
    take: number;
    skip: number;
};
export declare const assignBooking: (
    customer: CreateCustomerDTO,
    booking: CreateBookingDTO,
) => Promise<APIResponse<BookingCustomerDTO>>;

export declare const getBookingList: (request: SearchBookingDTO) => Promise<APIResponse<BookingDTO[]>>;

export declare const putBooking: (
    id: number,
    body: UpdateBookingDTO,
    config?: AxiosRequestConfig,
) => Promise<BookingDTO>;

// 8. Setting
type SettingType = 'home' | 'about' | 'contact' | 'booking' | 'testimonial' | 'layout';
export declare const getSetting: (
    request: {
        type: SettingType;
    },
    config: AxiosRequestConfig,
) => Promise<APIResponse<object>>;

// 8. Setting
export declare const postSetting: (
    body: {
        body: string;
        page: SettingType;
    },
    config: AxiosRequestConfig,
) => Promise<APIResponse<object>>;

export declare const putSetting: (
    request: {
        type: SettingType;
    },
    body: object,
    config: AxiosRequestConfig,
) => Promise<APIResponse<object>>;

// Blog Category
type CategoryDTO = {
    categoryId: number;
    categoryName: string;
};
type CreateCategoryDTO = {
    categoryName: string;
};
type SearchCategoryDTO = {
    take: number;
    skip: number;
};
export declare const postCategory: (body: CreateCategoryDTO) => Promise<APIResponse<CategoryDTO>>;
export declare const getCategoryList: (request: SearchCategoryDTO) => Promise<APIResponse<CategoryDTO>>;

// 10. Auth
type StaffDto = {
    age: number;
    experience: number;
    field: string;
    avatar: string;
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    role?: string;
};
export declare const getStaffList: (query?: Pagination) => Promise<APIListResponse<StaffDto>>;
// export declare const registerNewStaff: () => Promise<API>;

// 11. Staff
interface WorkingHourDTO {}
export declare const addWorkingHour: (body, config) => Promise<APIResponse<number>>;

export const getWorkingHourList: (query, config) => Promise<APIListResponse<WorkingHourDTO>>;
export const assignStaffToService: (body, config) => Promise<APIResponse<string>>;
