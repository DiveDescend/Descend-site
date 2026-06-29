import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const COLOR_TOKENS = [
  { name: "Primary", class: "bg-primary", hex: "#1CCAD8", textClass: "text-primary-foreground" },
  { name: "Background", class: "bg-background border", hex: "#FFFFFF", textClass: "text-foreground" },
  { name: "Foreground", class: "bg-foreground", hex: "#0A0A0A", textClass: "text-background" },
  { name: "Muted", class: "bg-muted", hex: "#F5F5F5", textClass: "text-muted-foreground" },
  { name: "Border", class: "bg-border", hex: "#E5E5E5", textClass: "text-foreground" },
  { name: "Destructive", class: "bg-destructive", hex: "#EF4444", textClass: "text-destructive-foreground" },
];

export default function StylesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Design System</h1>
        <p className="text-muted-foreground">Descend visual language — tokens, typography, and components.</p>
      </div>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COLOR_TOKENS.map((token) => (
            <div key={token.name} className="overflow-hidden rounded-lg border">
              <div className={`h-16 ${token.class} flex items-center justify-center`}>
                <span className={`text-xs font-medium ${token.textClass}`}>{token.hex}</span>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium">{token.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-3">
          <div className="border-b pb-2">
            <p className="text-xs text-muted-foreground mb-1">h1 — 3xl bold</p>
            <h1 className="text-3xl font-bold">The ocean awaits</h1>
          </div>
          <div className="border-b pb-2">
            <p className="text-xs text-muted-foreground mb-1">h2 — 2xl semibold</p>
            <h2 className="text-2xl font-semibold">Popular Locations</h2>
          </div>
          <div className="border-b pb-2">
            <p className="text-xs text-muted-foreground mb-1">h3 — xl semibold</p>
            <h3 className="text-xl font-semibold">Blue Horizon Dive</h3>
          </div>
          <div className="border-b pb-2">
            <p className="text-xs text-muted-foreground mb-1">body — sm, base</p>
            <p className="text-base">Discover dive sites, explore operators, and book experiences worldwide.</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">muted — sm</p>
            <p className="text-sm text-muted-foreground">Raja Ampat, Indonesia · 312 dives</p>
          </div>
        </div>
      </section>

      {/* Font */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Typeface</h2>
        <p className="text-muted-foreground text-sm">Geist Sans (primary) · Geist Mono (code)</p>
        <p className="font-mono text-sm bg-muted px-3 py-2 rounded-md">const depth = &quot;40m&quot;;</p>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge>PADI</Badge>
          <Badge variant="secondary">SSI</Badge>
          <Badge variant="outline">Beginner</Badge>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Blue Horizon Dive</CardTitle>
              <CardDescription>Raja Ampat, Indonesia</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Award-winning dive centre in the Coral Triangle.</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Featured</CardTitle>
              <CardDescription>Primary accent card</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Used for highlighted content and CTAs.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <div className="max-w-sm space-y-3">
          <Input placeholder="Where to?" />
          <Input type="email" placeholder="you@example.com" />
          <Input type="date" />
          <Input disabled placeholder="Disabled input" />
        </div>
      </section>
    </div>
  );
}
