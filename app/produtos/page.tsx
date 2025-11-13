"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ShoppingCart, User, BedDouble, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const suites = [
  {
    id: 1,
    nome: "Suíte Standard",
    descricao: "Confortável e elegante, perfeita para estadias curtas",
    preco: 350,
    capacidade: 2,
    comodidades: ["WiFi", "TV", "Ar Condicionado", "Frigobar"],
    imagem: "/luxury-hotel-room-standard.jpg",
  },
  {
    id: 2,
    nome: "Suíte Deluxe",
    descricao: "Ampla e sofisticada com vista para a cidade",
    preco: 550,
    capacidade: 3,
    comodidades: ["WiFi", "TV 4K", "Ar Condicionado", "Frigobar", "Varanda", "Banheira"],
    imagem: "/luxury-hotel-room-deluxe.jpg",
  },
  {
    id: 3,
    nome: "Suíte Premium",
    descricao: "Luxo absoluto com sala de estar separada",
    preco: 800,
    capacidade: 4,
    comodidades: [
      "WiFi",
      "TV 4K",
      "Ar Condicionado",
      "Frigobar",
      "Varanda",
      "Banheira",
      "Sala de Estar",
      "Serviço de Quarto 24h",
    ],
    imagem: "/luxury-hotel-room-premium.jpg",
  },
  {
    id: 4,
    nome: "Suíte Master",
    descricao: "A experiência definitiva em hospedagem de luxo",
    preco: 1200,
    capacidade: 5,
    comodidades: [
      "WiFi",
      "TV 4K",
      "Ar Condicionado",
      "Frigobar",
      "Varanda Privativa",
      "Banheira de Hidromassagem",
      "Sala de Estar",
      "Cozinha",
      "Serviço de Mordomo",
    ],
    imagem: "/luxury-hotel-penthouse-suite.jpg",
  },
]

export default function ProdutosPage() {
  const router = useRouter()
  const [cart, setCart] = useState<number[]>([])

  const addToCart = (suiteId: number) => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]")
    cartData.push(suiteId)
    localStorage.setItem("cart", JSON.stringify(cartData))
    alert("Suíte adicionada ao carrinho!")
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
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
            <Link href="/produtos" className="text-sm font-medium text-primary">
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

      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-4">Nossas Suítes</h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto">
            Escolha a suíte perfeita para sua estadia
          </p>
        </div>
      </section>

      {/* Suites Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {suites.map((suite) => (
            <Card key={suite.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${suite.imagem}')` }} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{suite.nome}</CardTitle>
                    <CardDescription className="text-base">{suite.descricao}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    R$ {suite.preco}/noite
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">Até {suite.capacidade} pessoas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">Cama King</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Comodidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {suite.comodidades.map((comodidade, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {comodidade}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={() => addToCart(suite.id)}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Serviços Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Café da Manhã</CardTitle>
                <CardDescription>Buffet completo servido das 6h às 10h</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">R$ 45/pessoa</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Spa & Massagem</CardTitle>
                <CardDescription>Relaxe com nossos tratamentos exclusivos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">A partir de R$ 150</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transfer Aeroporto</CardTitle>
                <CardDescription>Transporte confortável e seguro</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">R$ 80</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
