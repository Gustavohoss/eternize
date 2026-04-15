
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-love-darker p-4">
      <div className="glass-card p-8 md:p-12 text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Heart className="text-love-red fill-love-red/50 h-16 w-16 animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-serif text-gradient-love">404</h1>
        <p className="text-xl text-white/80 mb-6">
          Oops! Parece que esta página de amor não existe...
        </p>
        
        <Button className="bg-love-red hover:bg-love-red/90" asChild>
          <Link to="/">Voltar para o Início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
