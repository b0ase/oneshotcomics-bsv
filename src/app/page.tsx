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
          
          {/* Call to Action Button */}
          <div className="mint-button-container">
            <Link href="/mint" className="inline-block">
              <div className="mint-dome-2d">
                <span className="mint-dome-text">GO</span>
                {/* Dome highlight */}
                <span className="dome-highlight"></span>
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
