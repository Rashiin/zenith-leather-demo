import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
export function Manifesto() {
  return (
    <section id="philosophy" className="manifesto">
      <p className="section-caption">A quieter kind of luxury</p>
      <h2>
        {"Some things follow the moment. Others become part of your story."
          .split(" ")
          .map((word, i) => (
            <span className="manifesto-word" key={i}>
              {word}{" "}
            </span>
          ))}
      </h2>
      <p>
        Considered shapes. Tactile materials. Pieces to make your own,
        <br className="desktop-only" /> wherever life takes you.
      </p>
      <div className="manifesto-thread" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
export function Campaigns({
  onExplore,
}: {
  onExplore: (category: "Women" | "Men") => void;
}) {
  return (
    <div className="campaign-journey">
      <div className="campaigns">
        <section
          className="campaign women"
          id="women"
          aria-labelledby="women-title"
        >
          <div className="campaign-image">
            <Image
              src={assetPath("/images/women.webp")}
              alt="Woman in a cream tailored coat carrying a cognac leather handbag"
              fill
              sizes="100vw"
            />
          </div>
          <div className="campaign-wash" />
          <div className="campaign-top">
            <span>For her</span>
            <span>The women's edit</span>
          </div>
          <div className="campaign-copy">
            <h2 id="women-title">
              An Expression
              <br />
              of Elegance
            </h2>
            <p>For the days that become memories.</p>
            <a
              href="#collection"
              onClick={() => onExplore("Women")}
              className="button button-light"
            >
              Explore women’s collection <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="campaign-caption">
            Soft forms. Lasting impressions.
          </span>
        </section>
        <section className="campaign men" id="men" aria-labelledby="men-title">
          <div className="campaign-image">
            <Image
              src={assetPath("/images/men.webp")}
              alt="Man in charcoal tailoring with brown leather shoes and a leather weekend bag"
              fill
              sizes="100vw"
            />
          </div>
          <div className="campaign-wash" />
          <div className="campaign-top">
            <span>For him</span>
            <span>The men's edit</span>
          </div>
          <div className="campaign-copy">
            <h2 id="men-title">
              Defined by
              <br />
              Character
            </h2>
            <p>Quiet confidence. An unmistakable presence.</p>
            <a
              href="#collection"
              onClick={() => onExplore("Men")}
              className="button button-light"
            >
              Explore men’s collection <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="campaign-caption">Built on the essentials.</span>
        </section>
      </div>
    </div>
  );
}
export function Craft() {
  return (
    <section className="craft" id="craftsmanship">
      <div className="craft-photo">
        <Image
          src={assetPath("/images/craft.webp")}
          alt="Artisan's hands stitching cognac leather at a workbench"
          fill
          sizes="(max-width:767px) 100vw, 50vw"
        />
      </div>
      <div className="craft-copy">
        <p className="section-caption">The beauty is in the making</p>
        <h2>
          Made with
          <br />
          Intention.
        </h2>
        <p>
          Good design begins with a feeling. The grain beneath your fingertips.
          The weight of a clasp. The way a piece becomes familiar with time.
        </p>
        <p>
          Our vision is simple: thoughtful leather pieces, shaped by the details
          that matter.
        </p>
        <div className="craft-details">
          {[
            [
              "The material",
              "Natural character. Rich texture. A surface that tells a story.",
            ],
            [
              "The detail",
              "From the curve of a handle to the rhythm of a stitch, every element has a purpose.",
            ],
            [
              "The care",
              "Keep leather dry, store in a dust bag, and gently wipe with a soft cloth. Test care products on a hidden area first.",
            ],
          ].map(([title, copy]) => (
            <details key={title}>
              <summary>
                {title}
                <Plus size={17} />
              </summary>
              <p>{copy}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
