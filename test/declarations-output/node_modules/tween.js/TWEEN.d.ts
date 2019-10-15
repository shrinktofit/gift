// tslint:disable:jsdoc-format
/**
 * @license
 *
    MIT License

    Copyright (c) Microsoft Corporation. All rights reserved.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE
 *
 */
// Project: https://github.com/cocos-creator/tween.js/

// tslint:disable-next-line:no-namespace
declare namespace TWEEN {
    export function getAll (): Tween[];
    export function removeAll (): void;
    export function add (tween: Tween): void;
    export function remove (tween: Tween): void;
    export function update (time?: number, preserve?: boolean): boolean;
    export function now (): number;

    export class Tween {
        constructor (object?: any, group?: Group);
        public getId (): number;
        public isPlaying (): boolean;
        public to (properties: any, duration: number): Tween;
        public start (time?: number): Tween;
        public stop (): Tween;
        public end (): Tween;
        public stopChainedTweens (): Tween;
        public group (group: Group): Tween;
        public delay (amount: number): Tween;
        public repeat (times: number): Tween;
        public repeatDelay (times: number): Tween;
        public yoyo (enable: boolean): Tween;
        public easing (easing: (k: number) => number): Tween;
        public interpolation (interpolation: (v: number[], k: number) => number): Tween;
        public chain (...tweens: Tween[]): Tween;
        public onStart (callback: (object?: any) => void): Tween;
        public onStop (callback: (object?: any) => void): Tween;
        public onUpdate (callback: (object?: any) => void): Tween;
        public onComplete (callback: (object?: any) => void): Tween;
        public update (time: number): boolean;
    }

    export class Group {
        constructor ();
        public getAll (): Tween[];
        public removeAll (): void;
        public add (tween: Tween): void;
        public remove (tween: Tween): void;
        public update (time?: number, preserve?: boolean): boolean;
    }

    export let Easing: Easing;
    export let Interpolation: Interpolation;
}

// tslint:disable-next-line:interface-name
interface Easing {
    Linear: {
        None (k: number): number;
    };
    Quadratic: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Cubic: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Quartic: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Quintic: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Sinusoidal: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Exponential: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Circular: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Elastic: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Back: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
    Bounce: {
        In (k: number): number;
        Out (k: number): number;
        InOut (k: number): number;
    };
}

// tslint:disable-next-line:interface-name
interface Interpolation {

    Utils: {
        Linear (p0: number, p1: number, t: number): number;
        Bernstein (n: number, i: number): number;
        Factorial (n: number): number;
        CatmullRom (p0: number, p1: number, p2: number, p3: number, t: number): number;
    };
    Linear (v: number[], k: number): number;
    Bezier (v: number[], k: number): number;
    CatmullRom (v: number[], k: number): number;
}

declare module 'tween.js' {
    export = TWEEN;
}
