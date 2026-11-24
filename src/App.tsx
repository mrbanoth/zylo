import React, { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { PlatformProvider } from "./context/PlatformContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { BlogPage } from "./pages/BlogPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlatformLayout } from "./pages/platform/PlatformLayout";
import { OverviewView } from "./pages/platform/OverviewView";
import { AccountsView } from "./pages/platform/AccountsView";
import { SchedulerView } from "./pages/platform/SchedulerView";
import { AutomationsView } from "./pages/platform/AutomationsView";
import { AiStudioView } from "./pages/platform/AiStudioView";
import { AnalyticsView } from "./pages/platform/AnalyticsView";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Marketing & Legal Pages */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>

          {/* Interactive AI Social Media Management & Automation Platform */}
          <Route path="/app" element={<PlatformLayout />}>
            <Route index element={<OverviewView />} />
            <Route path="accounts" element={<AccountsView />} />
            <Route path="scheduler" element={<SchedulerView />} />
            <Route path="automations" element={<AutomationsView />} />
            <Route path="ai-studio" element={<AiStudioView />} />
            <Route path="analytics" element={<AnalyticsView />} />
          </Route>

          {/* Catch-all 404 */}
          <Route element={<MarketingLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlatformProvider>
  );
}
