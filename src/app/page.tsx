import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ProblemSection from '@/app/components/ProblemSection';
import SolutionSection from '@/app/components/SolutionSection';
import MarketSizeSection from '@/app/components/MarketSizeSection';
import DualEconomySection from '@/app/components/DualEconomySection';
import RankingSection from '@/app/components/RankingSection';
import GuildSection from '@/app/components/GuildSection';
import EscrowSection from '@/app/components/EscrowSection';
import SwotSection from '@/app/components/SwotSection';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MarketSizeSection />
      <DualEconomySection />
      <RankingSection />
      <GuildSection />
      <EscrowSection />
      <SwotSection />
      <Footer />
    </main>
  );
}