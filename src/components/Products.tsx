"use client";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product, products, money } from "@/data/products";
export type Filter = "All pieces" | "Women" | "Men";
export function ProductCollection({
  filter,
  setFilter,
  onView,
  onAdd,
}: {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  onView: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".product", {
        y: 35,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    }, ref);
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      context.revert();
    };
  }, [filter]);
  const visible = products.filter(
    (p) => filter === "All pieces" || p.category === filter,
  );
  return (
    <section
      id="collection"
      className="collection"
      aria-labelledby="collection-title"
    >
      <div className="collection-heading">
        <div>
          <p className="section-caption">Considered essentials</p>
          <h2 id="collection-title">The pieces you keep.</h2>
        </div>
        <p>
          Discover the signature collection.
          <br />
          Made for your everyday, and beyond.
        </p>
      </div>
      <div className="collection-toolbar">
        <div className="filters" role="group" aria-label="Filter collection">
          {(["All pieces", "Women", "Men"] as Filter[]).map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <span aria-live="polite">{visible.length} pieces</span>
      </div>
      <div className="product-grid" ref={ref}>
        {visible.map((product) => (
          <article className="product" key={product.id}>
            <div className="product-photo">
              <button
                className="product-view"
                aria-label={`Quick view ${product.name}`}
                onClick={() => onView(product)}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} in ${product.color}`}
                  width={720}
                  height={720}
                  sizes="(max-width:767px) 50vw, 33vw"
                />
                <span className="quick-label">
                  Discover the piece <ArrowUpRight size={16} />
                </span>
              </button>
              <button
                className="product-add"
                aria-label={
                  product.type === "Shoe"
                    ? `Choose size for ${product.name}`
                    : `Add ${product.name} to bag`
                }
                onClick={() =>
                  product.type === "Shoe" ? onView(product) : onAdd(product)
                }
              >
                <Plus size={19} />
              </button>
            </div>
            <div className="product-info">
              <button onClick={() => onView(product)}>{product.name}</button>
              <span>{money(product.price)}</span>
            </div>
            <p className="product-color">
              <i
                style={{
                  background: {
                    Cognac: "#8c4728",
                    Espresso: "#49352b",
                    Black: "#242421",
                    "Dark brown": "#4b2d1f",
                    Oxblood: "#5d202a",
                  }[product.color],
                }}
              />
              {product.color}
            </p>
          </article>
        ))}
      </div>
      <p className="demo-note">Concept collection. Sample prices in USD.</p>
    </section>
  );
}
export function ProductDetail({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, size: string) => void;
}) {
  const [size, setSize] = useState(product.type === "Bag" ? "One size" : "");
  const [detail, setDetail] = useState(false);
  return (
    <div className="quick-view">
      <div className={`quick-photo ${detail ? "is-detail" : ""}`}>
        <Image
          src={product.image}
          alt={`${product.name}, ${detail ? "close-up detail" : "full view"}`}
          fill
          sizes="(max-width:767px) 90vw, 45vw"
        />
        <div
          className="image-tabs"
          role="group"
          aria-label="Product image view"
        >
          <button aria-pressed={!detail} onClick={() => setDetail(false)}>
            Full view
          </button>
          <button aria-pressed={detail} onClick={() => setDetail(true)}>
            Detail
          </button>
        </div>
      </div>
      <div className="quick-copy">
        <p className="section-caption">
          {product.category} /{" "}
          {product.type === "Shoe" ? "Footwear" : "Leather goods"}
        </p>
        <h2>{product.name}</h2>
        <p className="quick-price">
          {money(product.price)} <span>Sample price</span>
        </p>
        <p>{product.description}</p>
        <p className="color-selection">Color: {product.color}</p>
        {product.type === "Shoe" && (
          <fieldset className="sizes">
            <legend>Select size (EU)</legend>
            {product.sizes.map((s) => (
              <button
                key={s}
                aria-pressed={s === size}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </fieldset>
        )}
        <button
          className="button add-button"
          disabled={!size}
          onClick={() => onAdd(product, size)}
        >
          {size ? "Add to bag" : "Select a size"}
          <Plus size={18} />
        </button>
        <ul>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <p className="demo-note">
          A concept piece for this interactive demo. No purchase or payment is
          processed.
        </p>
      </div>
    </div>
  );
}
