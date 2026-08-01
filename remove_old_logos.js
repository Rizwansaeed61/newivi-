const fs = require('fs');
const file = '/app/applet/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetRegex = /const renderDomainBrandVector =[\s\S]*?const DomainLogoImage =[^]*?<\/div>\s*\);\s*};/m;

const replacement = `const DomainLogoImage = ({ domain, logoUrl, alt, className = "w-9 h-9" }: { domain?: string; logoUrl?: string; alt: string; className?: string }) => {
  const [imgErrorLevel, setImgErrorLevel] = useState(0);
  
  const cleanDomain = domain ? domain.replace(/^https?:\\/\\//, '').replace(/\\/.*$/, '').trim() : '';

  const getInitials = (name: string) => {
    if (!name) return 'W';
    const parts = name.trim().split(/\\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const containerClasses = \`\${className} rounded-2xl bg-[#15120E] border border-[#2C2419] flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-[0_0_20px_rgba(229,149,0,0.15)] group-hover:shadow-[0_0_30px_rgba(229,149,0,0.35)] group-hover:border-[#E59500]/60 transition-all duration-300\`;

  // Sources to try in order
  const sources = [];
  if (logoUrl && logoUrl.trim() !== '') {
    sources.push(logoUrl);
  }
  if (cleanDomain) {
    sources.push(\`https://logo.clearbit.com/\${cleanDomain}\`);
    sources.push(\`https://www.google.com/s2/favicons?domain=\${cleanDomain}&sz=128\`);
    sources.push(\`https://icon.horse/icon/\${cleanDomain}\`);
  }

  const currentSrc = sources[imgErrorLevel];

  return (
    <div className={containerClasses}>
      {currentSrc ? (
        <img loading="lazy"
          src={currentSrc}
          alt={alt || domain || 'Client Logo'}
          className="w-full h-full object-contain rounded-xl"
          onError={() => setImgErrorLevel(prev => prev + 1)}
        />
      ) : (
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#E59500]/25 to-[#E59500]/5 flex items-center justify-center font-bold text-[#E59500] text-lg tracking-wider select-none font-mono">
          {getInitials(alt || cleanDomain)}
        </div>
      )}
    </div>
  );
};`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(file, content);
  console.log("Patched!");
} else {
  console.log("Could not find regex match!");
}
