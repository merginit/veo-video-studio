import React, { useState } from 'react'
import { Button } from '../Button'
import { Check, Copy } from 'lucide-react'
import { generatePrompt, type PromptData } from '../../lib/prompt-generator'

type OutputFormat = 'markdown' | 'toon' | 'json'

interface PromptPreviewProps {
  data: PromptData
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({ data }) => {
  const [format, setFormat] = useState<OutputFormat>('markdown')
  const [copied, setCopied] = useState(false)

  const output = generatePrompt(data, format)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { }
  }

  const hasContent = Boolean(
    data.subject ||
    data.action ||
    data.location ||
    data.cameraMovement ||
    data.cameraAngle ||
    data.lighting ||
    data.visualStyle ||
    data.atmosphere
  )

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="text-sm font-semibold text-white">Generated Prompt</div>
        <div className="flex items-center gap-1">
          {(['markdown', 'toon', 'json'] as OutputFormat[]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setFormat(val)}
              className={`px-2 py-1 text-xs rounded ${format === val
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
            >
              {val.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm overflow-x-auto min-h-[200px] whitespace-pre-wrap font-mono text-white">
            {hasContent ? output : 'Fill in the form to generate a prompt...'}
          </pre>
          {hasContent && (
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                className="px-2 py-1 text-[10px] h-7 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 whitespace-nowrap"
                onClick={handleCopy}
                icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
