import React from 'react';

type BookingProps = {
    initialTimeRange: Array<[string, string]>;
    activeDate: Date;
    reserved: {
        startTime: string;
        endTime: string;
        isEnable: boolean;
    }[];
} & BookingEvents;

type BookingEvents = {
    onChangeDate: (date: Date) => void;
    onChangeTimeStart: (timeStart: string) => void;
    onChangeTimeEnd: (timeEnd: string) => void;
};

declare const Booking: React.FunctionComponent<BookingProps>;

export default Booking;
