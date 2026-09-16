"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { postApiV10Footer } from "@/api/endpoints/footer";
import type { FooterMutate } from "@/api/models/footerMutate";
import { useFooterForm } from "../_hooks/use-footer-form";
import { FooterEditor } from "../_components/footer-editor";

export default function CreateFooterPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    formData,
    setFormData,
    addColumn,
    removeColumn,
    updateColumnTitle,
    addRow,
    removeRow,
    addElement,
    removeElement,
    updateElement,
    moveColumn,
    moveRow,
    moveElement,
    getSubmitData,
  } = useFooterForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await postApiV10Footer(getSubmitData() as FooterMutate);
      toast.success("Đã tạo footer mới");
      router.push("/admin/footer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tạo footer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold">Tạo Footer Mới</h1>
            <p className="mt-1 text-sm text-slate-500">
              Footer theo cấu trúc: Cột → Hàng → Phần tử (text/image). Dùng nút mũi tên để đổi thứ
              tự.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/footer")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FooterEditor
          columns={formData.columns}
          language={formData.language}
          is_active={formData.is_active}
          onLanguageChange={(lang) => setFormData({ ...formData, language: lang })}
          onActiveChange={(v) => setFormData({ ...formData, is_active: v })}
          onAddColumn={addColumn}
          onRemoveColumn={removeColumn}
          onMoveColumn={moveColumn}
          onUpdateColumnTitle={updateColumnTitle}
          onAddRow={addRow}
          onRemoveRow={removeRow}
          onMoveRow={moveRow}
          onAddElement={addElement}
          onRemoveElement={removeElement}
          onMoveElement={moveElement}
          onUpdateElement={updateElement}
        />

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/footer")}>
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Tạo footer
          </Button>
        </div>
      </form>
    </div>
  );
}
