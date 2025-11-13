import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Ebook from "@/pages/Ebook";
import EbookVendas from "@/pages/EbookVendas";
import CasosReais from "@/pages/CasosReais";
import NotFound from "@/pages/not-found";

// Componente do botão flutuante do WhatsApp
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5571996510966?text=Quero%20minha%20indenização"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fixo"
      aria-label="Contato via WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="notification-badge">1</span>
    </a>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/ebook" component={Ebook} />
      <Route path="/ebook-premium" component={EbookVendas} />
      <Route path="/casos-reais" component={CasosReais} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
