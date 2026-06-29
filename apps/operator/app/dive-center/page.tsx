import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Globe, AtSign, Link2 } from "lucide-react";

const AGENCIES = ["PADI", "SSI", "NAUI", "CMAS", "BSAC", "GUE", "TDI", "SDI"];

export default function DiveCentrePage() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dive Centre Profile</h1>
        <p className="text-muted-foreground">This information appears on your public listing on Descend.</p>
      </div>

      {/* Cover photo */}
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <div className="relative h-40 border-b border-dashed border-input flex items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors group">
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground">
              <Upload className="h-6 w-6" />
              <p className="text-sm font-medium">Upload cover photo</p>
              <p className="text-xs">Drag and drop or click to upload · 1600×400 recommended</p>
            </div>
          </div>
          <div className="px-6 pb-5 pt-4 flex items-end gap-4">
            <div className="h-16 w-16 shrink-0 rounded-lg border-2 border-dashed border-input flex items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground pb-1">Upload logo · Square, 512×512 recommended</div>
          </div>
        </CardContent>
      </Card>

      {/* Basic info */}
      <Card>
        <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Centre name</label>
            <Input defaultValue="Blue Horizon Dive" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Tagline</label>
            <Input defaultValue="Exploring the Coral Triangle since 2009" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              defaultValue="Award-winning dive centre operating in the heart of the Coral Triangle since 2009. We specialise in small-group diving, underwater photography, and manta encounters."
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader><CardTitle className="text-base">Location</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Country</label>
              <Input defaultValue="Indonesia" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">City / Region</label>
              <Input defaultValue="Raja Ampat, West Papua" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full address</label>
            <Input defaultValue="Jl. Waisai Pianemo, Waisai, Raja Ampat Regency" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Google Maps link</label>
            <Input placeholder="https://maps.google.com/..." />
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader><CardTitle className="text-base">Contact & Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone</label>
              <Input defaultValue="+62 951 21500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="info@bluehorizon.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" />Website</label>
            <Input defaultValue="https://bluehorizondive.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium flex items-center gap-1.5"><AtSign className="h-3.5 w-3.5" />Instagram</label>
            <Input placeholder="@yourdivecenter" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" />Facebook</label>
            <Input placeholder="facebook.com/yourdivecenter" />
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader><CardTitle className="text-base">Agency Certifications Held</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {AGENCIES.map((agency) => (
              <label key={agency} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked={["PADI", "SSI"].includes(agency)} className="h-4 w-4 rounded border-input accent-primary" />
                <span className="text-sm">{agency}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cancellation policy */}
      <Card>
        <CardHeader><CardTitle className="text-base">Cancellation Policy</CardTitle></CardHeader>
        <CardContent>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue="Full refund for cancellations made 48 hours or more before the scheduled dive. No refund for cancellations within 48 hours."
          />
        </CardContent>
      </Card>

      <Button className="w-full" size="lg">Save changes</Button>
    </div>
  );
}
