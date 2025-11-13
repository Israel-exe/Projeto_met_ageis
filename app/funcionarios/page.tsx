"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Building2, UserCog, LogOut, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FuncionariosPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ usuario: "", senha: "" })
  const [reservas, setReservas] = useState<any[]>([])

  useEffect(() => {
    const funcionario = localStorage.getItem("funcionarioLogado")
    if (funcionario) {
      setIsLoggedIn(true)
      const todasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
      setReservas(todasReservas)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Funcionário padrão: funcionario / func123
    if (loginData.usuario === "funcionario" && loginData.senha === "func123") {
      localStorage.setItem("funcionarioLogado", "true")
      setIsLoggedIn(true)
      const todasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
      setReservas(todasReservas)
    } else {
      alert("Credenciais inválidas")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("funcionarioLogado")
    setIsLoggedIn(false)
    router.push("/")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Building2 className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-primary">Solaris Residence</span>
            </Link>
            <div className="flex items-center justify-center gap-2 text-accent">
              <UserCog className="h-6 w-6" />
              <span className="text-lg font-semibold">Área Restrita - Funcionários</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login de Funcionário</CardTitle>
              <CardDescription className="text-base">Acesso exclusivo para funcionários</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usuario" className="text-base">
                    Usuário
                  </Label>
                  <Input
                    id="usuario"
                    placeholder="funcionario"
                    value={loginData.usuario}
                    onChange={(e) => setLoginData({ ...loginData, usuario: e.target.value })}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha" className="text-base">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.senha}
                    onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                    required
                    className="text-base"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <UserCog className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
              </form>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">Credenciais padrão:</p>
                <p className="text-sm font-mono bg-muted px-3 py-2 rounded">funcionario / func123</p>
                <Link href="/login" className="block text-sm text-primary hover:underline mt-4">
                  Voltar para login de cliente
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-accent to-accent/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-accent-foreground" />
            <span className="text-xl font-bold text-accent-foreground">Solaris - Funcionários</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-accent-foreground">Área de Funcionários</span>
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
          <h1 className="text-4xl font-bold text-primary mb-2">Painel de Gerenciamento</h1>
          <p className="text-lg text-muted-foreground">Visualize e gerencie as reservas do hotel</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <CardTitle className="text-lg">Reservas Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">
                {
                  reservas.filter((r) => {
                    const hoje = new Date().toDateString()
                    return new Date(r.checkIn).toDateString() === hoje
                  }).length
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Reservas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Reservas Ativas</CardTitle>
            <CardDescription className="text-base">Visualize todas as reservas do sistema</CardDescription>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div>
                          <p className="text-sm text-muted-foreground">Suítes</p>
                          <p className="text-base font-semibold">{reserva.suites.length} suíte(s)</p>
                        </div>
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
