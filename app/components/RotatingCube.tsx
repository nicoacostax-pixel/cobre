'use client'

export default function RotatingCube() {
  const size = 46
  const gap  = 4
  const step = size + gap   // 50
  const half = size / 2     // 23

  // Monochromatic copper/orange metallic palette — simulates a fixed light from top-right
  const face = {
    top:    'linear-gradient(145deg, #ffb060 0%, #d06020 100%)',
    front:  'linear-gradient(145deg, #e87030 0%, #b84010 100%)',
    right:  'linear-gradient(145deg, #f09050 0%, #d06020 100%)',
    left:   'linear-gradient(145deg, #b84010 0%, #882800 100%)',
    back:   'linear-gradient(145deg, #883000 0%, #601800 100%)',
    bottom: 'linear-gradient(145deg, #602000 0%, #3a0e00 100%)',
    inner:  '#141414',
  }

  const idx = [-1, 0, 1]

  // Split cubelets into 3 horizontal layers (yi groups)
  const layers = idx.map(yi => ({
    yi,
    cubelets: idx.flatMap(xi => idx.map(zi => ({ xi, zi }))),
  }))

  return (
    <>
      <style>{`
        /* ── Overall cube spin ── */
        @keyframes rubikSpin {
          0%   { transform: rotateX(-22deg) rotateY(0deg);   }
          25%  { transform: rotateX(-26deg) rotateY(90deg);  }
          50%  { transform: rotateX(-22deg) rotateY(180deg); }
          75%  { transform: rotateX(-26deg) rotateY(270deg); }
          100% { transform: rotateX(-22deg) rotateY(360deg); }
        }

        /* ── Individual layer rotation (Rubik's move) ──
           Pure rotateY — the cubelets handle their own Y offset via translateY.
           Each layer starts offset in the timeline so they move one at a time. */
        @keyframes layerTurn {
          0%   { transform: rotateY(0deg);    }
          10%  { transform: rotateY(90deg);   }
          38%  { transform: rotateY(90deg);   }
          48%  { transform: rotateY(0deg);    }
          76%  { transform: rotateY(0deg);    }
          86%  { transform: rotateY(-90deg);  }
          100% { transform: rotateY(-90deg);  }
        }

        .rubiks-scene {
          perspective: 900px;
          perspective-origin: 50% 45%;
        }
        .rubiks-cube {
          position: relative;
          transform-style: preserve-3d;
          animation: rubikSpin 12s linear infinite;
        }
        /* Each layer div sits at the cube's 3D centre so rotateY orbits
           cubelets around the global Y axis */
        .layer {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          animation: layerTurn 9s ease-in-out infinite;
        }
        .layer-0 { animation-delay:  0s;  }
        .layer-1 { animation-delay: -3s;  }
        .layer-2 { animation-delay: -6s;  }

        .cubelet {
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          margin-left: -${half}px;
          margin-top:  -${half}px;
          transform-style: preserve-3d;
        }
        .face {
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border: 2.5px solid #0a0a0a;
          box-sizing: border-box;
          border-radius: 3px;
        }
      `}</style>

      <div className="rubiks-scene flex items-center justify-center w-full py-10 lg:py-0">
        <div style={{ filter: 'drop-shadow(0 0 60px rgba(200,80,10,0.55))' }}>
          <div
            className="rubiks-cube"
            style={{ width: `${step * 3 - gap}px`, height: `${step * 3 - gap}px` }}
          >
            {layers.map(({ yi, cubelets }, li) => (
              <div key={yi} className={`layer layer-${li}`}>
                {cubelets.map(({ xi, zi }, i) => (
                  <div
                    key={i}
                    className="cubelet"
                    style={{
                      transform: `translateX(${xi * step}px) translateY(${yi * step}px) translateZ(${zi * step}px)`,
                    }}
                  >
                    {/* Front */}
                    <div className="face" style={{ background: zi === 1  ? face.front  : face.inner, transform: `translateZ(${half}px)` }} />
                    {/* Back */}
                    <div className="face" style={{ background: zi === -1 ? face.back   : face.inner, transform: `rotateY(180deg) translateZ(${half}px)` }} />
                    {/* Right */}
                    <div className="face" style={{ background: xi === 1  ? face.right  : face.inner, transform: `rotateY(90deg) translateZ(${half}px)` }} />
                    {/* Left */}
                    <div className="face" style={{ background: xi === -1 ? face.left   : face.inner, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
                    {/* Top */}
                    <div className="face" style={{ background: yi === -1 ? face.top    : face.inner, transform: `rotateX(90deg) translateZ(${half}px)` }} />
                    {/* Bottom */}
                    <div className="face" style={{ background: yi === 1  ? face.bottom : face.inner, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
