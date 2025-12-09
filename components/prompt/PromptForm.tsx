import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PromptData } from '../../lib/prompt-generator'

const CAMERA_MOVEMENTS = [
  'Static',
  'Pan Left',
  'Pan Right',
  'Tilt Up',
  'Tilt Down',
  'Dolly In',
  'Dolly Out',
  'Tracking Shot',
]

const CAMERA_ANGLES = ['Eye Level', 'Low Angle', 'High Angle', "Bird's Eye", 'Dutch Angle']

const LIGHTING_OPTIONS = ['Natural', 'Golden Hour', 'Blue Hour', 'High Key', 'Low Key', 'Neon']

const VISUAL_STYLES: Record<string, string[]> = {
  Photorealistic: ['Cinematic', 'Documentary', 'Portrait', 'Landscape'],
  'Digital/3D': ['CGI', 'Motion Graphics', 'VFX', 'Game Engine'],
  Artistic: ['Anime', 'Watercolor', 'Oil Painting', 'Sketch'],
}

interface PromptFormProps {
  data: PromptData
  onChange: (data: PromptData) => void
}

export const PromptForm: React.FC<PromptFormProps> = ({ data, onChange }) => {
  const [styleCategory, setStyleCategory] = useState<string>('')

  const updateField = (field: keyof PromptData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const SelectWithChevron = ({
    value,
    options,
    placeholder,
    onChange,
  }: {
    value: string
    options: string[]
    placeholder: string
    onChange: (v: string) => void
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 pr-9 text-sm text-white focus:outline-none focus:border-white appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
    </div>
  )

  return (
    <div className="space-y-4">
      <details className="group border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40" open>
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white bg-zinc-900/60">
          Core Content
        </summary>
        <div className="px-4 pt-3 pb-3 space-y-3">
          <div className="space-y-1">
            <label htmlFor="subject" className="text-xs font-medium text-zinc-300">Subject *</label>
            <input
              id="subject"
              placeholder="e.g., A golden retriever puppy"
              value={data.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="action" className="text-xs font-medium text-zinc-300">Action *</label>
            <input
              id="action"
              placeholder="e.g., running through a meadow"
              value={data.action}
              onChange={(e) => updateField('action', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="location" className="text-xs font-medium text-zinc-300">Location *</label>
            <input
              id="location"
              placeholder="e.g., sunlit countryside field"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white"
            />
          </div>
        </div>
      </details>

      <details className="group border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40" open>
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white bg-zinc-900/60">
          Cinematic Controls
        </summary>
        <div className="px-4 pt-3 pb-3 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Camera Movement</label>
            <SelectWithChevron
              value={data.cameraMovement}
              onChange={(v) => updateField('cameraMovement', v)}
              options={CAMERA_MOVEMENTS}
              placeholder="Select movement"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Camera Angle</label>
            <SelectWithChevron
              value={data.cameraAngle}
              onChange={(v) => updateField('cameraAngle', v)}
              options={CAMERA_ANGLES}
              placeholder="Select angle"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Lighting</label>
            <SelectWithChevron
              value={data.lighting}
              onChange={(v) => updateField('lighting', v)}
              options={LIGHTING_OPTIONS}
              placeholder="Select lighting"
            />
          </div>
        </div>
      </details>

      <details className="group border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40" open>
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white bg-zinc-900/60">
          Visual Style
        </summary>
        <div className="px-4 pt-3 pb-3 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Style Category</label>
            <SelectWithChevron
              value={styleCategory}
              onChange={(v) => setStyleCategory(v)}
              options={Object.keys(VISUAL_STYLES)}
              placeholder="Select category"
            />
          </div>
          {styleCategory && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Style</label>
              <SelectWithChevron
                value={data.visualStyle}
                onChange={(v) => updateField('visualStyle', v)}
                options={VISUAL_STYLES[styleCategory]}
                placeholder="Select style"
              />
            </div>
          )}
        </div>
      </details>

      <details className="group border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/40" open>
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white bg-zinc-900/60">
          Audio
        </summary>
        <div className="px-4 pt-3 pb-3 space-y-3">
          <div className="space-y-1">
            <label htmlFor="atmosphere" className="text-xs font-medium text-zinc-300">Atmosphere / Soundscape</label>
            <textarea
              id="atmosphere"
              rows={3}
              placeholder="e.g., Birds chirping, gentle breeze, distant laughter"
              value={data.atmosphere}
              onChange={(e) => updateField('atmosphere', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white resize-none"
            />
          </div>
        </div>
      </details>
    </div>
  )
}
