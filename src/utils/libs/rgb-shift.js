import * as PIXI from "pixi.js";
import { TweenMax, TimelineMax, Power0, Power2 } from "gsap";

function rgbShift(options) {

    // options
    options = options || {};
    options.slideImages = options.hasOwnProperty("slideImages") ? options.slideImages : [];
    options.displacementImage = options.hasOwnProperty("displacementImage") ? options.displacementImage : "";
    options.fullScreen = options.hasOwnProperty("fullScreen") ? options.fullScreen : true;
    options.transitionDuration = options.hasOwnProperty("transitionDuration") ? options.transitionDuration : 0.25;
    options.transitionGhostDuration = options.hasOwnProperty("transitionGhostDuration") ? options.transitionGhostDuration : 0.25;
    options.transitionFilterIntensity = options.hasOwnProperty("transitionFilterIntensity") ? options.transitionFilterIntensity : 350;
    options.transitioSpriteIntensity = options.hasOwnProperty( "transitioSpriteIntensity") ? options.transitioSpriteIntensity : 2;
    options.mouseDispIntensity = options.hasOwnProperty("mouseDispIntensity") ? options.mouseDispIntensity : 3;
    options.nav = options.hasOwnProperty("nav") ? options.nav : true;
    options.navElement = options.hasOwnProperty("navElement") ? options.navElement : ".scene-nav";
    options.interactive = options.hasOwnProperty("interactive") ? options.interactive : true;
    options.autoPlay = options.hasOwnProperty("autoPlay") ? options.autoPlay : true;
    options.autoPlaySpeed = options.hasOwnProperty("autoPlaySpeed") ? options.autoPlaySpeed : 3000;

    let stageWidth = 1920;
    let stageHeight = 1080;

    // variables
    PIXI.utils.skipHello(); // remove pixi message in console

    const renderer = PIXI.autoDetectRenderer({
        width: stageWidth,
        height: stageHeight,
        transparent: true,
        //resolution: devicePixelRatio,
    });

    const canvas = document.querySelector(".rgbShift");
    const stage = new PIXI.Container();
    const mainContainer = new PIXI.Container();
    const redContainer = new PIXI.Container();
    const greenContainer = new PIXI.Container();
    const blueContainer = new PIXI.Container();

    const redChannelFilter = new PIXI.filters.ColorMatrixFilter();
    const greenChannelFilter = new PIXI.filters.ColorMatrixFilter();
    const blueChannelFilter = new PIXI.filters.ColorMatrixFilter();

    const texture = new PIXI.Texture.from(options.displacementImage);

    let render;
    let bgs = [],
        texture_bg = [],
        containers = [],
        channelsContainer = [],
        displacementFilters = [],
        displacementSprites = [];

    const ghostEl = {
        x: 0,
        y: 0
    };
    let posx = 0,
        posy = 0;
    let node_xp = 0,
        node_yp = 0;
    //let scrollPos, canvasPos;

    let rafId_gestureMove, rafId_transition;
    let baseTimeline;
    let currentIndex = 0;
    let isPlaying = false;
    let interval;

    // build scene
    function buildScene() {
        canvas.appendChild(renderer.view);
        stage.addChild(mainContainer);

        // enable cursorInteractive on mainContainer
        mainContainer.interactive = true;

        // Fit renderer to the screen
        if (options.fullScreen === true) {
            renderer.view.style.objectFit = "cover";
            renderer.view.style.width = "100%";
            renderer.view.style.height = "100%";
            renderer.view.style.top = "50%";
            renderer.view.style.left = "50%";
            renderer.view.style.webkitTransform = "translate( -50%, -50% ) scale(1.2)";
            renderer.view.style.transform = "translate( -50%, -50% ) scale(1.2)";
        } else {
            renderer.view.style.maxWidth = "100%";
            renderer.view.style.display = "block";
            renderer.view.style.borderRadius = "4px";
        }

        render = new PIXI.Ticker();
        render.autoStart = true;
        render.add(function(delta) {
            renderer.render(stage);
        });
    }

    // build rgb containers
    function buildRBG() {
        redChannelFilter.matrix = [
            1, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        greenChannelFilter.matrix = [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        blueChannelFilter.matrix = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];

        channelsContainer.push(
            redChannelFilter,
            greenChannelFilter,
            blueChannelFilter
        );

        redContainer.position.x = 0;
        greenContainer.position.x = 0;
        blueContainer.position.x = 0;

        containers.push(redContainer, greenContainer, blueContainer);

        // set texture for each background (used later for slide transition)
        for (let i = 0; i < options.slideImages.length; ++i) {
            texture_bg[i] = new PIXI.Texture.from(options.slideImages[i]);
        }

        // set displacement filter and displacement sprite for each container
        for (let i = 0, len = containers.length; i < len; i++) {
            mainContainer.addChild(containers[i]);

            // push sprites & filters to array
            displacementSprites.push(new PIXI.Sprite(texture));
            displacementFilters.push(
                new PIXI.filters.DisplacementFilter(displacementSprites[i])
            );

            // set first image texture background and push to array
            let bg = new PIXI.Sprite(texture_bg[0]);
            bgs.push(bg);
            bgs[i].width = renderer.view.width;
            bgs[i].height = renderer.view.height;
            bgs[i].anchor.set(0.5);
            bgs[i].x = renderer.view.width / 2;
            bgs[i].y = renderer.view.height / 2;
            bgs[i].alpha = 0;

            // add bg array + displacement sprites array to container
            containers[i].addChild(displacementSprites[i], bgs[i]);

            // addchannel container filter array + displacement filter array to container
            containers[i].filters = [
                displacementFilters[i],
                channelsContainer[i]
            ];

            // init x y value
            displacementFilters[i].scale.x = 0;
            displacementFilters[i].scale.y = 0;

            // set autofit
            displacementFilters[i].autoFit = true;
        }

        // add different anchor value to each displacementSprite
        displacementSprites[0].anchor.set(0.0);
        displacementSprites[1].anchor.set(0.5);
        displacementSprites[2].anchor.set(0.3);

        // add blend mode
        // containers[0].filters[1].blendMode = PIXI.BLEND_MODES.ADD;
        containers[1].filters[1].blendMode = PIXI.BLEND_MODES.ADD;
        containers[2].filters[1].blendMode = PIXI.BLEND_MODES.ADD;
    }

    // next slide transition
    function nextSlide(next) {
        // init ghost x value
        TweenMax.set(ghostEl, {
            x: 0,
            ease: Power0.easeOut
        });

        // init basetimeline
        baseTimeline = new TimelineMax({
            onStart: function() {
                isPlaying = true;

                // fake user gesture from left to right
                TweenMax.to(ghostEl, options.transitionGhostDuration, {
                    x: window.screen.width,
                    ease: Power0.easeOut
                });
            },

            onComplete: function() {
                // update current index
                currentIndex = next;

                isPlaying = false;

                if (options.interactive === true) {
                    // init mouse gesture
                    gestureEffect();
                }
            },

            onUpdate: function() {
                // make transition displacement effect
                node_xp += (ghostEl.x - node_xp) / 3;
                node_yp += (ghostEl.x - node_yp) / 3;

                for (let i = 0, len = containers.length; i < len; i++) {
                    displacementFilters[i].scale.x =
                        Math.atan(node_xp - displacementSprites[i].x) *
                        (baseTimeline.progress() *
                            options.transitionFilterIntensity);
                    displacementSprites[i].position.x =
                        node_yp *
                        (baseTimeline.progress() *
                            options.transitionSpriteIntensity);
                }
            }
        });

        baseTimeline
            // hide all 3 containers backgrounds
            .to(
                [bgs[0], bgs[1], bgs[2]],
                options.transitionDuration,
                {
                    alpha: 0,
                    ease: Power2.easeOut
                },
                options.transitionDuration
            )

            // add fn for container bg texture update
            .add(updateTextureBgs, options.transitionDuration);

        function updateTextureBgs() {
            for (let i = 0; i < options.slideImages.length; ++i) {
                if (i === next) {
                    for (let j = 0, len = containers.length; j < len; j++) {
                        // update texture
                        bgs[j].texture = texture_bg[i];

                        // show background with new texture
                        baseTimeline.to(
                            bgs[j],
                            options.transitionDuration,
                            {
                                alpha: 1,
                                ease: Power2.easeOut
                            },
                            options.transitionDuration
                        );
                    }
                }
            }
        }
    }

    // gesture effect
    function gestureEffect() {
        // re init animation
        cancelAnimationFrame(rafId_transition);

        // make sure basetimeline is not running
        if (baseTimeline.isActive()) {
            return;
        }

        // reinit x/y value for sprites and filters
        for (let i = 0, len = containers.length; i < len; i++) {
            displacementSprites[i].x = 0;
            displacementSprites[i].y = 0;

            displacementFilters[i].scale.x = 0;
            displacementFilters[i].scale.y = 0;
        }

        // add mouse / touch event
        mainContainer.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
        function onPointerMove(eventData) {
            // get mouse value
            posx = eventData.data.global.x;
            posy = eventData.data.global.y;
        }

        // window.addEventListener("scroll", onScroll);
        // function onScroll() {
        //     canvasPos = canvas.getBoundingClientRect();
        //     scrollPos = window.scrollY;
        //     for (let i = 0, len = containers.length; i < len; i++) {
        //         displacementFilters[i].scale.y = canvasPos.top - displacementSprites[i].y;
        //         displacementSprites[0].position.y = canvasPos.top;
        //     }
        //  }
    
        // use raf for smooth sprites / filters animation
        ticker();

        function ticker() {
            rafId_gestureMove = requestAnimationFrame(ticker);

            // make sure transition is done
            if (ghostEl.x >= window.screen.width) {
                // get new mouse positions with dumping intensity ( between [1-10] : 1 is faster)
                node_xp += (posx - node_xp) / options.mouseDispIntensity;
                node_yp += (posy - node_yp) / options.mouseDispIntensity;

                for (let i = 0, len = containers.length; i < len; i++) {
                    // update disp scale x / y values
                    displacementFilters[i].scale.x =
                        node_xp - displacementSprites[i].x;
                    displacementFilters[i].scale.y =
                        node_yp - displacementSprites[i].y;

                    // update sprite x / y values
                    displacementSprites[i].position.x = node_xp;
                    displacementSprites[i].position.y = node_yp;
                }
            } else {
                cancelAnimationFrame(rafId_gestureMove);
            }
        }
    }

    // navigation
    if (options.nav === true) {
        let nav = document.querySelectorAll(options.navElement);

        for (let i = 0; i < nav.length; i++) {
            let navItem = nav[i];

            navItem.onclick = function(event) {
                // Make sure the previous transition has ended
                if (isPlaying) {
                    return false;
                }

                if (this.getAttribute("data-nav") === "next") {
                    if (currentIndex >= 0 && currentIndex < options.slideImages.length - 1) {
                        nextSlide(currentIndex + 1);
                    } else {
                        nextSlide(0);
                    }
                    if (options.autoPlay === true) {
                        // re init autoplay
                        clearInterval(interval);
                        autoplay();
                    }
                } else {
                    if (currentIndex > 0 && currentIndex < options.slideImages.length) {
                        nextSlide(currentIndex - 1);
                    } else {
                        nextSlide(options.slideImages.length - 1);
                    }

                    if (options.autoPlay === true) {
                        // re init autoplay
                        clearInterval(interval);
                        autoplay();
                    }
                }
                return false;
            };
        }
    }

    // autoplay
    function autoplay() {
        interval = setInterval(function() {
            currentIndex = currentIndex + 1;

            if (currentIndex === options.slideImages.length) {
                currentIndex = 0;
                nextSlide(currentIndex);
            } else {
                nextSlide(currentIndex);
            }

        }, options.autoPlaySpeed); // default 3000ms
    }

    // init
    function init() {
        buildScene();
        buildRBG();

        if (options.autoPlay === true) {
            currentIndex = 0;
            nextSlide(currentIndex);
            autoplay();
        } else {
            nextSlide(0);
        }
    }
    init();
};

export { rgbShift }