'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const designGuides = [
  {
    id: 'linear-ai-style',
    name: 'Linear AI Style',
    source: 'linear.app',
    style: 'Modern Minimal',
    description: 'Dark-first design with purple accents, smooth animations, and exceptional typography.',
    extractedAt: '2025-12-19',
    colors: {
      primary: '#5E6AD2',
      secondary: '#8A8FE5',
      accent: '#F2C94C',
      background: '#0A0A0A',
      foreground: '#FFFFFF',
    },
    fonts: ['Inter', 'JetBrains Mono'],
    components: 5,
    version: '1.0.0',
  },
  {
    id: 'openai-style',
    name: 'OpenAI Style',
    source: 'openai.com',
    style: 'Elegant Minimal',
    description: 'Clean, research-focused design with green accents and excellent readability.',
    extractedAt: '2025-12-19',
    colors: {
      primary: '#10A37F',
      secondary: '#1A7F64',
      accent: '#FF6B35',
      background: '#FFFFFF',
      foreground: '#202123',
    },
    fonts: ['Söhne', 'Söhne Mono'],
    components: 4,
    version: '1.0.0',
  },
];

export default function GuidesPage() {
  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<typeof designGuides[0] | null>(null);

  const filteredGuides = designGuides.filter(
    (guide) =>
      guide.name.toLowerCase().includes(search.toLowerCase()) ||
      guide.source.toLowerCase().includes(search.toLowerCase()) ||
      guide.style.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Design Guides</h1>
          <p className="text-muted-foreground">
            Browse and manage your collection of extracted design systems.
          </p>
        </div>
        <Link href="/extract">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Guide
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <select className="rounded-lg border border-border bg-background px-4 py-2 text-sm">
          <option>All Styles</option>
          <option>Modern Minimal</option>
          <option>Elegant Minimal</option>
          <option>Brutalist</option>
        </select>
        <select className="rounded-lg border border-border bg-background px-4 py-2 text-sm">
          <option>Latest First</option>
          <option>Oldest First</option>
          <option>Name A-Z</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Guides List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredGuides.map((guide) => (
            <Card
              key={guide.id}
              variant={selectedGuide?.id === guide.id ? 'default' : 'interactive'}
              className={`cursor-pointer ${selectedGuide?.id === guide.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedGuide(guide)}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  {/* Color Preview */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-border grid grid-cols-2 grid-rows-2">
                    <div style={{ backgroundColor: guide.colors.primary }} />
                    <div style={{ backgroundColor: guide.colors.secondary }} />
                    <div style={{ backgroundColor: guide.colors.accent }} />
                    <div style={{ backgroundColor: guide.colors.background }} className="border-t border-l border-border" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-lg">{guide.name}</h3>
                      <Badge variant="outline">{guide.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {guide.source} • {guide.style}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{guide.components} components</span>
                      <span>{guide.fonts.length} fonts</span>
                      <span>Extracted {guide.extractedAt}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredGuides.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">No guides found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or create a new guide.
                </p>
                <Link href="/extract">
                  <Button variant="outline">Extract New Guide</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Guide Preview */}
        <div className="lg:col-span-1">
          {selectedGuide ? (
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedGuide.name}</CardTitle>
                  <CardDescription>{selectedGuide.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Colors */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Color Palette</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(selectedGuide.colors).map(([name, color]) => (
                        <div key={name} className="text-center">
                          <div
                            className="w-full aspect-square rounded-lg border border-border mb-1"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-muted-foreground capitalize">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Typography</h4>
                    <div className="space-y-2">
                      {selectedGuide.fonts.map((font) => (
                        <div key={font} className="flex items-center justify-between text-sm">
                          <span style={{ fontFamily: font }}>{font}</span>
                          <Badge variant="outline" size="sm">Font</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{selectedGuide.components}</p>
                      <p className="text-xs text-muted-foreground">Components</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{Object.keys(selectedGuide.colors).length}</p>
                      <p className="text-xs text-muted-foreground">Colors</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href="/apply" className="flex-1">
                    <Button className="w-full">Apply Guide</Button>
                  </Link>
                  <Button variant="outline">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="py-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>File:</strong> design-guides/{selectedGuide.id}.md
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Select a Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a design guide to preview its details.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
