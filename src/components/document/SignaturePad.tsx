import { useEffect, useRef, useState } from "react";
import { Eraser, RotateCcw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Point = { x: number; y: number };

export function SignaturePad({
  onSave,
  onCancel,
}: {
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const drawing = useRef(false);
  const current = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    redraw(strokes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redraw(all: Point[][]) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const ratio = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";
    for (const stroke of all) {
      if (stroke.length < 2) continue;
      const first = stroke[0]!;
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);
      for (const p of stroke.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>): Point {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        className="h-44 w-full touch-none rounded-xl border border-dashed border-border bg-card"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = true;
          current.current = [pos(e)];
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          current.current = [...current.current, pos(e)];
          redraw([...strokes, current.current]);
        }}
        onPointerUp={() => {
          if (!drawing.current) return;
          drawing.current = false;
          if (current.current.length > 1) setStrokes((s) => [...s, current.current]);
          current.current = [];
        }}
      />
      <p className="text-xs text-muted-foreground">
        Sign with your mouse, trackpad, finger or stylus. This is a visual electronic signature, not
        a certified digital signature.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const next = strokes.slice(0, -1);
            setStrokes(next);
            redraw(next);
          }}
        >
          <RotateCcw /> Undo
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setStrokes([]);
            redraw([]);
          }}
        >
          <Eraser /> Clear
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={strokes.length === 0}
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            onSave(canvas.toDataURL("image/png"));
          }}
        >
          <Check /> Save signature
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X /> Cancel
        </Button>
      </div>
    </div>
  );
}
