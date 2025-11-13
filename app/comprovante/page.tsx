"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle, Download } from "lucide-react"
import Link from "next/link"

export default function ComprovantePage() {
  const [reserva, setReserva] = useState<any>(null)

  useEffect(() => {
    const ultimaReserva = JSON.parse(localStorage.getItem("ultimaReserva") || "null")
    setReserva(ultimaReserva)
  }, [])

  const imprimirComprovante = () => {
    window.print()
  }

  if (!reserva) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-xl text-muted-foreground">Nenhuma reserva encontrada</p>
            <Link href="/produtos">
              <Button className="mt-4">Fazer uma Reserva</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="mb-8">
          <CardHeader className="text-center bg-primary text-primary-foreground">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16" />
            </div>
            <CardTitle className="text-3xl">Reserva Confirmada!</CardTitle>
            <p className="text-primary-foreground/90 mt-2">Obrigado por escolher o Solaris Residence</p>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Solaris Residence</span>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">Dados da Reserva</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número da Reserva:</span>
                  <span className="font-semibold">#{reserva.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span className="font-semibold">{reserva.cliente}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPF:</span>
                  <span className="font-semibold">{reserva.cpf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-semibold">{new Date(reserva.checkIn).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-semibold">{new Date(reserva.checkOut).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">Suítes Reservadas</h3>
              <div className="space-y-2">
                {reserva.suites.map((suite: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span>{suite.nome}</span>
                    <span className="font-semibold text-secondary">R$ {suite.preco}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-secondary">R$ {reserva.total}</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <p className="text-sm text-center text-muted-foreground">
                Um email de confirmação foi enviado para seu endereço cadastrado. Apresente este comprovante no
                check-in.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 print:hidden">
          <Button onClick={imprimirComprovante} className="flex-1" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Imprimir Comprovante
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent" size="lg">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
