"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Waves, Utensils, Dumbbell, Wifi, Car, ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Solaris Residence</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-sm font-medium hover:text-primary transition-colors">
              Produtos & Serviços
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/carrinho">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/luxury-modern-hotel-building-blue-sky.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Bem-vindo ao Solaris Residence
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">Sua experiência de luxo começa aqui</p>
          <Link href="/produtos">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6"
            >
              Reserve Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Nossas Áreas e Atividades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Waves className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Piscina</CardTitle>
              <CardDescription className="text-base">
                Piscina aquecida com vista panorâmica, espreguiçadeiras e bar molhado
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl">Restaurante</CardTitle>
              <CardDescription className="text-base">
                Gastronomia internacional com chefs renomados e cardápio exclusivo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/30 flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl">Academia</CardTitle>
              <CardDescription className="text-base">
                Academia completa com equipamentos modernos e personal trainer disponível
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">WiFi de Alta Velocidade</CardTitle>
              <CardDescription className="text-base">
                Internet de fibra óptica em todas as áreas do hotel
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl">Estacionamento</CardTitle>
              <CardDescription className="text-base">
                Estacionamento coberto e seguro com manobrista disponível 24h
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/30 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl">Salas de Eventos</CardTitle>
              <CardDescription className="text-base">
                Espaços versáteis para conferências, casamentos e eventos corporativos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Pronto para sua experiência única?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">Reserve agora e aproveite nossas ofertas especiais</p>
          <Link href="/produtos">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Ver Suítes Disponíveis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">Solaris Residence</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O melhor em hospedagem de luxo com atendimento personalizado e instalações de primeira classe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/produtos" className="text-muted-foreground hover:text-primary transition-colors">
                    Produtos & Serviços
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Telefone: (11) 1234-5678</li>
                <li>Email: contato@solarisresidence.com</li>
                <li>Endereço: Av. Paulista, 1000 - São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Solaris Residence. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
