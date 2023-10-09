"use client"

import { useRef, useEffect } from "react";
import gsap, { Power2 } from "gsap";
import Icon from "../../public/icons/icons";

export default function Loading() {
  const fullLogoRef = useRef();
  const shortLogoRef = useRef();
  const tl = gsap.timeline({ yoyo: true, repeat: -1 });

  function startAnimation() {
    const icon = shortLogoRef.current.querySelector('svg');
    const fullLogo = fullLogoRef.current.querySelectorAll('path');
    tl.set(fullLogo, { opacity: 0 });
    tl.fromTo(icon, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    tl.to(icon, { x: -150, duration: 2, ease: Power2.easeInOut });
    tl.fromTo(fullLogo, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.4 }, '-=0.7');
    tl.to(icon, { opacity: 0, duration: 0.4 }, "<");
  }

  useEffect(() => {
    startAnimation();
  }, [])

  return (
    <div className="bg-slate-300 h-full flex flex-col items-center justify-center relative">
      <div className="animation-wrapper py-2 px-2 relative">
        <div ref={fullLogoRef} className="full-logo relative top-1">
          <Icon icon="Logo" />
        </div>
        <div ref={shortLogoRef} className="short-logo absolute top-0 left-1/2 -translate-x-1/2">
          <Icon icon="Icon" />
        </div>
      </div>
    </div>
  );
}
