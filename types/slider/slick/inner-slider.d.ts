import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventHandlersMixin from './mixins/event-handlers';
import HelpersMixin from './mixins/helpers';
import type { InnerSliderProps, InnerSliderState } from '../types';
export type ThisType = InstanceType<typeof InnerSlider> &
    typeof HelpersMixin &
    typeof EventHandlersMixin;
declare class InnerSlider extends Component<InnerSliderProps, InnerSliderState> {
    static propTypes: {
        prefix: PropTypes.Requireable<string>;
        animation: PropTypes.Requireable<NonNullable<string | boolean | null | undefined>>;
        arrows: PropTypes.Requireable<boolean>;
        arrowSize: PropTypes.Requireable<string>;
        arrowPosition: PropTypes.Requireable<string>;
        arrowDirection: PropTypes.Requireable<string>;
        centerPadding: PropTypes.Requireable<any>;
        children: PropTypes.Requireable<any>;
        centerMode: PropTypes.Requireable<boolean>;
        dots: PropTypes.Requireable<boolean>;
        dotsDirection: PropTypes.Requireable<string>;
        dotsClass: PropTypes.Requireable<string>;
        focusOnSelect: PropTypes.Requireable<boolean>;
        cssEase: PropTypes.Requireable<string>;
        speed: PropTypes.Requireable<number>;
        infinite: PropTypes.Requireable<boolean>;
        defaultActiveIndex: PropTypes.Requireable<number>;
        rtl: PropTypes.Requireable<boolean>;
        slidesToShow: PropTypes.Requireable<number>;
        lazyLoad: PropTypes.Requireable<boolean>;
        activeIndex: PropTypes.Requireable<number>;
        slidesToScroll: PropTypes.Requireable<number>;
        variableWidth: PropTypes.Requireable<boolean>;
        vertical: PropTypes.Requireable<boolean>;
        verticalSwiping: PropTypes.Requireable<boolean>;
        prevArrow: PropTypes.Requireable<PropTypes.ReactElementLike>;
        nextArrow: PropTypes.Requireable<PropTypes.ReactElementLike>;
        dotsRender: PropTypes.Requireable<(...args: any[]) => any>;
        triggerType: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        prefix: string;
        arrowDirection: string;
        triggerType: string;
    };
    private hasMounted;
    private animationEndCallback;
    private pArrow?;
    private nArrow?;
    private list?;
    private track?;
    constructor(props: InnerSliderProps);
    static getDerivedStateFromProps(
        nextProps: InnerSliderProps,
        prevState: InnerSliderState
    ): InnerSliderState;
    componentDidMount(this: ThisType): void;
    componentDidUpdate(
        this: ThisType,
        prevProps: InnerSliderProps,
        prevState: InnerSliderState
    ): void;
    componentWillUnmount(this: ThisType): void;
    onWindowResized(this: ThisType): void;
    slickGoTo(this: ThisType, slide: number): void;
    onEnterArrow(this: ThisType, msg: string): void;
    onLeaveArrow(this: ThisType): void;
    _instanceRefHandler(attr: 'pArrow' | 'nArrow' | 'list' | 'track', ref: HTMLDivElement): void;
    render(this: ThisType): React.JSX.Element;
}
declare const _default: typeof InnerSlider;
export default _default;
