import React, { useState, useMemo, useRef, useEffect } from "react";

/* ---------------------------------- DATA ---------------------------------- */

const PRODUCTS = [
  {
    id: 1,
    name: "Тормозные колодки BMW",
    brand: "BMW",
    category: "Тормозная система",
    price: 18900,
    rating: 4.9,
    sku: "BR-4471-BM",
    desc: "Оригинальные тормозные колодки для BMW 3/5 серии. Керамическое покрытие, увеличенный ресурс, минимальный шум.",
    stock: true,
  },
  {
    id: 2,
    name: "Масляный фильтр Mercedes",
    brand: "Mercedes",
    category: "Фильтры",
    price: 5600,
    rating: 4.8,
    sku: "OF-2290-MB",
    desc: "Оригинальный масляный фильтр для двигателей Mercedes-Benz линейки OM. Тонкая очистка, надёжный корпус.",
    stock: true,
  },
  {
    id: 3,
    name: "Свечи зажигания Audi",
    brand: "Audi",
    category: "Двигатель",
    price: 7200,
    rating: 4.7,
    sku: "SP-1183-AU",
    desc: "Комплект из 4 свечей зажигания с иридиевым наконечником для двигателей Audi TFSI.",
    stock: true,
  },
  {
    id: 4,
    name: "Комплект амортизаторов Bilstein",
    brand: "Bilstein",
    category: "Подвеска",
    price: 42000,
    rating: 5.0,
    sku: "SH-5502-BS",
    desc: "Спортивные амортизаторы Bilstein B6 для точной управляемости и комфорта на любых покрытиях.",
    stock: true,
  },
  {
    id: 5,
    name: "Воздушный фильтр MANN",
    brand: "MANN-FILTER",
    category: "Фильтры",
    price: 4800,
    rating: 4.6,
    sku: "AF-0087-MN",
    desc: "Воздушный фильтр премиум-класса MANN-FILTER. Увеличенная площадь фильтрации.",
    stock: false,
  },
  {
    id: 6,
    name: "Моторное масло Liqui Moly",
    brand: "Liqui Moly",
    category: "Масла",
    price: 8900,
    rating: 4.9,
    sku: "OL-3341-LM",
    desc: "Синтетическое моторное масло 5W-40, 4 литра. Немецкое качество для европейских двигателей.",
    stock: true,
  },
];

const STORIES = [
  { id: "new", label: "Новинки", copy: "Свежие поступления оригинальных деталей за последнюю неделю." },
  { id: "bmw", label: "BMW", copy: "Полная линейка комплектующих для BMW: от фильтров до подвески." },
  { id: "mercedes", label: "Mercedes", copy: "Оригинальные запчасти Mercedes-Benz с заводской гарантией." },
  { id: "audi", label: "Audi", copy: "Компоненты для двигателей TFSI и TDI в наличии на складе." },
  { id: "sale", label: "Акции", copy: "Скидка 12% на тормозные системы до конца месяца." },
  { id: "top", label: "Топ продаж", copy: "Самые популярные позиции этого месяца среди наших клиентов." },
];

const CATEGORIES = [
  { id: "Двигатель", icon: "engine" },
  { id: "Подвеска", icon: "suspension" },
  { id: "Тормозная система", icon: "brake" },
  { id: "Электрика", icon: "electric" },
  { id: "Масла", icon: "oil" },
  { id: "Фильтры", icon: "filter" },
];

const BENEFITS = [
  { title: "Прямые поставки", copy: "Работаем напрямую с производителями, минуя посредников." },
  { title: "Подбор по VIN", copy: "Точный подбор детали под конкретный автомобиль." },
  { title: "Экспертная проверка", copy: "Каждая деталь проходит проверку перед отправкой." },
  { title: "Гарантия 24 месяца", copy: "Официальная гарантия на все оригинальные комплектующие." },
  { title: "Доставка по России", copy: "Отправляем в любой регион в течение 1–3 дней." },
  { title: "Поддержка 24/7", copy: "Консультанты на связи в любое время суток." },
];

/* --------------------------------- ICONS --------------------------------- */

const Icon = ({ name, size = 22 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>;
    case "heart": return <svg {...p}><path d="M12 20s-7-4.3-9.5-8.8C.8 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.2C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.6 4 3 7.2C19 15.7 12 20 12 20z"/></svg>;
    case "cart": return <svg {...p}><circle cx="9" cy="20" r="1.1"/><circle cx="17" cy="20" r="1.1"/><path d="M2.5 3h2.4l1.9 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6.2"/></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.4-3.8 4.2-5.6 7.5-5.6s6.1 1.8 7.5 5.6"/></svg>;
    case "engine": return <svg {...p}><rect x="3" y="9" width="12" height="7" rx="1"/><path d="M15 11h3v3h-3M6 9V6h5v3M9 16v2M13 16v2"/></svg>;
    case "suspension": return <svg {...p}><path d="M12 2v4"/><path d="M8 6h8l-1.3 3H9.3z"/><path d="M9.5 9c-1 3 1 4 1 7s-2 4-2 4"/><path d="M14.5 9c1 3-1 4-1 7s2 4 2 4"/></svg>;
    case "brake": return <svg {...p}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>;
    case "electric": return <svg {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>;
    case "oil": return <svg {...p}><path d="M12 3c3 4 6 7.4 6 11a6 6 0 1 1-12 0c0-3.6 3-7 6-11z"/></svg>;
    case "filter": return <svg {...p}><path d="M4 5h16l-6 8v6l-4 2v-8z"/></svg>;
    case "truck": return <svg {...p}><rect x="2" y="7" width="12" height="9"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="6.5" cy="18" r="1.4"/><circle cx="17.5" cy="18" r="1.4"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3 5 6v6c0 4.4 3 7.3 7 9 4-1.7 7-4.6 7-9V6z"/></svg>;
    case "card": return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="1.5"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "star": return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.6L12 17.7l-5.8 2.9 1.1-6.6-4.8-4.6 6.6-.9z"/></svg>;
    case "starOutline": return <svg {...p}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.6L12 17.7l-5.8 2.9 1.1-6.6-4.8-4.6 6.6-.9z"/></svg>;
    case "plus": return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "minus": return <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "trash": return <svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>;
    case "close": return <svg {...p}><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>;
    case "chevronRight": return <svg {...p}><polyline points="9 6 15 12 9 18"/></svg>;
    case "check": return <svg {...p}><polyline points="5 12 10 17 19 7"/></svg>;
    case "phone": return <svg {...p}><path d="M6 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 6.2 2 2 0 0 1 6 3z"/></svg>;
    case "box": return <svg {...p}><path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>;
    case "logout": return <svg {...p}><path d="M9 4H5v16h4"/><path d="M14 8l4 4-4 4"/><line x1="18" y1="12" x2="9" y2="12"/></svg>;
    default: return null;
  }
};

/* --------------------------------- HELPERS -------------------------------- */

const money = (n) => n.toLocaleString("ru-RU") + " ₽";

function useToast() {
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);
  const show = (text) => {
    setMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  };
  return [msg, show];
}

/* ---------------------------------- APP ----------------------------------- */

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [storyOpen, setStoryOpen] = useState(null);
  const [toastMsg, showToast] = useToast();
  const [auth, setAuth] = useState({ step: "signedOut", phone: "", code: "" });

  const addToCart = (id) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, qty: 1 }];
    });
    showToast("Товар добавлен в корзину");
  };

  const changeQty = (id, delta) => {
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const toggleFavorite = (id) => {
    setFavorites((f) => {
      const isFav = f.includes(id);
      showToast(isFav ? "Удалено из избранного" : "Добавлено в избранное");
      return isFav ? f.filter((x) => x !== id) : [...f, id];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={styles.appShell}>
      <FontImport />
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        favCount={favorites.length}
        onSearchToggle={() => setSearchOpen((s) => !s)}
      />
      {searchOpen && (
        <SearchBar query={query} setQuery={setQuery} onGo={() => { setPage("catalog"); setSearchOpen(false); }} />
      )}

      {page === "home" && (
        <Home
          onGoCatalog={() => setPage("catalog")}
          onOpenStory={(s) => setStoryOpen(s)}
          onAddToCart={addToCart}
          onToggleFav={toggleFavorite}
          favorites={favorites}
        />
      )}

      {page === "catalog" && (
        <Catalog
          query={query}
          setQuery={setQuery}
          cart={cart}
          favorites={favorites}
          onAddToCart={addToCart}
          onToggleFav={toggleFavorite}
        />
      )}

      {page === "cart" && (
        <CartPage
          cart={cart}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onCheckout={() => showToast("Заказ оформлен — спасибо!")}
          onGoCatalog={() => setPage("catalog")}
        />
      )}

      {page === "profile" && (
        <ProfilePage
          auth={auth}
          setAuth={setAuth}
          favorites={favorites}
          onToggleFav={toggleFavorite}
        />
      )}

      {storyOpen && <StoryModal story={storyOpen} onClose={() => setStoryOpen(null)} />}
      {toastMsg && <div style={styles.toast}>{toastMsg}</div>}
    </div>
  );
}

/* ------------------------------- FONT IMPORT ------------------------------ */

function FontImport() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; }
      ::selection { background: rgba(212,175,55,0.35); }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.25); border-radius: 8px; }
      @keyframes ppFadeUp { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform:none; } }
      @keyframes ppPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35);} 50% { box-shadow: 0 0 0 6px rgba(212,175,55,0);} }
      .pp-fade { animation: ppFadeUp .5s ease both; }
      .pp-card:hover { transform: translateY(-4px); border-color: rgba(212,175,55,0.45) !important; box-shadow: 0 18px 40px rgba(0,0,0,0.45) !important; }
      .pp-cat:hover .pp-cat-icon { border-color: rgba(212,175,55,0.6); color: #E8C766; }
      .pp-story:hover .pp-story-ring { box-shadow: 0 0 0 2px #0A0A0B, 0 0 0 4px rgba(212,175,55,0.8); }
      .pp-btn-gold:hover { background: #E8C766 !important; }
      .pp-btn-ghost:hover { border-color: rgba(212,175,55,0.6) !important; color: #E8C766 !important; }
      .pp-nav-icon:hover { color: #E8C766 !important; }
      input[type=range].pp-range { -webkit-appearance: none; height: 3px; background: rgba(255,255,255,0.15); border-radius: 3px; }
      input[type=range].pp-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #D4AF37; cursor: pointer; }
    `}</style>
  );
}

/* --------------------------------- STYLES --------------------------------- */

const COLORS = {
  bg: "#0A0A0B",
  panel: "#131316",
  glass: "rgba(255,255,255,0.045)",
  border: "rgba(255,255,255,0.09)",
  gold: "#D4AF37",
  goldSoft: "#E8C766",
  text: "#F2F1EC",
  textMuted: "#9A9A9E",
};

const styles = {
  appShell: {
    background: COLORS.bg,
    color: COLORS.text,
    minHeight: "100%",
    fontFamily: "'Manrope', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  toast: {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(19,19,22,0.95)",
    border: `1px solid ${COLORS.border}`,
    borderLeft: `3px solid ${COLORS.gold}`,
    padding: "12px 20px",
    borderRadius: 12,
    fontSize: 14,
    zIndex: 200,
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
  },
};

const glassCard = (extra = {}) => ({
  background: COLORS.glass,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 20,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  ...extra,
});

/* --------------------------------- NAVBAR ---------------------------------- */

function Navbar({ page, setPage, cartCount, favCount, onSearchToggle }) {
  const NavItem = ({ id, children }) => (
    <button
      onClick={() => setPage(id)}
      style={{
        background: "none",
        border: "none",
        color: page === id ? COLORS.goldSoft : COLORS.textMuted,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        padding: "6px 4px",
      }}
    >
      {children}
    </button>
  );
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        ...glassCard({ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }),
        padding: "16px 5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: COLORS.text, letterSpacing: 0.5 }}>Premium</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: COLORS.gold, letterSpacing: 0.5 }}>Parts</span>
        </button>
        <div style={{ display: "flex", gap: 24 }} className="pp-fade">
          <NavItem id="home">Главная</NavItem>
          <NavItem id="catalog">Каталог</NavItem>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button onClick={onSearchToggle} className="pp-nav-icon" style={iconBtnStyle}><Icon name="search" /></button>
        <button onClick={() => setPage("profile")} className="pp-nav-icon" style={{ ...iconBtnStyle, position: "relative" }}>
          <Icon name="heart" />
          {favCount > 0 && <Badge n={favCount} />}
        </button>
        <button onClick={() => setPage("cart")} className="pp-nav-icon" style={{ ...iconBtnStyle, position: "relative" }}>
          <Icon name="cart" />
          {cartCount > 0 && <Badge n={cartCount} />}
        </button>
        <button onClick={() => setPage("profile")} className="pp-nav-icon" style={iconBtnStyle}><Icon name="user" /></button>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: "none",
  border: "none",
  color: COLORS.text,
  cursor: "pointer",
  display: "flex",
};

function Badge({ n }) {
  return (
    <span
      style={{
        position: "absolute",
        top: -6,
        right: -8,
        background: COLORS.gold,
        color: "#1a1608",
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 4px",
      }}
    >
      {n}
    </span>
  );
}

function SearchBar({ query, setQuery, onGo }) {
  return (
    <div style={{ padding: "14px 5vw", borderBottom: `1px solid ${COLORS.border}` }} className="pp-fade">
      <div style={{ display: "flex", gap: 10, maxWidth: 520 }}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onGo()}
          placeholder="Найти деталь, бренд, категорию..."
          style={{
            flex: 1,
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            color: COLORS.text,
            padding: "10px 14px",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button onClick={onGo} style={goldButton()}>Искать</button>
      </div>
    </div>
  );
}

const goldButton = (extra = {}) => ({
  background: COLORS.gold,
  color: "#1a1608",
  border: "none",
  borderRadius: 10,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  ...extra,
});

const ghostButton = (extra = {}) => ({
  background: "transparent",
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  ...extra,
});

/* ---------------------------------- HOME ----------------------------------- */

function Home({ onGoCatalog, onOpenStory, onAddToCart, onToggleFav, favorites }) {
  return (
    <div>
      <Hero onGoCatalog={onGoCatalog} />
      <Stories onOpenStory={onOpenStory} />
      <InfoStrip />
      <Categories onGoCatalog={onGoCatalog} />
      <FeaturedProducts onAddToCart={onAddToCart} onToggleFav={onToggleFav} favorites={favorites} />
      <Benefits />
      <Footer />
    </div>
  );
}

function Hero({ onGoCatalog }) {
  return (
    <div style={{ position: "relative", padding: "9vh 5vw 8vh", overflow: "hidden" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 75% 20%, rgba(212,175,55,0.14), transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(212,175,55,0.08), transparent 50%)",
        }}
      />
      <svg
        aria-hidden
        width="640"
        height="260"
        viewBox="0 0 640 260"
        style={{ position: "absolute", right: "-4%", top: "18%", opacity: 0.16 }}
      >
        <path
          d="M40 190 Q60 120 160 110 L220 70 Q320 45 420 75 L520 115 Q590 130 600 175 L600 195 L560 195 Q555 165 520 165 Q485 165 480 195 L200 195 Q195 165 160 165 Q125 165 120 195 L40 195 Z"
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="2"
        />
        <circle cx="160" cy="195" r="26" fill="none" stroke={COLORS.gold} strokeWidth="2" />
        <circle cx="520" cy="195" r="26" fill="none" stroke={COLORS.gold} strokeWidth="2" />
      </svg>
      <div style={{ position: "relative", maxWidth: 640 }} className="pp-fade">
        <p style={{ color: COLORS.gold, letterSpacing: 3, fontSize: 12, fontWeight: 600, marginBottom: 18 }}>
          PREMIUMPARTS · ОРИГИНАЛЬНЫЕ ЗАПЧАСТИ
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,58px)", lineHeight: 1.1, margin: 0, fontWeight: 600 }}>
          Premium автозапчасти для автомобилей европейских брендов
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 16, marginTop: 22, maxWidth: 480, lineHeight: 1.6 }}>
          Только оригинальные комплектующие с официальной гарантией. Подбор, доставка и поддержка на каждом этапе.
        </p>
        <div style={{ marginTop: 34, display: "flex", gap: 16 }}>
          <button className="pp-btn-gold" onClick={onGoCatalog} style={goldButton({ padding: "14px 28px", fontSize: 15 })}>
            Перейти в каталог
          </button>
          <button className="pp-btn-ghost" style={ghostButton({ padding: "14px 28px", fontSize: 15 })}>
            Подбор по VIN
          </button>
        </div>
      </div>
    </div>
  );
}

function Stories({ onOpenStory }) {
  return (
    <div style={{ padding: "0 5vw 5vh", display: "flex", gap: 24, overflowX: "auto" }}>
      {STORIES.map((s) => (
        <button
          key={s.id}
          className="pp-story"
          onClick={() => onOpenStory(s)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}
        >
          <div
            className="pp-story-ring"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              padding: 3,
              background: `conic-gradient(${COLORS.gold}, #7a651c, ${COLORS.gold})`,
              transition: "box-shadow .2s",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: COLORS.panel,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.goldSoft,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {s.label[0]}
            </div>
          </div>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function StoryModal({ story, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...glassCard({ padding: 32, maxWidth: 380, width: "100%", position: "relative" }),
          background: "#131316",
        }}
        className="pp-fade"
      >
        <button onClick={onClose} style={{ ...iconBtnStyle, position: "absolute", top: 18, right: 18 }}>
          <Icon name="close" />
        </button>
        <div style={{ color: COLORS.gold, fontSize: 12, letterSpacing: 2, fontWeight: 600, marginBottom: 12 }}>
          {story.label.toUpperCase()}
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: COLORS.text }}>{story.copy}</p>
        <button style={goldButton({ marginTop: 24, width: "100%" })} onClick={onClose}>
          Понятно
        </button>
      </div>
    </div>
  );
}

function InfoStrip() {
  const items = [
    { icon: "truck", title: "Бесплатная доставка", copy: "При заказе от 5 000 ₽" },
    { icon: "shield", title: "Гарантия качества", copy: "До 24 месяцев" },
    { icon: "card", title: "Удобная оплата", copy: "Картой, СБП, в рассрочку" },
    { icon: "star", title: "10 000+ клиентов", copy: "Доверяют нам с 2015 года" },
  ];
  return (
    <div style={{ padding: "0 5vw 6vh", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 18 }}>
      {items.map((it) => (
        <div key={it.title} style={glassCard({ padding: "22px 20px", display: "flex", gap: 14, alignItems: "flex-start" })}>
          <div style={{ color: COLORS.gold, marginTop: 2 }}><Icon name={it.icon} size={24} /></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{it.title}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>{it.copy}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Categories({ onGoCatalog }) {
  return (
    <div style={{ padding: "0 5vw 7vh" }}>
      <SectionTitle eyebrow="Каталог" title="Популярные категории" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 18, marginTop: 28 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className="pp-cat"
            onClick={onGoCatalog}
            style={{ ...glassCard({ padding: "26px 16px" }), border: `1px solid ${COLORS.border}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: COLORS.text }}
          >
            <div className="pp-cat-icon" style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, transition: "all .2s" }}>
              <Icon name={c.icon} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{c.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts({ onAddToCart, onToggleFav, favorites }) {
  const featured = PRODUCTS.slice(0, 3);
  return (
    <div style={{ padding: "0 5vw 7vh" }}>
      <SectionTitle eyebrow="Витрина" title="Топ продаж этого месяца" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20, marginTop: 28 }}>
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onToggleFav={onToggleFav} isFav={favorites.includes(p.id)} />
        ))}
      </div>
    </div>
  );
}

function Benefits() {
  return (
    <div style={{ padding: "0 5vw 8vh" }}>
      <SectionTitle eyebrow="Почему мы" title="Почему выбирают PremiumParts" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: 18, marginTop: 28 }}>
        {BENEFITS.map((b, i) => (
          <div key={b.title} style={glassCard({ padding: "24px 22px" })}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.gold, marginBottom: 12 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{b.title}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 13.5, lineHeight: 1.55 }}>{b.copy}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <p style={{ color: COLORS.gold, letterSpacing: 2, fontSize: 11, fontWeight: 600, marginBottom: 8 }}>{eyebrow.toUpperCase()}</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,3vw,32px)", margin: 0, fontWeight: 600 }}>{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "5vh 5vw", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 28 }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600 }}>
          Premium<span style={{ color: COLORS.gold }}>Parts</span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
          Оригинальные автозапчасти для европейских брендов с 2015 года.
        </p>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: COLORS.textMuted }}>Контакты</div>
        <p style={{ fontSize: 13.5, margin: "6px 0" }}>г. Москва, ул. Автозаводская, 12</p>
        <p style={{ fontSize: 13.5, margin: "6px 0" }}>+7 (495) 000-00-00</p>
        <p style={{ fontSize: 13.5, margin: "6px 0" }}>hello@premiumparts.ru</p>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: COLORS.textMuted }}>Соцсети</div>
        <p style={{ fontSize: 13.5, margin: "6px 0" }}>Telegram · VK · WhatsApp</p>
      </div>
    </div>
  );
}

/* --------------------------------- CATALOG --------------------------------- */

function Catalog({ query, setQuery, cart, favorites, onAddToCart, onToggleFav }) {
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))];
  const cats = [...new Set(PRODUCTS.map((p) => p.category))];
  const maxPrice = Math.max(...PRODUCTS.map((p) => p.price));

  const [brandFilter, setBrandFilter] = useState([]);
  const [catFilter, setCatFilter] = useState([]);
  const [priceMax, setPriceMax] = useState(maxPrice);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (query && !(p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()))) return false;
      if (brandFilter.length && !brandFilter.includes(p.brand)) return false;
      if (catFilter.length && !catFilter.includes(p.category)) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && !p.stock) return false;
      return true;
    });
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, brandFilter, catFilter, priceMax, inStockOnly, sort]);

  return (
    <div style={{ padding: "5vh 5vw 8vh", display: "grid", gridTemplateColumns: "260px 1fr", gap: 32 }}>
      <aside style={glassCard({ padding: 24, alignSelf: "start", position: "sticky", top: 92 })} className="pp-fade">
        <div style={{ fontWeight: 600, marginBottom: 18, fontSize: 15 }}>Фильтры</div>

        <FilterGroup label="Бренд">
          {brands.map((b) => (
            <Checkbox key={b} checked={brandFilter.includes(b)} onChange={() => toggle(brandFilter, setBrandFilter, b)} label={b} />
          ))}
        </FilterGroup>

        <FilterGroup label="Категория">
          {cats.map((c) => (
            <Checkbox key={c} checked={catFilter.includes(c)} onChange={() => toggle(catFilter, setCatFilter, c)} label={c} />
          ))}
        </FilterGroup>

        <FilterGroup label={`Цена до ${money(priceMax)}`}>
          <input
            className="pp-range"
            type="range"
            min={1000}
            max={maxPrice}
            step={500}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </FilterGroup>

        <FilterGroup label="Наличие">
          <Checkbox checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} label="Только в наличии" />
        </FilterGroup>

        <button
          onClick={() => { setBrandFilter([]); setCatFilter([]); setPriceMax(maxPrice); setInStockOnly(false); setQuery(""); }}
          style={ghostButton({ width: "100%", marginTop: 6 })}
        >
          Сбросить фильтры
        </button>
      </aside>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
          <div>
            <SectionTitle eyebrow="Каталог" title={query ? `Результаты по «${query}»` : "Все товары"} />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
            <option value="popular">По популярности</option>
            <option value="priceAsc">Сначала дешевле</option>
            <option value="priceDesc">Сначала дороже</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setBrandFilter([]); setCatFilter([]); setPriceMax(maxPrice); setInStockOnly(false); setQuery(""); }} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 20 }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onToggleFav={onToggleFav} isFav={favorites.includes(p.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div style={{ ...glassCard({ padding: 48 }), textAlign: "center" }}>
      <div style={{ color: COLORS.gold, marginBottom: 14, display: "flex", justifyContent: "center" }}><Icon name="search" size={30} /></div>
      <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Ничего не найдено</div>
      <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Попробуйте изменить фильтры или запрос поиска.</p>
      <button onClick={onReset} style={goldButton()}>Сбросить фильтры</button>
    </div>
  );
}

const selectStyle = {
  background: COLORS.panel,
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "9px 12px",
  fontSize: 13,
  outline: "none",
};

function FilterGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5 }}>
      <span
        onClick={onChange}
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1px solid ${checked ? COLORS.gold : COLORS.border}`,
          background: checked ? COLORS.gold : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a1608",
          flexShrink: 0,
        }}
      >
        {checked && <Icon name="check" size={11} />}
      </span>
      {label}
    </label>
  );
}

/* ------------------------------- PRODUCT CARD ------------------------------ */

function ProductCard({ product, onAddToCart, onToggleFav, isFav }) {
  return (
    <div className="pp-fade pp-card" style={{ ...glassCard({ padding: 0, overflow: "hidden" }), transition: "all .25s" }}>
      <div style={{ position: "relative", height: 140, background: "linear-gradient(160deg, #1c1c1f, #0e0e10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: "78%",
            height: "70%",
            border: `1px solid rgba(212,175,55,0.35)`,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "rgba(212,175,55,0.03)",
          }}
        >
          <div style={{ color: COLORS.gold }}>
            <Icon name={CATEGORIES.find((c) => c.id === product.category)?.icon || "box"} size={30} />
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: COLORS.textMuted, letterSpacing: 1 }}>
            № {product.sku}
          </div>
        </div>
        <button
          onClick={() => onToggleFav(product.id)}
          style={{ position: "absolute", top: 10, right: 10, background: "rgba(10,10,11,0.6)", border: `1px solid ${COLORS.border}`, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isFav ? COLORS.gold : COLORS.text }}
        >
          <Icon name="heart" size={16} />
        </button>
        {!product.stock && (
          <span style={{ position: "absolute", top: 10, left: 10, fontSize: 10.5, background: "rgba(10,10,11,0.75)", border: `1px solid ${COLORS.border}`, padding: "4px 8px", borderRadius: 6, color: COLORS.textMuted }}>
            Под заказ
          </span>
        )}
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: COLORS.gold, letterSpacing: 1, marginBottom: 6 }}>{product.brand.toUpperCase()}</div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12, color: COLORS.textMuted, fontSize: 12.5 }}>
          <Icon name="star" size={13} />
          <span style={{ color: COLORS.text }}>{product.rating}</span>
          <span>· {product.category}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, fontWeight: 500 }}>{money(product.price)}</span>
        </div>
        <button
          className="pp-btn-gold"
          onClick={() => onAddToCart(product.id)}
          disabled={!product.stock}
          style={goldButton({ width: "100%", marginTop: 14, opacity: product.stock ? 1 : 0.4, cursor: product.stock ? "pointer" : "not-allowed" })}
        >
          {product.stock ? "Купить" : "Нет в наличии"}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- CART ------------------------------------ */

function CartPage({ cart, onChangeQty, onRemove, onCheckout, onGoCatalog }) {
  const items = cart.map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }));
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div style={{ padding: "6vh 5vw 10vh", maxWidth: 900, margin: "0 auto" }}>
      <SectionTitle eyebrow="Ваш заказ" title="Корзина" />
      {items.length === 0 ? (
        <div style={{ ...glassCard({ padding: 48, marginTop: 28 }), textAlign: "center" }}>
          <div style={{ color: COLORS.gold, marginBottom: 14, display: "flex", justifyContent: "center" }}><Icon name="cart" size={30} /></div>
          <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Корзина пуста</div>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Добавьте товары из каталога, чтобы оформить заказ.</p>
          <button onClick={onGoCatalog} style={goldButton()}>В каталог</button>
        </div>
      ) : (
        <div style={{ marginTop: 28, display: "grid", gap: 16 }}>
          {items.map((i) => (
            <div key={i.id} className="pp-fade" style={{ ...glassCard({ padding: 18 }), display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, background: "linear-gradient(160deg,#1c1c1f,#0e0e10)", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.gold, flexShrink: 0 }}>
                <Icon name={CATEGORIES.find((c) => c.id === i.product.category)?.icon || "box"} size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: COLORS.gold, marginBottom: 4 }}>{i.product.brand.toUpperCase()}</div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{i.product.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>{money(i.product.price)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "4px 8px" }}>
                <button onClick={() => onChangeQty(i.id, -1)} style={{ ...iconBtnStyle, padding: 4 }}><Icon name="minus" size={14} /></button>
                <span style={{ minWidth: 18, textAlign: "center", fontSize: 14 }}>{i.qty}</span>
                <button onClick={() => onChangeQty(i.id, 1)} style={{ ...iconBtnStyle, padding: 4 }}><Icon name="plus" size={14} /></button>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, width: 100, textAlign: "right" }}>
                {money(i.product.price * i.qty)}
              </div>
              <button onClick={() => onRemove(i.id)} style={{ ...iconBtnStyle, color: COLORS.textMuted }}><Icon name="trash" size={17} /></button>
            </div>
          ))}

          <div style={{ ...glassCard({ padding: 24 }), marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ color: COLORS.textMuted, fontSize: 13 }}>Итого к оплате</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 600, color: COLORS.goldSoft }}>{money(total)}</div>
            </div>
            <button className="pp-btn-gold" onClick={onCheckout} style={goldButton({ padding: "16px 36px", fontSize: 15 })}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- PROFILE ---------------------------------- */

function ProfilePage({ auth, setAuth, favorites, onToggleFav }) {
  const [phoneInput, setPhoneInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id));
  const mockOrders = [
    { id: "PP-10234", date: "12 июля 2026", total: 24500, status: "Доставлен" },
    { id: "PP-10198", date: "28 июня 2026", total: 8900, status: "Доставлен" },
  ];

  if (auth.step === "signedOut") {
    return (
      <div style={{ padding: "8vh 5vw", maxWidth: 420, margin: "0 auto" }}>
        <div style={glassCard({ padding: 32 })} className="pp-fade">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18, color: COLORS.gold }}><Icon name="phone" size={30} /></div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, textAlign: "center", fontWeight: 600, marginBottom: 6 }}>Вход в личный кабинет</div>
          <p style={{ color: COLORS.textMuted, fontSize: 13.5, textAlign: "center", marginBottom: 24 }}>Введите номер телефона, мы отправим код подтверждения</p>
          <input
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            style={{ width: "100%", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.text, padding: "12px 14px", fontSize: 14, outline: "none", marginBottom: 16 }}
          />
          <button
            onClick={() => phoneInput.trim() && setAuth({ ...auth, step: "code", phone: phoneInput })}
            style={goldButton({ width: "100%", padding: "13px", opacity: phoneInput.trim() ? 1 : 0.5 })}
            disabled={!phoneInput.trim()}
          >
            Получить код
          </button>
        </div>
      </div>
    );
  }

  if (auth.step === "code") {
    return (
      <div style={{ padding: "8vh 5vw", maxWidth: 420, margin: "0 auto" }}>
        <div style={glassCard({ padding: 32 })} className="pp-fade">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, textAlign: "center", fontWeight: 600, marginBottom: 6 }}>Введите код</div>
          <p style={{ color: COLORS.textMuted, fontSize: 13.5, textAlign: "center", marginBottom: 24 }}>
            Отправлен на {auth.phone} · демо-код: <span style={{ color: COLORS.goldSoft }}>1234</span>
          </p>
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="1234"
            maxLength={4}
            style={{ width: "100%", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.text, padding: "12px 14px", fontSize: 18, letterSpacing: 8, textAlign: "center", outline: "none", marginBottom: 16 }}
          />
          <button
            onClick={() => codeInput === "1234" && setAuth({ ...auth, step: "in" })}
            style={goldButton({ width: "100%", padding: "13px" })}
          >
            Подтвердить
          </button>
          <button onClick={() => setAuth({ step: "signedOut", phone: "", code: "" })} style={{ ...ghostButton({ width: "100%", padding: "13px", marginTop: 10 }) }}>
            Назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "6vh 5vw 10vh", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ ...glassCard({ padding: 26 }), display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }} className="pp-fade">
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.gold}, #7a651c)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#1a1608", fontWeight: 700 }}>
          АК
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 17 }}>Александр К.</div>
          <div style={{ color: COLORS.textMuted, fontSize: 13.5, marginTop: 2 }}>{auth.phone}</div>
        </div>
        <button onClick={() => setAuth({ step: "signedOut", phone: "", code: "" })} style={ghostButton({ display: "flex", alignItems: "center", gap: 8 })}>
          <Icon name="logout" size={16} /> Выйти
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 16, marginBottom: 30 }}>
        <StatCard label="Заказов" value={mockOrders.length} />
        <StatCard label="В избранном" value={favProducts.length} />
        <StatCard label="Клиент с" value="2024" />
      </div>

      <SectionTitle eyebrow="История" title="Мои заказы" />
      <div style={{ display: "grid", gap: 12, marginTop: 20, marginBottom: 40 }}>
        {mockOrders.map((o) => (
          <div key={o.id} style={{ ...glassCard({ padding: 18 }), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon name="box" size={20} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{o.id}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12.5 }}>{o.date}</div>
              </div>
            </div>
            <span style={{ fontSize: 12, color: COLORS.goldSoft, border: `1px solid rgba(212,175,55,0.35)`, padding: "4px 10px", borderRadius: 20 }}>{o.status}</span>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{money(o.total)}</div>
          </div>
        ))}
      </div>

      <SectionTitle eyebrow="Сохранено" title="Избранные товары" />
      {favProducts.length === 0 ? (
        <p style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 16 }}>Пока нет избранных товаров — отмечайте их сердечком в каталоге.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 18, marginTop: 20 }}>
          {favProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={() => {}} onToggleFav={onToggleFav} isFav />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={glassCard({ padding: "18px 20px" })}>
      <div style={{ color: COLORS.textMuted, fontSize: 12.5, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 600, color: COLORS.goldSoft }}>{value}</div>
    </div>
  );
}
