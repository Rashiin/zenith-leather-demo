"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import ParticleSculpture from "./ParticleSculpture";
export default function Cinema({ onView }: { onView: () => void }) {
  return (
    <section
      className="cinema"
      id="top"
      aria-label="The Zenith moving collection"
    >
      <div className="cinema-stage">
        <div className="cinema-grain" />
        <div className="cinema-orbit orbit-one" />
        <div className="cinema-orbit orbit-two" />
        <div className="cinema-watermark" aria-hidden="true">
          ZENITH
        </div>
        <div className="cinema-visual">
          <ParticleSculpture />
          <div className="floating-product float-bag">
            <div className="product-tilt">
              <Image
                src={assetPath("/images/floating-bag.webp")}
                alt="Cognac leather Aurora handbag suspended in light"
                fill
                priority
                sizes="(max-width:767px) 95vw, 50vw"
              />
            </div>
          </div>
          <div className="floating-product float-shoe">
            <div className="product-tilt">
              <Image
                src={assetPath("/images/floating-shoe.webp")}
                alt="Brown leather Signature Loafer"
                fill
                sizes="(max-width:767px) 95vw, 50vw"
              />
            </div>
          </div>
          <div className="product-halo" />
        </div>
        <div className="cinema-chapters">
          <div className="cinema-chapter chapter-one">
            <p className="section-caption">Leather, in a different light.</p>
            <h1>
              <span className="motion-line">
                <span>Crafted to Be</span>
              </span>
              <span className="motion-line">
                <span>Remembered.</span>
              </span>
            </h1>
            <p className="chapter-description">
              Timeless leather. Modern expression.
            </p>
            <a className="button button-light" href="#collection">
              Discover collection <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="cinema-chapter chapter-two">
            <p className="section-caption">The language of leather</p>
            <h2>
              <span className="motion-line">
                <span>Every detail.</span>
              </span>
              <span className="motion-line">
                <span>A quiet</span>
              </span>
              <span className="motion-line">
                <span>signature.</span>
              </span>
            </h2>
            <p className="chapter-description">
              A thousand small decisions.
              <br />
              One unmistakable feeling.
            </p>
            <button className="text-link" onClick={onView}>
              Meet the Aurora <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="cinema-chapter chapter-three">
            <p className="section-caption">Form follows feeling</p>
            <h2>
              <span className="motion-line">
                <span>Move with</span>
              </span>
              <span className="motion-line">
                <span>character.</span>
              </span>
            </h2>
            <p className="chapter-description">
              From the shape you carry,
              <br />
              to the way you move.
            </p>
            <a href="#women" className="button button-light">
              Enter the collection <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="cinema-foot">
          <a href="#philosophy" className="cinema-scroll">
            <ArrowDown size={16} />
            <span>Scroll to unfold</span>
          </a>
          <div className="chapter-indicators" aria-hidden="true">
            <span className="chapter-dot dot-one">Form</span>
            <span className="chapter-dot dot-two">Detail</span>
            <span className="chapter-dot dot-three">Movement</span>
          </div>
          <span className="cinema-percent" aria-hidden="true">
            00%
          </span>
        </div>
        <div className="cinema-progress">
          <span />
        </div>
      </div>
    </section>
  );
}
