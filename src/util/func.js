import { isPromise } from './object';

/**
 * 一个空方法，返回入参本身或空对象
 */
export const noop = () => {};

/**
 * 一个空方法，返回false
 */
export const prevent = () => false;

/**
 * 将N个方法合并为一个链式调用的方法
 * @return {Function}     合并后的方法
 * 参考 https://github.com/react-component/util/
 *
 * @example
 * func.makeChain(this.handleChange, this.props.onChange);
 */
export function makeChain(...fns) {
    if (fns.length === 1) {
        return fns[0];
    }

    return function chainedFunction(...args) {
        for (let i = 0, j = fns.length; i < j; i++) {
            if (fns[i] && fns[i].apply) {
                fns[i].apply(this, args);
            }
        }
    };
}

/**
 * 批量改变方法的上下文
 * 此方法在react组件中很有用，在constructor中批量将组件上的方法执行上下文绑定到组件本身
 * 注意：用bind改变函数运行的上下文只会生效一次
 * @param  {Object} ctx 方法挂载的对象以及执行的上下文
 * @param  {Array<String>} fns 方法名列表
 *
 * @example
 * func.bindCtx(this, ['handleClick', 'handleChange']);
 */
export function bindCtx(ctx, fns, ns) {
    if (typeof fns === 'string') {
        fns = [fns];
    }

    // 方法的挂载空间，如果不传，默认与ctx相同
    ns = ns || ctx;

    fns.forEach(fnName => {
        // 这里不要添加空方法判断，由调用者保证正确性，否则出了问题无法排查
        ns[fnName] = ns[fnName].bind(ctx);
    });
}

/**
 * 用于执行回调方法后的逻辑
 * @param  {*} ret            回调方法执行结果
 * @param  {Function} success 执行结果返回非false的回调
 * @param  {Function} [failure=noop] 执行结果返回false的回调
 */
export function promiseCall(ret, success, failure = noop) {
    if (isPromise(ret)) {
        return ret
            .then(result => {
                success(result);
                return result;
            })
            .catch(e => {
                failure(e);
                // throw e;
            });
    }

    return ret !== false ? success(ret) : failure(ret);
}

export function isNone(v) {
    return v === null || v === undefined;
}

/**
 * 方法调用，如果obj对象中存在名为method的方法则调用该方法
 * @param {Object} target 目标对象
 * @param {string} method 方法名
 * @param {Array} args 函数参数列表
 * @returns {*} 函数返回值 如果不存在返回undefined
 */
export function invoke(target, method, args) {
    const func = target && method in target ? target[method] : undefined;
    return func && func(...args);
}

export function renderNode(render, defaultRender, renderProps = []) {
    const r = render !== undefined ? render : defaultRender;

    if (renderProps && !Array.isArray(renderProps)) {
        renderProps = [renderProps];
    }
    return typeof r === 'function' ? r(...renderProps) : r;
}
