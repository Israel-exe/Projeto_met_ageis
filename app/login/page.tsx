"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", senha: "" })
  const [registerData, setRegisterData] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de login
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === loginData.email && u.senha === loginData.senha)

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      router.push("/cliente/dashboard")
    } else {
      alert("Email ou senha incorretos")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.senha !== registerData.confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const newUser = {
      id: Date.now(),
      nome: registerData.nome,
      email: registerData.email,
      senha: registerData.senha,
      tipo: "cliente",
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    alert("Cadastro realizado com sucesso!")
    router.push("/cliente/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-primary">Solaris Residence</span>
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
                <CardDescription className="text-base">
                  Entre com suas credenciais para acessar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-base">
                      E-mail
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-senha" className="text-base">
                      Senha
                    </Label>
                    <Input
                      id="login-senha"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.senha}
                      onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Entrar
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/admin/login" className="text-sm text-primary hover:underline">
                    Entrar como Administrador
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cadastro">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Criar Conta</CardTitle>
                <CardDescription className="text-base">Preencha os dados para criar sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-nome" className="text-base">
                      Nome Completo
                    </Label>
                    <Input
                      id="register-nome"
                      placeholder="Seu nome"
                      value={registerData.nome}
                      onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-base">
                      E-mail
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-senha" className="text-base">
                      Senha
                    </Label>
                    <Input
                      id="register-senha"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.senha}
                      onChange={(e) => setRegisterData({ ...registerData, senha: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirmar" className="text-base">
                      Confirmar Senha
                    </Label>
                    <Input
                      id="register-confirmar"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmarSenha}
                      onChange={(e) => setRegisterData({ ...registerData, confirmarSenha: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Criar Conta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
