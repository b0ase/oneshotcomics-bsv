// Marketplace API for 1Sat.Market integration and BSV price feeds

export interface BSVPriceData {
  usd: number;
  gbp: number;
  eur: number;
  last_updated: string;
}

export interface InvestmentOffering {
  investor: number;
  investmentCostUSD: number;
  investmentCostBSV: number;
  investmentCostGBP: number;
  tokenReward: number;
  costPerTokenUSD: number;
  costPerTokenBSV: number;
  costPerTokenGBP: number;
  individualEquity: number;
  nftComic: 'Rare NFT' | 'Standard';
  status: 'available' | 'sold';
  bsvPrice: number;
}

export interface MarketListing {
  id: string;
  tokenId: string;
  price: number;
  currency: 'BSV' | 'USD';
  seller: string;
  status: 'active' | 'sold';
  createdAt: string;
}

// BSV Price Feed API
export async function getBSVPrice(): Promise<BSVPriceData> {
  try {
    // Try CoinGecko API first (free, reliable)
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-sv,bsv&vs_currencies=usd,gbp,eur&include_last_updated_at=true');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('CoinGecko API error response:', errorText);
      throw new Error(`CoinGecko API failed with status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('CoinGecko API response:', data);
    
    // Try different possible IDs for Bitcoin SV
    let bsvData = data['bitcoin-sv'] || data['bsv'];
    console.log('BSV data extracted:', bsvData);
    
    if (!bsvData || !bsvData.usd) {
      console.error('Invalid BSV data structure:', bsvData);
      console.error('Available keys in response:', Object.keys(data));
      throw new Error('Invalid data structure from CoinGecko API');
    }
    
    console.log('Live BSV price fetched:', bsvData);
    
    return {
      usd: bsvData.usd,
      gbp: bsvData.gbp,
      eur: bsvData.eur,
      last_updated: new Date(bsvData.last_updated_at * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error fetching BSV price from CoinGecko:', error);
    
    // Try alternative API as backup
    try {
      console.log('Trying alternative price API...');
      const altResponse = await fetch('https://api.coinpaprika.com/v1/tickers/bsv-bitcoin-sv');
      
      if (!altResponse.ok) {
        throw new Error(`Alternative API failed with status: ${altResponse.status}`);
      }
      
      const altData = await altResponse.json();
      const usdPrice = parseFloat(altData.quotes.USD.price);
      const gbpPrice = parseFloat(altData.quotes.GBP.price);
      const eurPrice = parseFloat(altData.quotes.EUR.price);
      
      if (isNaN(usdPrice) || isNaN(gbpPrice) || isNaN(eurPrice)) {
        throw new Error('Invalid price data from alternative API');
      }
      
      console.log('Live BSV price fetched from alternative API:', { usd: usdPrice, gbp: gbpPrice, eur: eurPrice });
      
      return {
        usd: usdPrice,
        gbp: gbpPrice,
        eur: eurPrice,
        last_updated: new Date().toISOString()
      };
    } catch (altError) {
      console.error('All price APIs failed:', altError);
      throw new Error('Unable to fetch live BSV price from any available API');
    }
  }
}

// Convert USD to BSV using current price
export function convertUSDToBSV(usdAmount: number, bsvPriceUSD: number): number {
  return usdAmount / bsvPriceUSD;
}

// Convert BSV to USD using current price
export function convertBSVToUSD(bsvAmount: number, bsvPriceUSD: number): number {
  return bsvAmount * bsvPriceUSD;
}

// 1Sat.Market API Integration
export async function get1SatMarketListings(tokenId?: string): Promise<MarketListing[]> {
  try {
    // 1Sat.Market API endpoint (you'll need to check their actual API)
    const baseUrl = 'https://1sat.market/api';
    const endpoint = tokenId ? `/listings/${tokenId}` : '/listings';
    
    const response = await fetch(`${baseUrl}${endpoint}`);
    
    if (!response.ok) {
      throw new Error('1Sat.Market API failed');
    }
    
    const data = await response.json();
    return data.listings || [];
  } catch (error) {
    console.error('Error fetching 1Sat.Market listings:', error);
    
    // Return mock data for development
    return [
      {
        id: '1',
        tokenId: '23dd256ff07c30cd8fb3cd0c3f6891292044e6dc431e87c3f32208140b77da64_1',
        price: 0.0001,
        currency: 'BSV',
        seller: '1HNcvDZNosbxWeB9grD769u3bAKYNKRHTs',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ];
  }
}

// Create investment offerings with live BSV pricing
export async function createInvestmentOfferings(tokenomicsData: any[]): Promise<InvestmentOffering[]> {
  try {
    // Get current BSV price
    const bsvPriceData = await getBSVPrice();
    
    // Create investment offerings
    const offerings: InvestmentOffering[] = tokenomicsData.map((item, index) => {
      const investmentCostBSV = convertUSDToBSV(item.investmentCost, bsvPriceData.usd);
      const costPerTokenBSV = convertUSDToBSV(item.costPerToken, bsvPriceData.usd);
      
      return {
        investor: item.investor,
        investmentCostUSD: item.investmentCost,
        investmentCostBSV: investmentCostBSV,
        investmentCostGBP: item.investmentCost * bsvPriceData.gbp / bsvPriceData.usd,
        tokenReward: item.tokenReward,
        costPerTokenUSD: item.costPerToken,
        costPerTokenBSV: costPerTokenBSV,
        costPerTokenGBP: item.costPerToken * bsvPriceData.gbp / bsvPriceData.usd,
        individualEquity: item.individualEquity,
        nftComic: item.investor <= 233 ? 'Rare NFT' : 'Standard',
        status: 'available',
        bsvPrice: bsvPriceData.usd
      };
    });
    
    return offerings;
  } catch (error) {
    console.error('Error creating investment offerings:', error);
    throw new Error('Failed to create investment offerings: Unable to fetch live BSV price');
  }
}

// Submit investment to 1Sat.Market
export async function submitInvestmentToMarket(
  offering: InvestmentOffering,
  buyerAddress: string,
  walletProvider: any
): Promise<{ success: boolean; txid?: string; error?: string }> {
  try {
    // Create the transaction
    const transaction = {
      to: '1Sat.Market_Contract_Address', // You'll need the actual contract address
      amount: offering.investmentCostBSV.toString(),
      data: JSON.stringify({
        type: 'investment',
        investor: offering.investor,
        tokenReward: offering.tokenReward,
        buyerAddress: buyerAddress
      })
    };
    
    // Send transaction through wallet
    const txid = await walletProvider.sendTransaction(transaction);
    
    return {
      success: true,
      txid: txid
    };
  } catch (error) {
    console.error('Error submitting investment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get market statistics
export async function getMarketStats(): Promise<{
  totalInvestors: number;
  totalRaisedUSD: number;
  totalRaisedBSV: number;
  averageInvestmentUSD: number;
  averageInvestmentBSV: number;
  bsvPrice: number;
}> {
  try {
    const bsvPriceData = await getBSVPrice();
    
    // This would typically come from your database or 1Sat.Market API
    const stats = {
      totalInvestors: 0,
      totalRaisedUSD: 0,
      totalRaisedBSV: 0,
      averageInvestmentUSD: 0,
      averageInvestmentBSV: 0,
      bsvPrice: bsvPriceData.usd
    };
    
    return stats;
  } catch (error) {
    console.error('Error fetching market stats:', error);
    throw new Error('Failed to fetch market stats: Unable to fetch live BSV price');
  }
}
