// PPS 셀프사진관 — Extended Shared Components

const { useState, useEffect, useRef } = React;

// ── Logo ─────────────────────────────────────────────────────
window.Logo = function Logo({ dark = false, size = 'md' }) {
  const sz = size === 'lg' ? 24 : 18;
  const dot = size === 'lg' ? 9 : 7;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: dot, height: dot, borderRadius: '50%', background: '#FF3D8B', boxShadow: '0 0 8px rgba(255,61,139,0.5)' }} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: sz, fontWeight: 300, letterSpacing: '-0.04em', color: dark ? '#fff' : '#1A1714' }}>PPS</span>
      <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: sz - 5, fontWeight: 300, color: dark ? 'rgba(255,255,255,0.45)' : '#9A9590', marginLeft: 1 }}>셀프사진관</span>
    </div>
  );
};

// ── Nav ──────────────────────────────────────────────────────
window.Nav = function Nav({ activePage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: '홈', key: 'home' },
    { label: '포트폴리오', key: 'portfolio' },
    { label: '가격안내', key: 'pricing' },
    { label: '이용방법', key: 'guide' },
    { label: 'FAQ', key: 'faq' },
    { label: '오시는 길', key: 'location' },
  ];

  const goto = (k) => { setPage(k); setMenuOpen(false); };

  return (
    <React.Fragment>
      <nav className="pps-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? 'rgba(14,13,12,0.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ cursor: 'pointer' }} onClick={() => goto('home')}>
          <Logo dark size="md" />
        </div>

        {/* DESKTOP nav links — hidden on mobile via CSS */}
        <div className="pps-nav-desktop" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {links.map(l => (
            <span key={l.key} onClick={() => setPage(l.key)} style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: 13, fontWeight: activePage === l.key ? 600 : 400,
              color: activePage === l.key ? '#FF3D8B' : 'rgba(255,255,255,0.75)',
              cursor: 'pointer', transition: 'color 0.2s', letterSpacing: '0.01em',
            }}>{l.label}</span>
          ))}
          <button onClick={() => window.open('https://naver.me/IMyGdHlr', '_blank')} style={{
            background: '#FF3D8B', color: '#fff', border: 'none',
            borderRadius: 9999, padding: '9px 24px',
            fontFamily: "'Pretendard', sans-serif", fontSize: 13, fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 0 20px rgba(255,61,139,0.4)',
            transition: 'all 0.2s', letterSpacing: '0.02em',
          }}>예약하기</button>
        </div>

        {/* MOBILE hamburger — hidden on desktop via CSS */}
        <button className="pps-nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu" style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, width: 44, height: 38,
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, flexShrink: 0,
        }}>
          <div style={{ width: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ height: 2, background: '#F9F7F5', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none', transition: 'all 0.25s' }} />
            <span style={{ height: 2, background: '#F9F7F5', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
            <span style={{ height: 2, background: '#F9F7F5', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none', transition: 'all 0.25s' }} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="pps-nav-drawer" style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 199,
          background: 'rgba(14,13,12,0.98)', backdropFilter: 'blur(20px)',
          padding: '32px 20px', overflowY: 'auto',
          animation: 'fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map((l, i) => (
              <div key={l.key} onClick={() => goto(l.key)} style={{
                padding: '20px 4px', borderBottom: '1px solid rgba(255,255,255,0.07)',
                fontFamily: "'Pretendard', sans-serif",
                fontSize: 22, fontWeight: activePage === l.key ? 800 : 500,
                color: activePage === l.key ? '#FF3D8B' : '#F9F7F5',
                letterSpacing: '-0.02em', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>{l.label}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => { window.open('https://naver.me/IMyGdHlr', '_blank'); setMenuOpen(false); }} style={{
            marginTop: 28, width: '100%',
            background: '#FF3D8B', color: '#fff', border: 'none',
            borderRadius: 14, padding: '18px 24px',
            fontFamily: "'Pretendard', sans-serif", fontSize: 16, fontWeight: 800,
            cursor: 'pointer', boxShadow: '0 0 32px rgba(255,61,139,0.45)',
            letterSpacing: '-0.02em',
          }}>네이버 예약하기 →</button>
          <a href="http://pf.kakao.com/_xgxeIMxj/chat" target="_blank" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 10, width: '100%',
            background: '#FEE500', color: '#1A1714',
            borderRadius: 14, padding: '16px 24px',
            fontFamily: "'Pretendard', sans-serif", fontSize: 14, fontWeight: 700,
            textDecoration: 'none', letterSpacing: '-0.01em',
          }}>💬 카카오 상담하기</a>
        </div>
      )}
    </React.Fragment>
  );
};

// ── Badge / Label ────────────────────────────────────────────
window.Badge = function Badge({ children, color = 'pink' }) {
  const styles = {
    pink:  { background: 'rgba(255,61,139,0.12)', color: '#FF3D8B' },
    blue:  { background: 'rgba(0,191,255,0.12)', color: '#00BFFF' },
    white: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' },
    dark:  { background: '#1A1714', color: '#fff' },
    gray:  { background: '#F0EDE9', color: '#6A6560' },
  };
  return (
    <span style={{
      ...styles[color],
      display: 'inline-flex', alignItems: 'center',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
      textTransform: 'uppercase', borderRadius: 9999,
      padding: '4px 12px',
    }}>{children}</span>
  );
};

// ── Eyebrow Label ────────────────────────────────────────────
window.Eyebrow = function Eyebrow({ children, light = false }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 10, fontWeight: 600, letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,0.4)' : '#FF3D8B',
      marginBottom: 12,
    }}>{children}</div>
  );
};

// ── Button ───────────────────────────────────────────────────
window.Btn = function Btn({ children, variant = 'primary', onClick, size = 'md', href }) {
  const [hover, setHover] = useState(false);
  const sizes = { sm: '8px 20px', md: '12px 32px', lg: '16px 48px' };
  const fontSizes = { sm: 12, md: 14, lg: 15 };
  const variants = {
    cta: {
      background: hover ? '#E8006D' : '#FF3D8B', color: '#fff',
      boxShadow: hover ? '0 0 32px rgba(255,61,139,0.6)' : '0 0 20px rgba(255,61,139,0.4)',
      border: 'none',
    },
    primary: {
      background: hover ? 'rgba(255,255,255,0.15)' : 'transparent',
      color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: 'none',
    },
    secondary: {
      background: hover ? '#F0EDE9' : '#fff', color: '#1A1714',
      border: '1px solid #E8E4E0', boxShadow: 'none',
    },
    ghost: {
      background: 'transparent', color: 'rgba(255,255,255,0.6)',
      border: 'none', boxShadow: 'none',
    },
    dark: {
      background: hover ? '#2A2724' : '#1A1714', color: '#fff',
      border: 'none', boxShadow: 'none',
    },
  };
  const v = variants[variant] || variants.cta;
  const handleClick = href ? () => window.open(href, '_blank') : onClick;
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...v,
        borderRadius: 9999, padding: sizes[size],
        fontFamily: "'Pretendard', sans-serif",
        fontSize: fontSizes[size], fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        transform: hover ? 'translateY(-2px)' : 'none',
        letterSpacing: '0.02em',
      }}
    >{children}</button>
  );
};

// ── Photo Placeholder ─────────────────────────────────────────
window.PhotoPlaceholder = function PhotoPlaceholder({ w, h, label, style = {} }) {
  return (
    <div style={{
      width: w || '100%', height: h || 300,
      background: 'linear-gradient(160deg, #1e1c1a 0%, #2a2724 50%, #1a1714 100%)',
      borderRadius: 4,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.12)', fontSize: 11, letterSpacing: '0.1em',
      border: '1px solid rgba(255,255,255,0.05)',
      ...style,
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" style={{ marginBottom: 8 }}>
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      {label && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: '0.08em' }}>{label}</span>}
    </div>
  );
};

// ── Footer ───────────────────────────────────────────────────
window.Footer = function Footer({ setPage }) {
  const links = [
    { label: '홈', key: 'home' },
    { label: '포트폴리오', key: 'portfolio' },
    { label: '가격안내', key: 'pricing' },
    { label: '이용방법', key: 'guide' },
    { label: 'FAQ', key: 'faq' },
    { label: '오시는 길', key: 'location' },
  ];
  return (
    <footer style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <Logo dark size="md" />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 16, lineHeight: 1.9, fontFamily: "'Pretendard', sans-serif" }}>
              사진가와 마주하는 부담 없이<br />편안하게 촬영하시고,<br />완성도 높은 사진만 남기세요.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>MENU</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(l => (
                <span key={l.key} onClick={() => setPage && setPage(l.key)} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: "'Pretendard',sans-serif", transition: 'color 0.2s' }}>{l.label}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="https://www.instagram.com/pps_studio_/" target="_blank" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: "'Pretendard',sans-serif" }}>Instagram @pps_studio_</a>
              <a href="http://pf.kakao.com/_xgxeIMxj/chat" target="_blank" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: "'Pretendard',sans-serif" }}>카카오채널 상담</a>
              <a href="https://naver.me/IMyGdHlr" target="_blank" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: "'Pretendard',sans-serif" }}>네이버 예약</a>
            </div>
            <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.8, fontFamily: "'Pretendard',sans-serif" }}>
              대전광역시 중구 대전천서로 475<br />중앙타워빌딩 8층<br />운영시간 10:00 – 21:00
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 24px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans',sans-serif" }}>© 2025 PPS 셀프사진관. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="https://www.instagram.com/pps_studio_/" target="_blank" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: 11, fontFamily: "'DM Sans',sans-serif" }}>Instagram</a>
            <a href="http://pf.kakao.com/_xgxeIMxj/chat" target="_blank" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: 11, fontFamily: "'DM Sans',sans-serif" }}>Kakao</a>
            <a href="https://naver.me/IMyGdHlr" target="_blank" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: 11, fontFamily: "'DM Sans',sans-serif" }}>Naver</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ── Floating Contact Bar ──────────────────────────────────────
window.FloatingContact = function FloatingContact() {
  const [hover, setHover] = useState(null);
  const btns = [
    { label: '네이버 예약', color: '#03C75A', href: 'https://naver.me/IMyGdHlr', icon: 'N' },
    { label: '카카오 상담', color: '#FEE500', textColor: '#1A1714', href: 'http://pf.kakao.com/_xgxeIMxj/chat', icon: 'K' },
    { label: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/pps_studio_/', icon: '◎' },
  ];
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {btns.map((b, i) => (
        <a key={i} href={b.href} target="_blank"
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: b.color, color: b.textColor || '#fff',
            borderRadius: 9999, padding: hover === i ? '10px 20px' : '10px 12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            textDecoration: 'none', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
            overflow: 'hidden', whiteSpace: 'nowrap',
          }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{b.icon}</span>
          <span style={{ fontFamily: "'Pretendard',sans-serif", fontSize: 12, fontWeight: 600, maxWidth: hover === i ? 80 : 0, overflow: 'hidden', transition: 'max-width 0.25s' }}>{b.label}</span>
        </a>
      ))}
    </div>
  );
};

// ── Fade-in Hook ─────────────────────────────────────────────
window.useFadeIn = function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

window.FadeIn = function FadeIn({ children, delay = 0, style = {} }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      ...style,
    }}>{children}</div>
  );
};

Object.assign(window, { Logo, Nav, Badge, Eyebrow, Btn, PhotoPlaceholder, Footer, FloatingContact, useFadeIn, FadeIn });
