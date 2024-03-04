// @ts-nocheck
'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './style.css'
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(MotionPathPlugin, Observer);

export const CircleAnimation = () => {

    useGSAP(() => {



        const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
        circlePath.id = "circlePath";
        document.querySelector("svg").prepend(circlePath);

        let items = gsap.utils.toArray(".item"),
            numItems = items.length,
            itemStep = 1 / numItems,
            wrapProgress = gsap.utils.wrap(0, 1),
            snap = gsap.utils.snap(itemStep),
            wrapTracker = gsap.utils.wrap(0, numItems),
            tracker = { item: 0 };


        console.log('items', items)

        gsap.set(items, {
            motionPath: {
                path: circlePath,
                align: circlePath,
                alignOrigin: [0.5, 0.5],
                end: (i) => gsap.utils.wrap(0, 1, i / items.length + 0.5)
            }, scale: 0.9
        });

        const tl = gsap.timeline({ paused: true, reversed: true });
        tl.to('.wrapper', {
            rotation: 360,
            transformOrigin: 'center',
            duration: 1,
            ease: 'none'
        });

        tl.to(items, {
            rotation: "-=360",
            transformOrigin: 'center',
            duration: 1,
            ease: 'none',
        }, 0);
        tl.to(tracker, {
            item: numItems,
            duration: 1,
            ease: 'none',
            modifiers: {
                item(value) {
                    return wrapTracker(numItems - Math.round(value))
                }
            }
        }, 0);

        items.forEach(function (el, i) {

            el.addEventListener("click", function () {
                var current = tracker.item,
                    activeItem = i;

                if (i === current) {
                    return;
                }

                //set active item to the item that was clicked and remove active class from all items
                document.querySelector('.item.active').classList.remove('active');
                items[activeItem].classList.add('active');

                var diff = current - i;

                if (Math.abs(diff) < numItems / 2) {
                    moveWheel(diff * itemStep);
                } else {
                    var amt = numItems - Math.abs(diff);

                    if (current > i) {
                        moveWheel(amt * -itemStep);
                    } else {
                        moveWheel(amt * itemStep);
                    }
                }
            });
        });

        document.getElementById('next').addEventListener("click", function () {
            return moveWheel(-itemStep);
        });

        document.getElementById('prev').addEventListener("click", function () {
            return moveWheel(itemStep);
        });



        function moveWheel(amount, i, index) {

            let progress = tl.progress();
            tl.progress(wrapProgress(snap(tl.progress() + amount)))
            let next = tracker.item;
            tl.progress(progress);

            document.querySelector('.item.active').classList.remove('active');
            items[next].classList.add('active');

            gsap.to(tl, {
                progress: snap(tl.progress() + amount),
                modifiers: {
                    progress: wrapProgress
                }
            });
        }

        Observer.create({
            target: window,
            type: 'wheel, touch, scroll, pointer',
            onPress: () => console.log('click me please 😒😒'),
            onUp: () => moveWheel(-itemStep),
            onDown: () => moveWheel(itemStep)
        })


    })

    return (
        <div className="h-screen bg-black relative ">
            <div className="absolute left-1/2 -top-40 ">
                <div className="wrapper" id='clickWrapper'>
                    <div className="item 1 active">1</div>
                    <div className="item 2">2</div>
                    <div className="item 3">3</div>
                    <div className="item 4">4</div>
                    <div className="item 5">5</div>
                    <div className="item 6">6</div>
                    <div className="item 7">7</div>
                    <div className="item 8">8</div>
                    <svg viewBox="0 0 300 300">
                        <circle id="holder" className="st0" cx="151" cy="151" r="400" fill="#ffffff" />
                    </svg>

                </div>
                <div className="start">&#8592; Active</div>
            </div>
            <div className="container flex gap-x-11" >
                <button id="prev" className='p-3 bg-blue-500'>Prev</button>
                <button id="next" className='p-3 bg-green-800'>Next</button>
            </div>
        </div>
    );
}

