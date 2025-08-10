# Overnerd Demo + Right-side Slanted Cover (BSV app)

Here’s a precise, copy-paste guide to add Overnerd and the right-side slanted cover in the BSV app.

## 1) Assets
Put Overnerd images in `public`:

```bash
cd /Users/b0ase/Projects/oneshotcomics-bsv
mkdir -p public/overnerd
cp -f /Users/b0ase/Projects/overnerd/overnerd-comic-images/covers/cover-31.jpg public/overnerd/cover.jpg
cp -f /Users/b0ase/Projects/overnerd/overnerd-comic-images/episode-01/{74.jpg,75.jpg,76.jpg,77.jpg,78.jpg,79.jpg,80.jpg,81.jpg,82.jpg,83.jpg} public/overnerd/
```

## 2) Reader page
Create `src/app/comics/overnerd/page.tsx`:

```tsx
'use client';

import ReactFlipbook from '@/components/ReactFlipbook';

const overnerdPages: string[] = [
  '/overnerd/cover.jpg',
  '/overnerd/74.jpg',
  '/overnerd/75.jpg',
  '/overnerd/76.jpg',
  '/overnerd/77.jpg',
  '/overnerd/78.jpg',
  '/overnerd/79.jpg',
  '/overnerd/80.jpg',
  '/overnerd/81.jpg',
  '/overnerd/82.jpg',
  '/overnerd/83.jpg',
];

export default function OvernerdReaderPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] pt-4 md:pt-6">
        <ReactFlipbook pages={overnerdPages} />
      </div>
    </div>
  );
}
```

## 3) Register in `/comics` (list + Read button)
Edit `src/app/comics/page.tsx`.

- Add Overnerd to the `sampleComics` array (near the top of the list is fine):

```ts
{
  id: 'overnerd-1',
  title: 'Overnerd: Episode 1 (Demo)',
  subtitle: 'A slice of the Overnerd comic demo',
  series: 'Overnerd',
  issue: 1,
  price: '0.00 BSV',
  author: 'Overnerd',
  artist: 'Overnerd',
  pages: 12,
  status: 'Published',
  cover_image: '/overnerd/cover.jpg',
  description: 'Demo flipbook sample from Overnerd. Not all pages included.',
  genre: 'Action',
  rating: 4.9,
  read_count: 0,
  created_at: '2024-01-02T00:00:00Z',
  updated_at: '2024-01-02T00:00:00Z'
},
```

- In the modal’s “Read Comic” button `onClick`, route Overnerd:

```ts
const path = selectedComic.id === 'npg-red-1' || selectedComic.series === 'NPG Red'
  ? '/comics/npg-red'
  : selectedComic.id === 'overnerd-1' || selectedComic.series === 'Overnerd'
  ? '/comics/overnerd'
  : '/comics';
```

## 4) Landing page right-side cover (mirrors left NPG)
Edit `src/app/page.tsx`. Replace the “Call to Action Button with Bouncing Comic” block with:

```tsx
{/* Call to Action Button with Bouncing Comic */}
<div className="mint-button-container">
  {/* Left: NPG Red */}
  <Link href="/comics/npg-red" className="inline-block">
    <div className="bouncing-comic">
      <img src="/images/cover-episode-1.jpg" alt="NPG Red Comic" className="bouncing-comic-image" />
      <div className="bouncing-comic-glow"></div>
    </div>
  </Link>

  {/* GO Button */}
  <Link href="/mint" className="inline-block">
    <div className="mint-dome-2d">
      <span className="mint-dome-text">GO</span>
      {/* Dome highlight */}
      <span className="dome-highlight"></span>
    </div>
  </Link>

  {/* Right: Overnerd (slanted right) */}
  <Link href="/comics/overnerd" className="inline-block">
    <div className="bouncing-comic bouncing-right">
      <img src="/overnerd/cover.jpg" alt="Overnerd Comic" className="bouncing-comic-image" />
      <div className="bouncing-comic-glow"></div>
    </div>
  </Link>
</div>
```

Edit `src/app/globals.css`. Add these rules (reuse your existing bouncing styles):

```css
/* Right-side variant */
.bouncing-right {
  margin-left: 4rem;      /* spacing between GO and right cover */
  margin-right: -22rem;   /* push outward to the right, mirroring left */
  transform: rotate(7deg);
}

@media (max-width: 768px) {
  .bouncing-right {
    margin-left: 2rem;
    margin-right: -6rem;
    transform: rotate(3deg);
  }
}
```

That reproduces the exact behavior: Overnerd demo at `/comics/overnerd`, listed on `/comics`, and a slanted bouncing Overnerd cover on the right of the GO button.

