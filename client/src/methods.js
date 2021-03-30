import { data } from '@/data'
import { update } from '@/websocket'

export const degPerPart = 360 / 54;
export const wheelColors = {
    gold: '#ffc870',
    blue: '#45b5da',
    red:  '#c8354e',
    gray: '#666'
}
const blueParts = [6, 8, 16, 18, 26, 28, 36, 38, 46, 48];

export function getWheelColorByDeg(deg) {
    while (deg > 360)
        deg -= 360;

    var selectedPart = Math.floor(deg / degPerPart) + 1;
    /* 54 */
    /* 27 - gold */

    return getWheelColor(selectedPart);
}

export function getWheelColor(id) {
    if (id == 27)
        return wheelColors.gold;
    else if (blueParts.indexOf(id) !== -1)
        return wheelColors.blue;
    else if (id % 2 === 0)
        return wheelColors.red;
    else
        return wheelColors.gray;
}

export function spinWheel(windegree, winnumber) {
    data.betPopup.isVisible = false;
    data.spinningState = 1;
    easyAnimate((val) => data.wheelRoteteDegree = val, data.wheelRoteteDegree, data.wheelRoteteDegree + windegree, 10000, easingFunctions.easeInOutQuart, (val) => {
        data.history.unshift({
            id: data.history.length == 0 ? 0 : data.history[0].id + 1,
            winnumber: winnumber
        });
        if (data.history.length > 100)
            data.history = data.history.filter((_, i) => i < 100);
        data.spinningState = 2;
        if (data.account != null)
            update();
        setTimeout(() => {
            data.spinningState = 0;
            resetBets();
        }, 3000);
    });
}

export function resetBets() {
    for (var bid = 0; bid < data.bets.length; bid++)
        data.bets[bid].users = [];
}

export function showToast(content) {
    var id = data.toasts.length + 1;
    data.toasts.push({
        id,
        content
    });
    setTimeout(() => {
        data.toasts = data.toasts.filter((val) => val.id != id);
    }, 5000);
}

export async function postData(url, postData, onerror, onsuccess) {
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onreadystatechange = function(e){
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         console.log(xhr.responseText);
    //     }
    // }
    // xhr.send(JSON.stringify(data));
    if (data.debug)
        if (url[0] == '/')
            url = 'http://localhost:48670' + url;

    postData = JSON.stringify(postData);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: postData
    });
    const responseData = await response.json();

    if (responseData.error)
        onerror(responseData);
    else
        onsuccess(responseData);
}

export const easingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity 
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
}

export function easyAnimate(callback, start_value, end_value, time, func, endanimation = null, dx = 0.001) {
    var length = end_value - start_value;
    var dxlen = 0;
    var dxtmp = dx;
    while (dxtmp < 1) {
        dxlen++;
        dxtmp *= 10;
    }
    var msfortick = time / Math.pow(10, dxlen);

    for (var t = 0.0; t.toFixed(dxlen) <= 1.0; t += dx) {
        setTimeout((t) => {
            var val = func(t) * length + start_value;
            callback(val);

            if (t >= 1)
                endanimation(val);
        }, msfortick * Math.pow(10, dxlen) * t, t);
    }
}

export function getUnixNow() {
    return (+ new Date());
}