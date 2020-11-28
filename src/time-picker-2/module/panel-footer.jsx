import React from 'react';
import Button from '../../button';
import { datejs, func } from '../../util';
import { PANEL } from '../util';

class PanelFooter extends React.PureComponent {
    static defaultProps = {
        // onPanelChange: func.noop,
        onOk: func.noop,
    };

    changePanel = () => {
        const targetPanel = {
            [PANEL.DATE]: PANEL.TIME,
            [PANEL.TIME]: PANEL.DATE,
        }[this.props.panel];
        this.props.onPanelChange(targetPanel);
    };

    createRanges = ranges => {
        if (!ranges || ranges.length === 0) return null;
        const { onOk, prefix } = this.props;

        return (
            <div className={`${prefix}time-picker2-panel-tools`}>
                {ranges.map(({ label, value = [], onChange }) => {
                    const handleClick = () => {
                        const momentValue = value.map(v => datejs(v));

                        onChange(momentValue);
                        onOk(momentValue);
                    };
                    return (
                        <Button key={label} text size="small" type="primary" onClick={handleClick}>
                            {label}
                        </Button>
                    );
                })}
            </div>
        );
    };

    render() {
        const {
            prefix,
            locale,
            panel,
            value,
            ranges, // 兼容0.x range 属性
            disabledOk,
            onPanelChange,
            onOk,
        } = this.props;
        const panelBtnLabel = {
            [PANEL.DATE]: locale.selectTime,
            [PANEL.TIME]: locale.selectDate,
        }[panel];

        const sharedBtnProps = {
            size: 'small',
            type: 'primary',
            disabled: !value,
        };
        const onClick = () => onOk();

        return (
            <div className={`${prefix}date-picker2-panel-footer`}>
                {this.createRanges(ranges)}
                {onPanelChange ? (
                    <Button {...sharedBtnProps} text onClick={this.changePanel}>
                        {panelBtnLabel}
                    </Button>
                ) : null}
                <Button {...sharedBtnProps} disabled={disabledOk || !value} onClick={onClick}>
                    {locale.ok}
                </Button>
            </div>
        );
    }
}

export default PanelFooter;
