"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", senha: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Admin padrão: admin@solaris.com / admin123
    if (loginData.email === "admin@solaris.com" && loginData.senha === "admin123") {
      const admin = {
        id: 1,
        nome: "Administrador",
        email: loginData.email,
        tipo: "admin",
      }
      localStorage.setItem("currentUser", JSON.stringify(admin))
      router.push("/admin/dashboard")
    } else {
      alert("Credenciais de administrador inválidas")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-primary">Solaris Residence</span>
          </Link>
          <div className="flex items-center justify-center gap-2 text-secondary">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">Área do Administrador</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login de Administrador</CardTitle>
            <CardDescription className="text-base">Acesso restrito para administradores do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-base">
                  E-mail
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@solaris.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-senha" className="text-base">
                  Senha
                </Label>
                <Input
                  id="admin-senha"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.senha}
                  onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                  required
                  className="text-base"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Shield className="mr-2 h-5 w-5" />
                Entrar como Admin
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Credenciais padrão:</p>
              <p className="text-sm font-mono bg-muted px-3 py-2 rounded">admin@solaris.com / admin123</p>
              <Link href="/login" className="block text-sm text-primary hover:underline mt-4">
                Voltar para login de cliente
              </Link>
              <Link href="/funcionarios" className="block text-sm text-primary hover:underline">
                Acesso para funcionários
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
