import React from 'react';
import ConfigProvider from '../config-provider';
import Picker from './picker';
import { DATE_PICKER_MODE } from './constant';

const { DATE, WEEK, MONTH, QUARTER, YEAR } = DATE_PICKER_MODE;
const MODE2FORMAT = {
    [DATE]: 'YYYY-MM-DD',
    [WEEK]: 'YYYY-wo',
    [MONTH]: 'YYYY-MM',
    [QUARTER]: 'YYYY-[Q]Q',
    [YEAR]: 'YYYY',
};

const transform = (props, deprecated) => {
    const { footerRender, onVisibleMonthChange, defaultVisibleMonth, ranges, ...newProps } = props;
    const mode = props.mode || DATE;

    if ('footerRender' in props) {
        deprecated('footerRender', 'extraFooterRender', 'DatePicker');
        newProps.extraFooterRender = footerRender;
    }

    if (onVisibleMonthChange) {
        deprecated('onVisibleMonthChange', 'onPanelChange', 'DatePicker');
        newProps.onPanelChange = onVisibleMonthChange;
    }

    if (defaultVisibleMonth) {
        deprecated('defaultVisibleMonth', 'onPanelChange', 'DatePicker');
        newProps.onPanelChange = onVisibleMonthChange;
    }

    if ('ranges' in props) {
        deprecated('ranges', 'preset: PT.oneOfType([PT.array, PT.object])', 'DatePicker');
        newProps.preset = ranges;
    }

    if ([WEEK, MONTH, QUARTER, YEAR].includes(mode)) {
        delete newProps.showTime;
    } else if (typeof props.showTime === 'object') {
        deprecated('showTime: object', 'showTime && timePanelProps', 'DatePicker');
        newProps.timePanelProps = props.showTime;
        newProps.showTime = true;
    }

    if (!newProps.format) {
        newProps.format = MODE2FORMAT[mode] + (newProps.showTime ? ' HH:mm:ss' : '');
    }

    return newProps;
};

const ConfigPicker = ConfigProvider.config(Picker, { componentName: 'DatePicker', transform });

const DatePicker2 = props => <ConfigPicker {...props} />;
DatePicker2.displayName = 'DatePicker2';

DatePicker2.MonthPicker = props => <ConfigPicker mode={MONTH} {...props} />;
DatePicker2.MonthPicker.displayName = 'MonthPicker2';

DatePicker2.YearPicker = props => <ConfigPicker mode={YEAR} {...props} />;
DatePicker2.YearPicker.displayName = 'YearPicker2';

DatePicker2.WeekPicker = props => <ConfigPicker mode={WEEK} {...props} />;
DatePicker2.WeekPicker.displayName = 'WeekPicker2';

DatePicker2.QuarterPicker = props => <ConfigPicker mode={QUARTER} {...props} />;
DatePicker2.QuarterPicker.displayName = 'QuarterPicker2';

DatePicker2.RangePicker = props => <ConfigPicker type="range" {...props} />;
DatePicker2.RangePicker.displayName = 'RangePicker2';

export default DatePicker2;
