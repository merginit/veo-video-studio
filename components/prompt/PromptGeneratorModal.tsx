import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { PromptForm } from './PromptForm'
import { PromptPreview } from './PromptPreview'
import { generatePrompt, type PromptData } from '../../lib/prompt-generator'

interface PromptGeneratorModalProps {
  open: boolean
  onClose: () => void
  onInsert: (text: string) => void
}

const emptyData: PromptData = {
  subject: '',
  action: '',
  location: '',
  cameraMovement: '',
  cameraAngle: '',
  lighting: '',
  atmosphere: '',
  visualStyle: '',
}

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({ open, onClose, onInsert }) => {
  const [data, setData] = useState<PromptData>(emptyData)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && closeBtnRef.current) closeBtnRef.current.focus()
  }, [open])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) onClose()
  }

  const generated = useMemo(() => generatePrompt(data, 'markdown'), [data])

  const handleInsert = () => {
    onInsert(generated)
    onClose()
  }

  if (!open) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onMouseDown={handleBackdropClick}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl w-full max-w-6xl mx-4 my-6 max-h-[85vh] flex flex-col overflow-hidden" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-300">Prompt Generator</h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onClose} ref={closeBtnRef}>Close</Button>
            <Button onClick={handleInsert}>Insert into Prompt</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-y-auto flex-1 min-h-0">
          <div className="md:pr-2">
            <PromptForm data={data} onChange={setData} />
          </div>
          <div className="md:pl-2 md:sticky md:top-0 md:self-start">
            <PromptPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
