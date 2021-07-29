const crossArr = gsap.utils.toArray('.grid-cross');
CustomEase.create("custom1", "M0,0 C0.126,0.382 0.383,1.201 0.594,1.254 0.804,1.306 0.818,1.001 1,1 ");
CustomEase.create("custom2", "M0,0 C0.126,0.382 0.403,1.951 0.614,2.004 0.824,2.056 0.818,1.001 1,1 ")
console.log(crossArr)

// ANIMATIONS FOR MAIN WRAPPER AND GALLERY
function wrapperAnim() {
let sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".gallery",
    pin: true,
    scrub: .3,
    snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the gallery is so it feels more natural.
    end: () => "+=" + document.querySelector(".gallery").offsetWidth
  }
});
gsap.to('.wrapper', {
    ease:'none',
    scrollTrigger: {
        trigger: '.wrapper',
        pin:true,
        scrub:.3,
        start: 'top top',
        end: () => "+=" + document.querySelector(".gallery").offsetWidth
    }
})
gsap.fromTo('.spinner', {
    ease:'none',
}, {
    scrollTrigger: {
        trigger:'.spinner',
        start:'top top',
        scrub:1,
        end: () => "+=" + document.querySelector(".gallery").offsetWidth,
    },
    x:0,
    rotation:360,
})
}

// FUNCTION FOR ONLOAD ANIMATION
function heroAnim() {
    const tl = gsap.timeline();
    tl.fromTo('.grid-cross', {
        y: -100,
        opacity: 0,
        scale: .1,
    }, {
        duration: .6,
        scale: 1,
        y: 0,
        rotation: 90,
        opacity: 1,
        ease: 'none',
        stagger: {
            delay: 2,
            duration: .2,
            grid: 'auto',
            from: 'edges',
            amount: 2
        }
    })
        .to('.hero-msg', {
            startAt: {
                y: 100,
            },
            y: 0,
            ease: 'custom1',
            duration: 2,
            opacity: 1,
            text: {
                value: '100DAYSOFCODE'
            }
        })
        .to('.author', {
            startAt: {
                y:100,
                opacity:0,
            },
            duration:1,
            ease:'custom1',
            y:0,
            opacity:1,
        })
        .fromTo('.callToAct', {
            y:100,
            opacity:0,
        },{
            duration:1,
            ease:'custom1',
            y:0,
            opacity:1,
        })
        .fromTo('.scrollIcon', {
            ease:'ease-in-out',
            startAt: {
                opacity:.1
            },
            opacity:.5,
        }, {
            duration:2,
            opacity:.1,
            repeat:-1,
        })
}

// HOVER ANIMATIONS
function crossHover(e) {
    if (e.type === 'mouseenter') {
        let crossCol;
        switch ($(this)[0].style.color) {
            case '':
                crossCol = 'rgb(129, 0, 0)'
                break;
            case 'rgb(129, 0, 0)':
                crossCol = 'rgb(255, 91, 15)'
                break;
            case 'rgb(255, 91, 15)':
                crossCol = 'rgb(255, 240, 31)'
                break;
            case 'rgb(255, 240, 31)':
                crossCol = 'rgb(140, 248, 39)'
                break;
            case 'rgb(140, 248, 39)':
                crossCol = 'rgb(0, 47, 255)'
                break;
        }
        gsap.to($(this), {
            duration: .3,
            color: crossCol,
            rotation: 90,
            ease: 'none',
            scale:.5,
            stagger: {
                grid: 'auto',
                from: 'center',
                amount: 1
            }
        })
    } else if (e.type === 'mouseleave') {
        gsap.to($(this), {
            duration: .9,
            rotation: -90,
            ease: 'custom2',
            scale:1,
        })
    }
}

// CROSS CLICK ANIMATION
function crossReset() {
    if ($(this)[0].style.color) {
        const index = $(this)[0].id;
        gsap.to('.grid-cross', {

            color: '',
            ease: 'ease',
            rotation: 90,
            stagger: {
                delay: 0,
                duration: 2,
                grid: [4, 11],
                from: index,
                amount: 2
            }
        })
    }
}

// INITIALIZE CONTAINER FUNCTIONALITY
function initContainer() {
    crossArr.forEach(cross => {
        cross.addEventListener('mouseenter', crossHover);
        cross.addEventListener('mouseleave', crossHover);
        cross.addEventListener('click', crossReset);
    })
    heroAnim();
    wrapperAnim();
}

initContainer();