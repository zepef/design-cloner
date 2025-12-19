'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default function ExtractPage() {
  const [url, setUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResult, setExtractionResult] = useState<null | {
    name: string;
    colors: { name: string; value: string }[];
    fonts: string[];
    components: string[];
  }>(null);

  const handleExtract = async () => {
    if (!url) return;

    setIsExtracting(true);

    // Simulate extraction delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock result
    setExtractionResult({
      name: `Design Guide - ${new URL(url).hostname}`,
      colors: [
        { name: 'primary', value: '#6366f1' },
        { name: 'secondary', value: '#8b5cf6' },
        { name: 'accent', value: '#06b6d4' },
        { name: 'background', value: '#ffffff' },
        { name: 'foreground', value: '#0f172a' },
      ],
      fonts: ['Inter', 'JetBrains Mono'],
      components: ['Button', 'Card', 'Input', 'Badge', 'Navigation'],
    });

    setIsExtracting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Extract Design</h1>
        <p className="text-muted-foreground">
          Enter a website URL to analyze and extract its design system.
        </p>
      </div>

      <Tabs defaultValue="url">
        <TabsList>
          <TabsTrigger value="url">From URL</TabsTrigger>
          <TabsTrigger value="css">From CSS</TabsTrigger>
          <TabsTrigger value="figma">From Figma</TabsTrigger>
        </TabsList>

        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Extract from Website</CardTitle>
              <CardDescription>
                Enter a URL and we&apos;ll analyze the website to extract its design system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Website URL"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Extraction Depth
                  </label>
                  <select className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground text-sm">
                    <option value="shallow">Shallow - Basic colors & fonts</option>
                    <option value="medium">Medium - Include components</option>
                    <option value="deep">Deep - Full analysis</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Output Format
                  </label>
                  <select className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground text-sm">
                    <option value="markdown">Markdown (.md)</option>
                    <option value="json">JSON (.json)</option>
                    <option value="css">CSS Variables</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <span>Include dark mode</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <span>Extract components</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  <span>Capture screenshots</span>
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleExtract}
                loading={isExtracting}
                disabled={!url}
                className="w-full"
              >
                {isExtracting ? 'Analyzing...' : 'Extract Design'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="css">
          <Card>
            <CardHeader>
              <CardTitle>Extract from CSS</CardTitle>
              <CardDescription>
                Paste CSS code to extract design tokens and patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                label="CSS Code"
                placeholder={`:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --font-family: 'Inter', sans-serif;
}`}
                rows={10}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Parse CSS</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="figma">
          <Card>
            <CardHeader>
              <CardTitle>Extract from Figma</CardTitle>
              <CardDescription>
                Connect your Figma file to extract design tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Figma File URL"
                placeholder="https://figma.com/file/..."
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.5 8.5a3 3 0 1 1 0-6h3a3 3 0 1 1 0 6h-3zm0 2h3a3 3 0 1 1 0 6h-3a3 3 0 1 1 0-6zm8-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                  </svg>
                }
              />
              <Input
                label="Figma Access Token"
                type="password"
                placeholder="figd_..."
                hint="Generate a token from Figma Settings > Account > Personal Access Tokens"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect Figma</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Results Section */}
      {extractionResult && (
        <div className="mt-8 space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Extraction Results</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Download .md
              </Button>
              <Button size="sm">
                Save to Guides
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Colors</CardTitle>
                <CardDescription>{extractionResult.colors.length} colors extracted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {extractionResult.colors.map((color) => (
                    <div key={color.name} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border border-border"
                        style={{ backgroundColor: color.value }}
                      />
                      <div>
                        <p className="text-sm font-medium capitalize">{color.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Typography</CardTitle>
                <CardDescription>{extractionResult.fonts.length} fonts detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extractionResult.fonts.map((font) => (
                    <div key={font} className="flex items-center justify-between">
                      <span className="font-medium" style={{ fontFamily: font }}>{font}</span>
                      <Badge variant="outline">Font</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Components */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Components</CardTitle>
                <CardDescription>{extractionResult.components.length} component patterns identified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {extractionResult.components.map((component) => (
                    <Badge key={component}>{component}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <Card className="mt-8 bg-muted/50">
        <CardContent className="py-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Pro Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use the &quot;Deep&quot; extraction mode for complex design systems</li>
                <li>• Enable dark mode detection to capture both color schemes</li>
                <li>• CSS variables are automatically detected and organized</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
