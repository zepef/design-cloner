'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

const availableGuides = [
  { id: 'linear-ai-style', name: 'Linear AI Style', style: 'Modern Minimal' },
  { id: 'openai-style', name: 'OpenAI Style', style: 'Elegant Minimal' },
];

export default function ApplyPage() {
  const [selectedGuide, setSelectedGuide] = useState('');
  const [repoPath, setRepoPath] = useState('');
  const [branchName, setBranchName] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSteps, setApplicationSteps] = useState<{ step: string; status: 'pending' | 'active' | 'done' }[]>([]);

  const handleApply = async () => {
    if (!selectedGuide || !repoPath) return;

    setIsApplying(true);
    const steps = [
      { step: 'Creating new branch', status: 'active' as const },
      { step: 'Reading design guide', status: 'pending' as const },
      { step: 'Generating CSS variables', status: 'pending' as const },
      { step: 'Updating Tailwind config', status: 'pending' as const },
      { step: 'Generating components', status: 'pending' as const },
      { step: 'Committing changes', status: 'pending' as const },
    ];
    setApplicationSteps(steps);

    // Simulate step-by-step progress
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setApplicationSteps(prev =>
        prev.map((s, idx) => ({
          ...s,
          status: idx < i ? 'done' : idx === i ? 'active' : 'pending'
        }))
      );
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setApplicationSteps(prev => prev.map(s => ({ ...s, status: 'done' as const })));
    setIsApplying(false);
  };

  const generatedBranchName = branchName || (selectedGuide ? `restyle/${selectedGuide}-${new Date().toISOString().slice(0, 10)}` : '');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply Design</h1>
        <p className="text-muted-foreground">
          Apply a design guide to your repository. Changes are isolated to a new branch.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Select a design guide and specify the target repository.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Design Guide Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Select Design Guide
              </label>
              <div className="grid grid-cols-2 gap-4">
                {availableGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedGuide === guide.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                      <div>
                        <p className="font-medium">{guide.name}</p>
                        <p className="text-sm text-muted-foreground">{guide.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Repository Path */}
            <Input
              label="Repository Path"
              placeholder="/path/to/your/repository"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              hint="The local path to the repository you want to restyle"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
            />

            {/* Branch Name */}
            <Input
              label="Branch Name (Optional)"
              placeholder={generatedBranchName || 'restyle/design-name-date'}
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              hint={`Leave empty to auto-generate: ${generatedBranchName}`}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Options */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <div>
                    <p className="text-sm font-medium">Generate UI Components</p>
                    <p className="text-xs text-muted-foreground">Create Button, Card, Input components</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <div>
                    <p className="text-sm font-medium">Update CSS Variables</p>
                    <p className="text-xs text-muted-foreground">Add design tokens to globals.css</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  <div>
                    <p className="text-sm font-medium">Extend Tailwind Config</p>
                    <p className="text-xs text-muted-foreground">Add theme extensions to tailwind.config</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <div>
                    <p className="text-sm font-medium">Preserve Existing Styles</p>
                    <p className="text-xs text-muted-foreground">Keep current styles as fallback</p>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleApply}
              loading={isApplying}
              disabled={!selectedGuide || !repoPath}
              className="w-full"
              size="lg"
            >
              {isApplying ? 'Applying Design...' : 'Apply Design Guide'}
            </Button>
          </CardFooter>
        </Card>

        {/* Progress */}
        {applicationSteps.length > 0 && (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Application Progress</span>
                {applicationSteps.every(s => s.status === 'done') && (
                  <Badge variant="success">Complete</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'done' ? 'bg-success text-white' :
                      step.status === 'active' ? 'bg-primary text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step.status === 'done' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : step.status === 'active' ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      step.status === 'done' ? 'text-foreground' :
                      step.status === 'active' ? 'text-foreground font-medium' :
                      'text-muted-foreground'
                    }`}>
                      {step.step}
                    </span>
                  </div>
                ))}
              </div>

              {applicationSteps.every(s => s.status === 'done') && (
                <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-success">Design Applied Successfully!</p>
                      <p className="text-sm text-success/80 mt-1">
                        Your changes are on branch: <code className="bg-success/20 px-1.5 py-0.5 rounded">{generatedBranchName}</code>
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">View Changes</Button>
                        <Button size="sm" variant="outline">Create PR</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>What Will Change</CardTitle>
            <CardDescription>
              Preview the files that will be created or modified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-2 text-success">
                <span>+</span>
                <span>app/globals.css</span>
                <Badge variant="success" size="sm">Modified</Badge>
              </div>
              <div className="flex items-center gap-2 text-success">
                <span>+</span>
                <span>lib/design-theme.ts</span>
                <Badge variant="success" size="sm">Created</Badge>
              </div>
              <div className="flex items-center gap-2 text-success">
                <span>+</span>
                <span>components/ui/Button.tsx</span>
                <Badge variant="success" size="sm">Created</Badge>
              </div>
              <div className="flex items-center gap-2 text-success">
                <span>+</span>
                <span>components/ui/Card.tsx</span>
                <Badge variant="success" size="sm">Created</Badge>
              </div>
              <div className="flex items-center gap-2 text-success">
                <span>+</span>
                <span>components/ui/Input.tsx</span>
                <Badge variant="success" size="sm">Created</Badge>
              </div>
              <div className="flex items-center gap-2 text-warning">
                <span>~</span>
                <span>tailwind.config.ts</span>
                <Badge variant="warning" size="sm">Extended</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
