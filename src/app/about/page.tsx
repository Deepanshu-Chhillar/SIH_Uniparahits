import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/app/about/components/AboutHero';
import MissionVision from '@/app/about/components/MissionVision';
import OriginStory from '@/app/about/components/OriginStory';
import OperativeRoster from '@/app/about/components/OperativeRoster';
import CoreValues from '@/app/about/components/CoreValues';
import PlatformStats from '@/app/about/components/PlatformStats';
import AboutCTA from '@/app/about/components/AboutCTA';

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <Header />
      <AboutHero />
      <MissionVision />
      <OriginStory />
      <OperativeRoster />
      <CoreValues />
      <PlatformStats />
      <AboutCTA />
      <Footer />
    </main>
  );
}