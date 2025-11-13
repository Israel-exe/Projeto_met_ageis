import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ShoppingCart, User, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function SobrePage() {
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
            <Link href="/sobre" className="text-sm font-medium text-primary">
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-4">Sobre Nós</h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto">
            Conheça a história e os valores do Solaris Residence
          </p>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-primary">Quem Somos</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              O <strong>Solaris Residence</strong> é um hotel boutique de luxo que combina elegância contemporânea com
              hospitalidade calorosa. Fundado em 2020, nosso objetivo é proporcionar experiências memoráveis para cada
              hóspede que passa por nossas portas.
            </p>
            <p>
              Com instalações de primeira classe e uma equipe dedicada, trabalhamos incansavelmente para garantir que
              sua estadia seja perfeita em todos os aspectos. Desde suítes luxuosas até serviços personalizados, cada
              detalhe é cuidadosamente planejado.
            </p>
            <p>
              Nossa filosofia é simples: <strong>criar momentos inesquecíveis</strong> através de um atendimento
              excepcional, ambientes sofisticados e atenção aos mínimos detalhes.
            </p>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Onde Estamos Localizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg">Avenida Paulista, 1000</p>
                <p className="text-lg">Bela Vista - São Paulo, SP</p>
                <p className="text-lg">CEP: 01310-100</p>
                <p className="text-muted-foreground mt-4">
                  Localizado no coração de São Paulo, próximo aos principais pontos turísticos, centros empresariais e
                  opções de entretenimento.
                </p>
              </CardContent>
            </Card>

            <div
              className="h-80 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('/luxury-hotel-building-exterior-modern.jpg')` }}
            />
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="container mx-auto px-4 py-16" id="contato">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Entre em Contato</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">(11) 1234-5678</p>
              <p className="text-sm text-muted-foreground mt-2">Atendimento 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                E-mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">contato@solarisresidence.com</p>
              <p className="text-sm text-muted-foreground mt-2">Resposta em até 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">(11) 91234-5678</p>
              <p className="text-sm text-muted-foreground mt-2">Chat direto</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
