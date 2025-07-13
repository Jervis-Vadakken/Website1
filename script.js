let timeout;

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// First page load animation
function firstPageAnim() {
  const tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })
    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

// Mini circle follow effect with squish/stretch
function circleChaptaKaro() {
  let xScale = 1;
  let yScale = 1;
  let xPrev = 0;
  let yPrev = 0;

  window.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);

    const dx = Math.abs(e.clientX - xPrev);
    const dy = Math.abs(e.clientY - yPrev);

    xScale = gsap.utils.clamp(0.8, 1.2, dx / 10);
    yScale = gsap.utils.clamp(0.8, 1.2, dy / 10);

    xPrev = e.clientX;
    yPrev = e.clientY;

    setCirclePosition(e.clientX, e.clientY, xScale, yScale);

    timeout = setTimeout(() => {
      setCirclePosition(e.clientX, e.clientY, 1, 1); // reset scale
    }, 100);
  });
}

// Update circle transform
function setCirclePosition(x, y, scaleX = 1, scaleY = 1) {
  const circle = document.querySelector("#minicircle");
  circle.style.transform = `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
}

// Follow image on mouse hover
function interactiveImageEffect() {
  document.querySelectorAll(".elem").forEach((elem) => {
    let lastX = 0;
    let rotation = 0;

    elem.addEventListener("mouseleave", () => {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    elem.addEventListener("mousemove", (e) => {
      const image = elem.querySelector("img");
      const bounds = elem.getBoundingClientRect();

      const diff = e.clientY - bounds.top;
      const diffRot = e.clientX - lastX;
      lastX = e.clientX;

      rotation = gsap.utils.clamp(-20, 20, diffRot * 0.5);

      gsap.to(image, {
        opacity: 1,
        ease: "power3.out",
        top: diff,
        left: e.clientX,
        rotate: rotation,
        duration: 0.3,
      });
    });
  });
}

// Run all effects
circleChaptaKaro();
interactiveImageEffect();
firstPageAnim(); // Uncomment when needed
