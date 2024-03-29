import React from 'react';

type BookingProps = {
    initialTimeRange: Array<[string, string]>;
    allowDatesToBook?: Array<Date>;
    notAllowDatesToBook?: {
        startDate: Date;
        endDate: Date;
    }[];
    activeDate: Date;
    timeFrameLoading?: boolean;
    reserved: {
        startTime: string;
        endTime: string;
        isEnable: boolean;
    }[];
} & BookingEvents &
    BookingTimeFrameContent;

type BookingEvents = {
    onChangeDate: (date: Date) => void;
    onChangeTimeStart: (timeStart: string) => void;
    onChangeTimeEnd: (timeEnd: string) => void;
    onOverBook: () => void;
};

type BookingTimeFrameContent = {
    title: string;
    content: string;
};

declare const Booking: React.FunctionComponent<BookingProps>;

export default Booking;
