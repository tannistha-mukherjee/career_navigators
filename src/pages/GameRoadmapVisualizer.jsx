import { useState } from 'react';

export default function GameRoadmapVisualizer() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState('map');

  const learningNodes = [
    { id: 'css', label: 'CSS Styling', number: 3, position: { top: '70px', left: '480px' }, size: { width: '60px', height: '60px' } },
    { id: 'responsive', label: 'Responsive Design', number: 7, position: { top: '130px', left: '340px' }, size: { width: '65px', height: '65px' } },
    { id: 'js', label: 'JavaScript Fundamentals', number: 5, position: { top: '210px', left: '280px' }, size: { width: '70px', height: '70px' } },
    { id: 'git', label: 'Git & Version Control', number: 6, position: { top: '290px', left: '180px' }, size: { width: '65px', height: '65px' } }
  ];

  const nodeLabels = [
    { id: 'css', position: { top: '40px', left: '450px' } },
    { id: 'responsive', position: { top: '100px', left: '370px' } },
    { id: 'js', position: { top: '175px', left: '145px' } },
    { id: 'git', position: { top: '260px', left: '75px' } }
  ];

  const connectionLines = [
    { id: 'css', position: { top: '95px', left: '450px' }, width: '60px', rotation: '45deg' },
    { id: 'responsive', position: { top: '155px', left: '350px' }, width: '80px', rotation: '-20deg' },
    { id: 'js', position: { top: '235px', left: '290px' }, width: '100px', rotation: '25deg' },
    { id: 'git', position: { top: '315px', left: '195px' }, width: '85px', rotation: '-35deg' },
    { id: 'frontend', position: { top: '275px', left: '380px' }, width: '70px', rotation: '15deg' }
  ];

  const navItems = [
    { id: 'map', icon: '🎯', label: 'MAP' },
    { id: 'events', icon: '🎁', label: 'EVENTS' },
    { id: 'social', icon: '👥', label: 'SOCIAL', badge: '2' },
    { id: 'pins', icon: '⭐', label: 'PINS' },
    { id: 'shop', icon: '🏆', label: 'SHOP' }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans" style={{ background: 'linear-gradient(120deg, #b7bfe7 0%, #e0c3fc 100%)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)` }} />

      {/* Curved green path */}
      <div className="absolute top-0 right-0 w-2/5 h-screen z-10" style={{ background: 'linear-gradient(180deg, #27ae60 0%, #2ecc71 30%, #58d68d 100%)', clipPath: 'ellipse(70% 100% at 100% 50%)', boxShadow: '0 0 40px 0 #27ae6044' }} />
      {/* Green path texture */}
      <div className="absolute top-0 right-0 w-2/5 h-screen z-20" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.13) 0%, transparent 2%, transparent 98%, rgba(255,255,255,0.13) 100%)', backgroundSize: '3px 100%', clipPath: 'ellipse(70% 100% at 100% 50%)' }} />

      {/* Learning path container */}
      <div className="absolute inset-0 z-30">
        {/* Connection lines */}
        {connectionLines.map((line) => (
          <div
            key={line.id}
            className="absolute h-1 rounded-full z-20"
            style={{
              top: line.position.top,
              left: line.position.left,
              width: line.width,
              transform: `rotate(${line.rotation})`,
              background: 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)',
              boxShadow: '0 2px 8px rgba(243,156,18,0.15)'
            }}
          />
        ))}

        {/* Node labels */}
        {nodeLabels.map((label) => {
          const node = learningNodes.find(n => n.id === label.id);
          return (
            <div
              key={label.id}
              className="absolute bg-white/95 px-5 py-2 rounded-full text-base font-semibold text-gray-800 shadow-xl whitespace-nowrap z-40 border border-gray-200"
              style={{
                top: label.position.top,
                left: label.position.left,
                letterSpacing: '0.02em',
                boxShadow: '0 2px 12px rgba(160,160,160,0.10)'
              }}
            >
              {node?.label}
            </div>
          );
        })}

        {/* Learning nodes */}
        {learningNodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-transform duration-300 hover:scale-110 z-30 shadow-lg"
            style={{
              top: node.position.top,
              left: node.position.left,
              width: node.size.width,
              height: node.size.height,
              background: 'linear-gradient(135deg, #6c7b7f 0%, #566a6f 100%)',
              boxShadow: hoveredNode === node.id ? '0 8px 24px rgba(44,62,80,0.25)' : '0 4px 15px rgba(44,62,80,0.15)',
              border: hoveredNode === node.id ? '2px solid #27ae60' : '2px solid #e0c3fc',
              transition: 'box-shadow 0.3s, border 0.3s'
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="text-xl" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
              🔒
            </div>
            <div className="absolute bottom-1 right-1 bg-slate-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
              {node.number}
            </div>
          </div>
        ))}

        {/* Frontend World - Active node */}
        <div 
          className="absolute flex items-center justify-center text-white text-lg font-bold cursor-pointer transition-transform duration-300 hover:scale-105 z-50"
          style={{
            top: '270px',
            left: '440px',
            width: '300px',
            height: '65px',
            background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
            borderRadius: '35px',
            boxShadow: '0 8px 25px rgba(142, 68, 173, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.04em',
            fontSize: '1.35rem'
          }}
        >
          <span className="mr-2 text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            👑
          </span>
          Frontend World
        </div>

        {/* Cursor pointer */}
        <div 
          className="absolute text-2xl text-white z-50 animate-pulse"
          style={{
            top: '280px',
            left: '520px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
        >
          👆
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around items-center z-50" style={{ background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 50%, #3498db 100%)', boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.18)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center text-white text-xs font-semibold transition-transform duration-300 hover:-translate-y-1 px-5 py-3 relative ${activeNavItem === item.id ? 'bg-white/10 shadow-lg rounded-xl' : ''}`}
            onClick={() => setActiveNavItem(item.id)}
            style={{ minWidth: '70px', minHeight: '60px', letterSpacing: '0.03em' }}
          >
            <div className="text-3xl mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              {item.icon}
            </div>
            <div>{item.label}</div>
            {item.badge && (
              <div className="absolute top-1 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" style={{ boxShadow: '0 2px 6px rgba(231, 76, 60, 0.4)' }}>
                {item.badge}
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}