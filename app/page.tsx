import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const features = [
  {
    title: 'Extract Designs',
    description: 'Analyze any website and extract its complete design system including colors, typography, spacing, and components.',
    icon: ExtractIcon,
    href: '/extract',
    badge: 'AI Powered',
  },
  {
    title: 'Design Guides',
    description: 'Browse and manage your collection of extracted design guides. Each guide is stored as a portable markdown file.',
    icon: GuidesIcon,
    href: '/guides',
    badge: '2 Guides',
  },
  {
    title: 'Apply Designs',
    description: 'Apply a design guide to any repository. Changes are isolated to a new branch for safe experimentation.',
    icon: ApplyIcon,
    href: '/apply',
    badge: 'Branch Safe',
  },
];

const recentGuides = [
  {
    name: 'Linear AI Style',
    source: 'linear.app',
    style: 'Modern Minimal',
    colors: ['#5E6AD2', '#8A8FE5', '#F2C94C'],
    extractedAt: '2025-12-19',
  },
  {
    name: 'OpenAI Style',
    source: 'openai.com',
    style: 'Elegant Minimal',
    colors: ['#10A37F', '#1A7F64', '#FF6B35'],
    extractedAt: '2025-12-19',
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in">
        <Badge variant="secondary" className="mb-4">
          Powered by Claude AI
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="gradient-text">Clone Any Design</span>
          <br />
          <span className="text-foreground">In Minutes</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Extract design systems from any website and apply them to your projects.
          Transform unstyled repositories into beautifully designed applications.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/extract">
            <Button size="lg" icon={<ExtractIcon className="w-5 h-5" />}>
              Start Extracting
            </Button>
          </Link>
          <Link href="/guides">
            <Button size="lg" variant="outline">
              Browse Guides
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <Link key={feature.title} href={feature.href}>
            <Card
              variant="interactive"
              className="h-full animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline">{feature.badge}</Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      {/* Recent Guides */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Design Guides</h2>
          <Link href="/guides">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {recentGuides.map((guide, index) => (
            <Card
              key={guide.name}
              variant="interactive"
              className="animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{guide.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.source} • {guide.style}
                    </p>
                  </div>
                  <Badge>{guide.extractedAt}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Colors:</span>
                  {guide.colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16 py-12 border-t border-border">
        <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Enter URL', desc: 'Provide the website URL you want to clone' },
            { step: '2', title: 'AI Analysis', desc: 'Claude analyzes colors, typography, and patterns' },
            { step: '3', title: 'Generate Guide', desc: 'A portable design guide is created' },
            { step: '4', title: 'Apply Design', desc: 'Apply to any project in a new branch' },
          ].map((item, index) => (
            <div
              key={item.step}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${(index + 5) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12">
            <h2 className="text-2xl font-semibold mb-4">Ready to Clone Your First Design?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start by extracting a design from your favorite website and see the magic happen.
            </p>
            <Link href="/extract">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ExtractIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

function GuidesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function ApplyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  );
}
