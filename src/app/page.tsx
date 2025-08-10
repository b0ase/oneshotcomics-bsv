import Link from "next/link";
import SharedBackground from "@/components/SharedBackground";

export default function HomePage() {
  return (
    <SharedBackground>
      {/* Hero Section */}
      <div className="landing-page-container">
        {/* Centered content */}
        <div className="landing-page-content">
          {/* Main Heading */}
          <h1 className="landing-page-title">
            ONE SHOT COMICS
          </h1>
          
          {/* BSV Version Subtitle */}
          <div className="bsv-version-subtitle">
            BSV Version
          </div>
          
          {/* Subheading */}
          <h2 className="landing-page-subtitle">
            Mint an entire comic in ONE SHOT!
          </h2>
          
          {/* Description */}
          <div className="landing-page-description">
            Hit <span className="go-text">GO</span> to instantly create a full, unique comic NFT. No waiting, no hassle—just pure comic magic!
          </div>
          
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
          
          {/* Wallet connection call */}
          <div className="wallet-connect-call">
            Connect your wallet to mint your comic!
          </div>
        </div>
      </div>
    </SharedBackground>
  );
}
