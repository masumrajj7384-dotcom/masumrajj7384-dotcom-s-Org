import fs from 'fs';
let code = fs.readFileSync('app/static/style.css', 'utf8');

const additions = `
/* News Component Styles */
.news-filter-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.news-filter-btn.active, .news-filter-btn:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border-color: rgba(255,255,255,0.3);
}
.news-feed-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.news-card {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}
.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  border-color: rgba(255,255,255,0.1);
}
.news-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.75rem;
}
.news-source-badge {
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
}
.source-yahoo { background: rgba(168, 85, 247, 0.4); border: 1px solid #a855f7; }
.source-mc { background: rgba(59, 130, 246, 0.4); border: 1px solid #3b82f6; }
.source-mint { background: rgba(249, 115, 22, 0.4); border: 1px solid #f97316; }
.source-et { background: rgba(239, 68, 68, 0.4); border: 1px solid #ef4444; }
.source-default { background: rgba(107, 114, 128, 0.4); border: 1px solid #6b7280; }

.news-time {
  color: var(--text-muted);
}
.news-headline {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.4;
}
.news-headline a {
  color: inherit;
  text-decoration: none;
}
.news-headline a:hover {
  color: var(--accent-blue);
  text-decoration: underline;
}
.news-summary {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 10px 0;
}
.news-sentiment {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}
.tag-bullish { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
.tag-bearish { background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); }
.tag-moving { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
.tag-neutral { background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); }

/* Shimmer Loader */
.news-shimmer {
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  padding: 15px;
  position: relative;
  overflow: hidden;
  height: 100px;
  margin-bottom: 10px;
}
.news-shimmer::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  animation: newsSweep 1.5s infinite linear;
}
@keyframes newsSweep {
  to { left: 200%; }
}
`;

code = code + '\n' + additions;
fs.writeFileSync('app/static/style.css', code);
console.log("news css patched");
