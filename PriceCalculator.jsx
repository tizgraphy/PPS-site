// PPS 셀프사진관 — Price Calculator Component

function PriceCalculator() {
  const { useState } = React;
  const [count, setCount] = useState(2);
  const [withPhotographer, setWithPhotographer] = useState(false);

  // 정확한 요금 계산
  // 기본: 2인 60,000원
  // 3~5인: 1인 추가당 +15,000원
  // 6인~: 1인 추가당 +10,000원
  // 작가 촬영 옵션: +50,000원 (별도)
  const calcBase = (n) => {
    // 최소 2인부터 — 1인 ID는 별도 상품
    if (n === 2) return 60000;
    if (n <= 5) return 60000 + (n - 2) * 15000;
    return 60000 + 3 * 15000 + (n - 5) * 10000;
  };

  const PHOTOGRAPHER_FEE = 50000;

  const base = calcBase(count);
  const photographerFee = withPhotographer ? PHOTOGRAPHER_FEE : 0;
  const total = base + photographerFee;
  const perPerson = Math.round(total / count);

  const getPkgLabel = (n) => {
    // 1인 ID는 별도 상품이라 계산기에서는 다루지 않음 (최소 2인 시작)
    if (n <= 5) return { tag:'기본 촬영', color:'#FF3D8B', name:'기본 촬영 패키지', desc:'셀프 촬영 + 전문 보정' };
    return { tag:'단체 촬영', color:'#7BB8E8', name:'단체 촬영 패키지', desc:'6인 이상 단체 무제한 셀프 촬영' };
  };

  const getTip = (n) => {
    
    if (n === 2) return '2인 기본 요금 60,000원! 다양한 포즈와 컨셉으로 자유롭게 촬영해보세요.';
    if (n <= 5) return n + '인 기준 1인당 ' + Math.round(calcBase(n)/n).toLocaleString() + '원이에요. 친구끼리 오면 더 합리적!';
    if (n < 20) return '6인 이상은 1인 추가당 10,000원! 인원이 많을수록 1인당 부담이 줄어요.';
    return '20명 이상 대규모 단체는 지하 1층 대형호리존 이용 가능! 카카오채널로 사전 문의해 주세요.';
  };

  const pkg = getPkgLabel(count);

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 80px 48px' }}>
      <div style={{
        background:'linear-gradient(135deg,rgba(255,61,139,0.08) 0%,rgba(0,191,255,0.05) 100%)',
        border:'1px solid rgba(255,61,139,0.2)', borderRadius:24, padding:'48px 48px',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,61,139,0.07)', filter:'blur(60px)', pointerEvents:'none' }} />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', position:'relative' }}>

          {/* ── LEFT: input ── */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#FF3D8B', boxShadow:'0 0 10px rgba(255,61,139,0.5)' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>PRICE CALCULATOR</span>
            </div>
            <div style={{ fontFamily:"'Pretendard',sans-serif", fontWeight:900, fontSize:'clamp(28px,3vw,40px)', color:'#F9F7F5', letterSpacing:'-0.04em', lineHeight:1.1, marginBottom:8 }}>
              몇 명이 오세요?
            </div>
            <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:13, color:'rgba(255,255,255,0.35)', marginBottom:32 }}>
              인원수를 입력하면 맞는 패키지와 예상 금액을 바로 알려드려요
            </div>

            {/* +/- stepper */}
            <div style={{ display:'flex', alignItems:'center', marginBottom:24 }}>
              <button onClick={() => setCount(Math.max(2, count - 1))} style={{ width:52, height:52, borderRadius:'12px 0 0 12px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#F9F7F5', fontSize:22, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
              <input type="number" min="2" max="100" value={count}
                onChange={e => setCount(Math.max(2, Math.min(100, parseInt(e.target.value) || 2)))}
                style={{ flex:1, height:52, textAlign:'center', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', borderLeft:'none', borderRight:'none', outline:'none', fontFamily:"'DM Sans',sans-serif", fontSize:28, fontWeight:600, color:'#F9F7F5' }} />
              <div style={{ height:52, padding:'0 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderLeft:'none', borderRight:'none', display:'flex', alignItems:'center' }}>
                <span style={{ fontFamily:"'Pretendard',sans-serif", fontSize:13, color:'rgba(255,255,255,0.3)' }}>명</span>
              </div>
              <button onClick={() => setCount(Math.min(100, count + 1))} style={{ width:52, height:52, borderRadius:'0 12px 12px 0', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#F9F7F5', fontSize:22, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
            </div>

            {/* Quick presets */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 }}>
              {[2,3,4,5,6,10,15,20,30].map(n => (
                <button key={n} onClick={() => setCount(n)} style={{
                  padding:'6px 14px', borderRadius:9999,
                  fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                  background: count === n ? '#FF3D8B' : 'rgba(255,255,255,0.06)',
                  color: count === n ? '#fff' : 'rgba(255,255,255,0.45)',
                  border: count === n ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: count === n ? '0 0 12px rgba(255,61,139,0.4)' : 'none',
                }}>{n}명</button>
              ))}
            </div>

            {/* 작가 촬영 옵션 */}
            <div
              onClick={() => setWithPhotographer(!withPhotographer)}
              style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'16px 20px', borderRadius:14, cursor:'pointer',
                background: withPhotographer ? 'rgba(255,61,139,0.12)' : 'rgba(255,255,255,0.04)',
                border: withPhotographer ? '1px solid rgba(255,61,139,0.4)' : '1px solid rgba(255,255,255,0.1)',
                transition:'all 0.2s',
              }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color: withPhotographer ? '#FF3D8B' : 'rgba(255,255,255,0.3)' }}>ADD-ON</span>
                </div>
                <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:15, fontWeight:700, color:'#F9F7F5', marginBottom:2 }}>작가 촬영 옵션</div>
                <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:12, color:'rgba(255,255,255,0.4)' }}>혼자 찍기 어색한 분들을 위한 전담 작가 촬영 +50,000원</div>
              </div>
              <div style={{
                width:28, height:28, borderRadius:'50%', flexShrink:0,
                background: withPhotographer ? '#FF3D8B' : 'rgba(255,255,255,0.1)',
                border: withPhotographer ? 'none' : '1px solid rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:14, color:'#fff', transition:'all 0.2s',
                boxShadow: withPhotographer ? '0 0 12px rgba(255,61,139,0.5)' : 'none',
              }}>{withPhotographer ? '✓' : '+'}</div>
            </div>
          </div>

          {/* ── RIGHT: result ── */}
          <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:20, padding:'32px 36px', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.06)', borderRadius:9999, padding:'5px 14px', marginBottom:20 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:pkg.color }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:pkg.color }}>{pkg.tag}</span>
            </div>
            <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:18, fontWeight:800, color:'#F9F7F5', marginBottom:4, letterSpacing:'-0.02em' }}>{pkg.name}</div>
            <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:28 }}>{pkg.desc}</div>

            {/* Price breakdown */}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:20, marginBottom:20 }}>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'Pretendard',sans-serif", fontSize:13, color:'rgba(255,255,255,0.45)' }}>
                  <span>기본 요금 ({count}인)</span>
                  <span>{base.toLocaleString()}원</span>
                </div>
                {withPhotographer && (
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'Pretendard',sans-serif", fontSize:13, color:'#FF3D8B' }}>
                    <span>작가 촬영 옵션</span>
                    <span>+{PHOTOGRAPHER_FEE.toLocaleString()}원</span>
                  </div>
                )}
                <div style={{ height:1, background:'rgba(255,255,255,0.07)', margin:'4px 0' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>총 금액</span>
                  <div style={{ display:'flex', alignItems:'baseline', gap:2 }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:42, fontWeight:300, color:'#F9F7F5', letterSpacing:'-0.05em', lineHeight:1 }}>{total.toLocaleString()}</span>
                    <span style={{ fontFamily:"'Pretendard',sans-serif", fontSize:14, color:'rgba(255,255,255,0.4)' }}>원</span>
                  </div>
                </div>
                <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:12, color:'rgba(255,255,255,0.3)', textAlign:'right' }}>
                  {'1인당 약 '}<strong style={{ color:pkg.color }}>{perPerson.toLocaleString()}원</strong>
                </div>
              </div>
            </div>

            {/* 2인 프라이빗 패키지 추천 배너 */}
            {count === 2 && (
              <div style={{ background:'linear-gradient(135deg,rgba(244,167,192,0.15) 0%,rgba(255,61,139,0.08) 100%)', border:'1px solid rgba(244,167,192,0.35)', borderRadius:12, padding:'14px 16px', marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
                  <div>
                    <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:13, fontWeight:800, color:'#F4A7C0', marginBottom:4, letterSpacing:'-0.01em' }}>프라이빗 패키지 추천!</div>
                    <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:12, color:'rgba(255,255,255,0.6)', lineHeight:1.7 }}>
                      2컨셉 각각 촬영 시 <strong style={{ color:'rgba(255,255,255,0.85)', textDecoration:'line-through' }}>120,000원</strong>이지만<br/>
                      프라이빗 패키지로 선택하면 <strong style={{ color:'#FF3D8B' }}>100,000원</strong> — <strong style={{ color:'#FFD050' }}>20,000원 절약</strong> + 보정 1컷 추가!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tip */}
            <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'12px 16px', marginBottom:20, borderLeft:'3px solid ' + pkg.color }}>
              <div style={{ fontFamily:"'Pretendard',sans-serif", fontSize:12, color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>{getTip(count)}</div>
            </div>

            {/* CTA */}
            <a href="https://naver.me/IMyGdHlr" target="_blank" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#FF3D8B', color:'#fff', borderRadius:12, padding:'14px 20px', fontFamily:"'Pretendard',sans-serif", fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 0 20px rgba(255,61,139,0.35)' }}>
              <span>지금 예약하기</span>
              <span style={{ fontSize:18 }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PriceCalculator });
