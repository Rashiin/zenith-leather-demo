"use client";
import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowUp,
  ShoppingBag,
  Menu,
  Minus,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import Motion from "./Motion";
import { Manifesto, Campaigns, Craft } from "./Editorial";
import Cinema from "./Cinema";
import { ProductCollection, ProductDetail, Filter } from "./Products";
import Modal from "./Modal";
import { products, Product, money } from "@/data/products";
import { cartReducer, restoreCart } from "@/lib/cart";
export default function Experience() {
  const [filter, setFilter] = useState<Filter>("All pieces");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [inCinema, setInCinema] = useState(true);
  useEffect(() => {
    try {
      dispatch({
        type: "restore",
        lines: restoreCart(localStorage.getItem("zenith-bag-v1"), products),
      });
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("zenith-bag-v1", JSON.stringify(cart));
      } catch {}
    }
  }, [cart, ready]);
  useEffect(() => {
    const listener = () => {
      setScrolled(window.scrollY > 40);
      setInCinema(
        (document.querySelector(".cinema")?.getBoundingClientRect().bottom ??
          0) > 80,
      );
    };
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timeout);
  }, [notice]);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce(
    (sum, line) =>
      sum +
      (products.find((p) => p.id === line.id)?.price || 0) * line.quantity,
    0,
  );
  function add(product: Product, size = "One size") {
    const existing = cart.find(
      (line) => line.id === product.id && line.size === size,
    );
    if (existing && existing.quantity >= 10) {
      setNotice("You have reached the demo limit of 10 for this piece.");
      return;
    }
    dispatch({ type: "add", id: product.id, size });
    setActiveProduct(null);
    setNotice(`${product.name} added to your bag`);
    setCartOpen(true);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`header ${scrolled ? "is-scrolled" : ""} ${inCinema ? "cinema-active" : ""}`}
      >
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#women">Women</a>
          <a href="#men">Men</a>
          <a href="#craftsmanship">Our craft</a>
        </nav>
        <button
          className="icon-button mobile-menu-toggle"
          aria-label="Open menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <Menu size={23} />
        </button>
        <a className="brand" href="#top" aria-label="Zenith Leather home">
          ZENITH<span>LEATHER</span>
        </a>
        <div className="header-actions">
          <a className="collection-nav" href="#collection">
            The collection
          </a>
          <button
            className="bag-button"
            aria-label={`Open shopping bag, ${count} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span>Bag</span>
            <span className="bag-count">{count}</span>
          </button>
        </div>
      </header>
      <main id="main">
        <Cinema onView={() => setActiveProduct(products[0])} />
        <Manifesto />
        <div className="kinetic-ribbon" aria-hidden="true">
          <div className="kinetic-track">
            <span>A life well carried.</span>
            <i>✦</i>
            <span>A life well carried.</span>
            <i>✦</i>
            <span>A life well carried.</span>
          </div>
        </div>
        <Campaigns onExplore={setFilter} />
        <ProductCollection
          filter={filter}
          setFilter={setFilter}
          onView={setActiveProduct}
          onAdd={add}
        />
        <Craft />
        <section className="closing">
          <p>A companion to your story.</p>
          <h2>Yours, for the becoming.</h2>
          <a href="#collection" className="text-link">
            Find your piece <ArrowUpRight size={20} />
          </a>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <p>
            Timeless leather.
            <br />
            Modern expression.
          </p>
          <nav aria-label="Footer navigation">
            <a href="#women">Women</a>
            <a href="#men">Men</a>
            <a href="#craftsmanship">Our craft</a>
            <a href="#collection">The collection</a>
          </nav>
          <a href="#top" className="back-top">
            Back to top <ArrowUp size={17} />
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          ZENITH
        </div>
        <div className="footer-bottom">
          <span>© 2026 Zenith Leather</span>
          <span>Concept experience • No purchases processed</span>
          <span>Made with intention.</span>
        </div>
      </footer>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        title="Navigation"
        kind="menu-modal"
      >
        <p className="section-caption">ZENITH LEATHER</p>
        <nav aria-label="Mobile navigation">
          {[
            ["Women", "#women"],
            ["Men", "#men"],
            ["The collection", "#collection"],
            ["Our craft", "#craftsmanship"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
              <ArrowUpRight size={26} />
            </a>
          ))}
        </nav>
        <p className="menu-signoff">Crafted to Be Remembered.</p>
      </Modal>
      <Modal
        open={!!activeProduct}
        onClose={() => setActiveProduct(null)}
        title="Product quick view"
        kind="product-modal"
      >
        {activeProduct && (
          <ProductDetail
            key={activeProduct.id}
            product={activeProduct}
            onAdd={add}
          />
        )}
      </Modal>
      <Modal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Shopping bag"
        kind="cart-modal"
      >
        <div className="cart-heading">
          <p className="section-caption">Your considered collection</p>
          <h2>
            The bag <span>({count})</span>
          </h2>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={35} strokeWidth={1} />
            <h3>A story waiting to begin.</h3>
            <p>Find the piece that feels like you.</p>
            <a
              className="button"
              href="#collection"
              onClick={() => setCartOpen(false)}
            >
              Explore the collection <ArrowUpRight size={18} />
            </a>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map((line) => {
                const product = products.find((p) => p.id === line.id)!;
                return (
                  <article
                    key={`${line.id}-${line.size}`}
                    className="cart-line"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={120}
                    />
                    <div>
                      <h3>{product.name}</h3>
                      <p>
                        {product.color}
                        {line.size !== "One size" ? ` / EU ${line.size}` : ""}
                      </p>
                      <div className="quantity">
                        <button
                          aria-label={`Decrease quantity of ${product.name}, ${line.size}`}
                          onClick={() =>
                            dispatch({
                              type: "quantity",
                              id: line.id,
                              size: line.size,
                              quantity: line.quantity - 1,
                            })
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span aria-label="Quantity">{line.quantity}</span>
                        <button
                          disabled={line.quantity >= 10}
                          aria-label={`Increase quantity of ${product.name}, ${line.size}`}
                          onClick={() =>
                            dispatch({
                              type: "add",
                              id: line.id,
                              size: line.size,
                            })
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-line-end">
                      <span>{money(product.price * line.quantity)}</span>
                      <button
                        className="icon-button"
                        aria-label={`Remove ${product.name}, ${line.size}`}
                        onClick={() =>
                          dispatch({
                            type: "remove",
                            id: line.id,
                            size: line.size,
                          })
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p>
                This is a concept shopping bag. Prices are illustrative; orders
                and payments are not available.
              </p>
              <button className="button" onClick={() => setCartOpen(false)}>
                Continue exploring <ArrowUpRight size={18} />
              </button>
            </div>
          </>
        )}
      </Modal>
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Check size={16} />
            {notice}
          </>
        )}
      </div>
      <Motion />
    </>
  );
}
