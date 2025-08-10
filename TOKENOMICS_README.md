# $1SHOT Tokenomics Page

## Overview
The tokenomics page provides a comprehensive view of the One-Shot Comics tokenomics model, displaying investment data, charts, and key metrics in an interactive and visually appealing interface.

## Features

### 📊 Interactive Charts
- **Investment Cost Trend**: Shows how investment costs change over time
- **Cost Per Token Trend**: Displays the dynamic pricing model (scaled for better visualization)
- **Cumulative Raised vs Treasury Value**: Compares total funds raised against treasury growth
- **Equity Distribution**: Pie chart showing the top 10 investors' equity distribution

### 📈 Key Metrics Dashboard
- **Total Investors**: Number of participants in the tokenomics model
- **Total Raised**: Cumulative investment amount
- **Treasury Value**: Current treasury value
- **Tokens Distributed**: Total tokens allocated to investors

### 🔍 Interactive Data Table
- **Search & Filter**: Find specific investors by number
- **Pagination**: Navigate through large datasets efficiently
- **Sortable Columns**: All data columns are sortable
- **Responsive Design**: Works seamlessly on desktop and mobile

### 📱 Mobile Responsive
- Optimized for all screen sizes
- Touch-friendly interface
- Collapsible navigation
- Responsive charts and tables

## Data Structure

The page reads from `/public/tokenomics.csv` with the following columns:

| Column | Description | Type |
|--------|-------------|------|
| Investor (n) | Investor number | Integer |
| Investment Cost P(n) (USD) | Individual investment amount | Decimal |
| Token Reward R(n) | Tokens allocated to investor | Integer |
| Cost Per Token C(n) (USD) | Price per token for this investment | Decimal |
| Individual Equity (%) | Percentage of total supply | Decimal |
| Collective Equity (%) | Cumulative equity percentage | Decimal |
| Cumulative Raised (USD) | Total funds raised to date | Decimal |
| Treasury Value (USD) | Treasury value at this point | Decimal |

## Technical Implementation

### Dependencies
- **React**: Frontend framework
- **Next.js**: Full-stack framework
- **Recharts**: Chart library for data visualization
- **TypeScript**: Type safety

### Key Components
- **TokenomicsPage**: Main page component
- **Interactive Charts**: Line charts and pie charts
- **Data Table**: Paginated table with search functionality
- **Metrics Cards**: Key performance indicators

### Styling
- Uses project's existing CSS variables and design system
- Consistent with One-Shot Comics branding
- Dark theme with comic-style accents
- Responsive grid layouts

## Navigation
The tokenomics page is accessible via:
- Main navigation: "Tokenomics" link
- Direct URL: `/tokenomics`
- Mobile menu: Available in hamburger menu

## Data Source
The page fetches data from `/public/tokenomics.csv` which contains the complete tokenomics model data for 164+ investors.

## Future Enhancements
- Export functionality for data
- Additional chart types
- Real-time data updates
- Advanced filtering options
- Comparison tools between different investment tiers
