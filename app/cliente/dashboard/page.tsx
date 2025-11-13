"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, LogOut, Trash2, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClienteDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [reservas, setReservas] = useState<any[]>([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!currentUser || currentUser.tipo !== "cliente") {
      router.push("/login")
      return
    }
    setUser(currentUser)

    const todasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    const reservasCliente = todasReservas.filter(
      (r: any) => r.cpf === currentUser.cpf || r.cliente === currentUser.nome,
    )
    setReservas(reservasCliente)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const excluirReserva = (id: number) => {
    if (!confirm("Deseja realmente excluir esta reserva?")) return

    const todasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    const novasReservas = todasReservas.filter((r: any) => r.id !== id)
    localStorage.setItem("reservas", JSON.stringify(novasReservas))
    setReservas(reservas.filter((r) => r.id !== id))
    alert("Reserva excluída com sucesso!")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Solaris Residence</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Olá, {user.nome}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Meu Painel</h1>
          <p className="text-lg text-muted-foreground">Gerencie suas reservas no Solaris Residence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{reservas.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próxima Estadia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-secondary">
                {reservas.length > 0 ? new Date(reservas[0].checkIn).toLocaleDateString("pt-BR") : "Nenhuma"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/produtos">
                <Button className="w-full">Nova Reserva</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Reservas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Minhas Reservas</CardTitle>
            <CardDescription className="text-base">Visualize e gerencie suas reservas</CardDescription>
          </CardHeader>
          <CardContent>
            {reservas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-4">Você ainda não possui reservas</p>
                <Link href="/produtos">
                  <Button>Fazer uma Reserva</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {reservas.map((reserva) => (
                  <Card key={reserva.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">Reserva #{reserva.id}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {new Date(reserva.data).toLocaleDateString("pt-BR")}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                          R$ {reserva.total}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Check-in</p>
                          <p className="text-lg font-semibold">
                            {new Date(reserva.checkIn).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Check-out</p>
                          <p className="text-lg font-semibold">
                            {new Date(reserva.checkOut).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Suítes Reservadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {reserva.suites.map((suite: any, index: number) => (
                            <Badge key={index} variant="outline">
                              {suite.nome}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm" onClick={() => excluirReserva(reserva.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancelar Reserva
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
