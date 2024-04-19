import React from 'react';
import ReactDOM from 'react-dom';
import { Calendar2 } from '@alifd/next';
import dayjs from 'dayjs';
import solarLunar from 'solarlunar';
import type { CalendarProps } from '@alifd/next/lib/calendar2';

const onDateChange: CalendarProps['onSelect'] = value => {
    console.log(value.format());
};

const dateCellRender: CalendarProps['dateCellRender'] = value => {
    const solar2lunarData = solarLunar.solar2lunar(value.year(), value.month(), value.date());

    return (
        <div className="custom-cell">
            {value.date()}
            <span>
                {solar2lunarData.lDay === 1 ? solar2lunarData.monthCn : solar2lunarData.dayCn}
            </span>
        </div>
    );
};

ReactDOM.render(
    <div>
        <Calendar2
            onSelect={onDateChange}
            dateCellRender={dateCellRender}
            defaultValue={dayjs().add(1, 'days')}
        />
    </div>,
    mountNode
);
