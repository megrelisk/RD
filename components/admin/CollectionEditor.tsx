"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2, Plus, Trash2, Edit, GripVertical } from "lucide-react";
import { toast } from "sonner";

import { db } from "@/lib/firebase/client";
import { createDoc, deleteDocById, updateDocById } from "@/lib/firebase/collections";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "email" | "select" | "image" | "video" | "checkbox";
  required?: boolean;
  options?: string[];
  step?: number;
  helper?: string;
};

type Props<T extends Record<string, unknown>> = {
  collectionName: string;
  fields: FieldDef[];
  title: string;
  description?: string;
  renderRow?: (item: T & { id: string }) => React.ReactNode;
  initial?: Partial<T>;
  orderField?: string;
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MediaUploader } from "./MediaUploader";

export function CollectionEditor<T extends Record<string, unknown>>({
  collectionName,
  fields,
  title,
  description,
  renderRow,
  initial,
  orderField = "order",
}: Props<T>) {
  const [items, setItems] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(T & { id?: string }) | null>(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const ref = collection(db(), collectionName);
      const snap = await getDocs(query(ref, orderBy(orderField, "asc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) })));
    } catch (err) {
      console.error(err);
      toast.error("FAILED TO LOAD COLLECTION");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  const startCreate = () => {
    const blank: Record<string, unknown> = { ...(initial ?? {}) };
    for (const f of fields) {
      if (!(f.name in blank)) {
        blank[f.name] =
          f.type === "number" ? 0 :
          f.type === "checkbox" ? false :
          "";
      }
    }
    if (!(orderField in blank)) blank[orderField] = items.length;
    setEditing(blank as T);
    setOpen(true);
  };

  const startEdit = (item: T & { id: string }) => {
    setEditing({ ...item });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    try {
      const { id, ...rest } = editing as Record<string, unknown> & { id?: string };
      if (id) {
        await updateDocById(collectionName, id, rest as Partial<T>);
        toast.success("UPDATED");
      } else {
        await createDoc(collectionName, rest as T);
        toast.success("CREATED");
      }
      setOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(`SAVE FAILED — ${err instanceof Error ? err.message : "TRY AGAIN"}`);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("DELETE THIS ITEM? THIS CANNOT BE UNDONE.")) return;
    try {
      await deleteDocById(collectionName, id);
      toast.success("DELETED");
      load();
    } catch (err) {
      toast.error(`DELETE FAILED — ${err instanceof Error ? err.message : "TRY AGAIN"}`);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">{title}</h1>
          {description && (
            <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
              » {description}
            </p>
          )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={startCreate}
              className="rounded-none font-display tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              NEW ITEM
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none max-h-[90vh] overflow-y-auto bg-black border-[#dc143c]/40 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl tracking-wider text-white">
                {editing && "id" in (editing ?? {}) ? "EDIT ITEM" : "CREATE ITEM"}
              </DialogTitle>
            </DialogHeader>
            {editing && (
              <div className="space-y-5">
                {fields.map((f) => (
                  <div key={f.name} className="space-y-2">
                    <Label className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                      {f.label}{f.required && " *"}
                    </Label>
                    <FieldInput
                      field={f}
                      value={(editing as Record<string, unknown>)[f.name]}
                      onChange={(v) => setEditing({ ...(editing as Record<string, unknown>), [f.name]: v } as T)}
                    />
                    {f.helper && (
                      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        {f.helper}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-none"
              >
                CANCEL
              </Button>
              <Button
                onClick={save}
                className="rounded-none bg-[#dc143c] hover:bg-[#ff1744]"
              >
                SAVE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/20 p-12 text-center">
          <p className="font-mono text-sm uppercase tracking-wider text-white/60">
            NO ITEMS YET. ADD ONE TO GET STARTED.
          </p>
        </div>
      ) : (
        <ul className="border border-white/10 divide-y divide-white/10">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-4 hover:bg-[#dc143c]/5 transition-colors"
            >
              <GripVertical className="w-4 h-4 text-white/20" />
              <div className="flex-1 min-w-0">
                {renderRow ? renderRow(item) : <DefaultRow item={item} fields={fields} />}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(item)}
                  className="rounded-none border-white/20 hover:border-[#dc143c]"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(item.id)}
                  className="rounded-none border-white/20 hover:border-[#dc143c] hover:text-[#dc143c]"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-black border-white/20 rounded-none font-mono min-h-[100px]"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          step={field.step ?? 1}
          value={(value as number) ?? 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="bg-black border-white/20 rounded-none font-mono"
        />
      );
    case "select":
      return (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 bg-black border border-white/20 font-mono text-sm text-white px-3 focus:border-[#dc143c] focus:outline-none appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-black">SELECT</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt} className="bg-black uppercase">
              {opt}
            </option>
          ))}
        </select>
      );
    case "image":
      return (
        <MediaUploader
          value={value as string | undefined}
          onChange={onChange}
          folder={`uploads/${field.name}`}
          accept="image/*"
          label={field.label}
        />
      );
    case "video":
      return (
        <MediaUploader
          value={value as string | undefined}
          onChange={onChange}
          folder={`uploads/${field.name}`}
          accept="video/*"
          label={field.label}
        />
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={onChange}
            className="rounded-none border-white/40 data-[state=checked]:bg-[#dc143c]"
          />
          <span className="font-mono text-sm text-white/60 uppercase tracking-wider">ENABLED</span>
        </div>
      );
    default:
      return (
        <Input
          type={field.type === "url" || field.type === "email" ? field.type : "text"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-black border-white/20 rounded-none font-mono"
        />
      );
  }
}

function DefaultRow({
  item,
  fields,
}: {
  item: Record<string, unknown>;
  fields: FieldDef[];
}) {
  const primary = fields[0];
  const secondary = fields[1];
  const primaryValue = String(item[primary?.name] ?? "");
  const secondaryValue = secondary ? String(item[secondary?.name] ?? "") : "";
  return (
    <div>
      <div className="font-display text-lg text-white tracking-wider">
        {primaryValue}
      </div>
      {secondaryValue && (
        <div className="font-mono text-xs text-white/60 uppercase tracking-wider truncate">
          {secondaryValue}
        </div>
      )}
    </div>
  );
}
