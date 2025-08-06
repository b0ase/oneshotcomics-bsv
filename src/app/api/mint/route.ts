import { NextResponse } from 'next/server';
import { createNFT, getMintingStats } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { comicId, quantity, walletAddress } = body;
    
    // Validate input
    if (!comicId || !quantity || !walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate quantity
    if (quantity < 1 || quantity > 10) {
      return NextResponse.json(
        { success: false, error: 'Quantity must be between 1 and 10' },
        { status: 400 }
      );
    }
    
    // Mock blockchain transaction - in real app, this would call smart contract
    const mintedNFTs = [];
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    for (let i = 0; i < quantity; i++) {
      const tokenId = Math.floor(Math.random() * 10000);
             const rarity = ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)] as 'Common' | 'Rare' | 'Epic' | 'Legendary';
      
      const nft = await createNFT({
        comic_id: comicId,
        token_id: tokenId.toString(),
        wallet_address: walletAddress,
        minted_at: new Date().toISOString(),
        transaction_hash: transactionHash,
        status: 'minted',
        rarity
      });
      
      if (nft) {
        mintedNFTs.push(nft);
      }
    }
    
    if (mintedNFTs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to mint NFTs' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        mintedNFTs,
        transactionHash,
        gasUsed: Math.floor(Math.random() * 100000) + 50000
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in POST /api/mint:', error);
    return NextResponse.json(
      { success: false, error: 'Minting failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await getMintingStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in GET /api/mint:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch minting data' },
      { status: 500 }
    );
  }
} 