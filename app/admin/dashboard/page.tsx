"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, LogOut, DollarSign, Calendar, Users, TrendingUp, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [reservas, setReservas] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalReservas: 0,
    lucroMensal: 0,
    lucroTotal: 0,
    clientesUnicos: 0,
  })

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!currentUser || currentUser.tipo !== "admin") {
      router.push("/admin/login")
      return
    }
    setUser(currentUser)

    const todasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    setReservas(todasReservas)

    // Calcular estatísticas
    const now = new Date()
    const mesAtual = now.getMonth()
    const anoAtual = now.getFullYear()

    const reservasMesAtual = todasReservas.filter((r: any) => {
      const dataReserva = new Date(r.data)
      return dataReserva.getMonth() === mesAtual && dataReserva.getFullYear() === anoAtual
    })

    const lucroMensal = reservasMesAtual.reduce((total: number, r: any) => total + r.total, 0)
    const lucroTotal = todasReservas.reduce((total: number, r: any) => total + r.total, 0)
    const clientesUnicos = new Set(todasReservas.map((r: any) => r.cpf)).size

    setStats({
      totalReservas: todasReservas.length,
      lucroMensal: lucroMensal,
      lucroTotal: lucroTotal,
      clientesUnicos: clientesUnicos,
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/admin/login")
  }

  const excluirReserva = (id: number) => {
    if (!confirm("Deseja realmente excluir esta reserva?")) return

    const novasReservas = reservas.filter((r) => r.id !== id)
    localStorage.setItem("reservas", JSON.stringify(novasReservas))
    setReservas(novasReservas)
    alert("Reserva excluída com sucesso!")
    window.location.reload()
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">Solaris Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground">Admin: {user.nome}</span>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Painel Administrativo</h1>
          <p className="text-lg text-muted-foreground">Gerencie todas as operações do Solaris Residence</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Total de Reservas</CardTitle>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalReservas}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Lucro Mensal</CardTitle>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">R$ {stats.lucroMensal.toLocaleString("pt-BR")}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Lucro Total</CardTitle>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">R$ {stats.lucroTotal.toLocaleString("pt-BR")}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/60 to-primary/40 text-primary-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Clientes Únicos</CardTitle>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.clientesUnicos}</p>
            </CardContent>
          </Card>
        </div>

        {/* Todas as Reservas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Todas as Reservas</CardTitle>
            <CardDescription className="text-base">Gerencie todas as reservas do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {reservas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Nenhuma reserva no sistema</p>
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
                            Cliente: {reserva.cliente} | CPF: {reserva.cpf}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                          R$ {reserva.total}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Data da Reserva</p>
                          <p className="text-base font-semibold">
                            {new Date(reserva.data).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Check-in</p>
                          <p className="text-base font-semibold">
                            {new Date(reserva.checkIn).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Check-out</p>
                          <p className="text-base font-semibold">
                            {new Date(reserva.checkOut).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Suítes:</p>
                        <div className="flex flex-wrap gap-2">
                          {reserva.suites.map((suite: any, index: number) => (
                            <Badge key={index} variant="outline">
                              {suite.nome} - R$ {suite.preco}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button variant="destructive" size="sm" onClick={() => excluirReserva(reserva.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir Reserva
                      </Button>
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
