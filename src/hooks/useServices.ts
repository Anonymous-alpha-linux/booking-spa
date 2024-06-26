import { toast } from 'react-toastify';
import { BlogOfServiceDTO, Pagination, ServiceDTO, getBlogOfService, getServiceList, getSingleService } from '../api';
import { useEffect, useState } from 'react';

type Props = {
    request: Pagination & {
        flat?: number;
    };
    selectedPostId?: number;
    selectedPostName?: string;
    errorBlogHtml?: string;
};

type Return = {
    services: ServiceDTO[];
    blog: BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent'> | null;
    selectedId: number;
    service: ServiceDTO;
    bannedServices: number[] | null;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setBlog: React.Dispatch<React.SetStateAction<BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent' | null>>>;
};

const useService: (props: Props) => Return = (props) => {
    const [services, setServices] = useState<Array<ServiceDTO>>([]);
    const [blog, setBlog] = useState<BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent'> | null>(null);
    const [service, setSelectedService] = useState<ServiceDTO | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(props.selectedPostId);
    const [bannedServices, setBannedServices] = useState<number[] | null>(null);
    const errorBlog = props?.errorBlogHtml || '<h2>This Blog is not existing</h2>';

    useEffect(() => {
        getServiceList(props.request)
            .then((response) => {
                setServices(response || []);
            })
            .catch((error) => {
                toast.error(typeof error === 'string' ? error : 'Server Error', {
                    autoClose: 3000,
                });
            });
    }, []);

    useEffect(() => {
        if (selectedId) {
            getBlogOfService(selectedId)
                .then((response) => {
                    setBlog(response);
                })
                .catch((error) => {
                    setBlog(null);
                    toast.error(typeof error === 'string' ? error : 'Server Error', {
                        autoClose: 3000,
                    });
                });
            getSingleService(selectedId)
                .then((response) => {
                    setSelectedService(response);
                })
                .catch((error) => {
                    toast.error(typeof error === 'string' ? error : 'Server Error', {
                        autoClose: 3000,
                    });
                });
        }
    }, [services, selectedId]);

    useEffect(() => {
        if (!!services?.length) {
            let newSelectedId = services?.find?.((s) => s.serviceName === props.selectedPostName)?.serviceId;

            setSelectedId(newSelectedId);
        }
    }, [services, props.selectedPostName]);

    return {
        services,
        blog: blog || {
            ...blog,
            blogContent: errorBlog,
        },
        service,
        selectedId,
        bannedServices,
        setSelectedId,
        setBlog,
    };
};

export default useService;
