"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, ShoppingCart, User, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const suites = [
  {
    id: 1,
    nome: "Suíte Standard",
    preco: 350,
  },
  {
    id: 2,
    nome: "Suíte Deluxe",
    preco: 550,
  },
  {
    id: 3,
    nome: "Suíte Premium",
    preco: 800,
  },
  {
    id: 4,
    nome: "Suíte Master",
    preco: 1200,
  },
]

export default function CarrinhoPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [nomeCliente, setNomeCliente] = useState("")
  const [cpf, setCpf] = useState("")

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const items = cart.map((id: number) => suites.find((s) => s.id === id))
    setCartItems(items)
  }, [])

  const removeItem = (index: number) => {
    const newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems(newCart)
    const cartIds = newCart.map((item) => item.id)
    localStorage.setItem("cart", JSON.stringify(cartIds))
  }

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.preco, 0)
  }

  const finalizarCompra = () => {
    if (!nomeCliente || !cpf || !checkIn || !checkOut) {
      alert("Por favor, preencha todos os campos!")
      return
    }

    const reserva = {
      id: Date.now(),
      cliente: nomeCliente,
      cpf: cpf,
      checkIn: checkIn,
      checkOut: checkOut,
      suites: cartItems,
      total: calcularTotal(),
      data: new Date().toISOString(),
    }

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    reservas.push(reserva)
    localStorage.setItem("reservas", JSON.stringify(reservas))
    localStorage.setItem("ultimaReserva", JSON.stringify(reserva))
    localStorage.setItem("cart", "[]")

    router.push("/comprovante")
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
                <ShoppingCart className="h-5 w-5 text-primary" />
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

      {/* Carrinho */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-primary">Carrinho de Reservas</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-4">Seu carrinho está vazio</p>
              <Link href="/produtos">
                <Button>Ver Suítes Disponíveis</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{item.nome}</CardTitle>
                        <CardDescription>R$ {item.preco}/noite</CardDescription>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      placeholder="João Silva"
                      value={nomeCliente}
                      onChange={(e) => setNomeCliente(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkin">Check-in</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout">Check-out</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-secondary">R$ {calcularTotal()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={finalizarCompra}>
                    Finalizar Reserva
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
