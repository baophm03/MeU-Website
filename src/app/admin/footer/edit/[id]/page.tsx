"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getApiV10FooterId, putApiV10FooterId } from "@/api/endpoints/footer";
import type { Footer } from "@/api/models/footer";
import type { FooterMutate } from "@/api/models/footerMutate";
import { useFooterForm } from "../../_hooks/use-footer-form";
import { FooterEditor } from "../../_components/footer-editor";

export default function EditFooterPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [footer, setFooter] = useState<Footer | null>(null);

  const {
    formData,
    setFormData,
    loadFromApi,
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

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await getApiV10FooterId(id);
        const data = (response as { responseData?: Footer }).responseData;
        if (!data) throw new Error("Không tìm thấy footer");
        setFooter(data);
        loadFromApi(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không thể tải footer");
      } finally {
        setLoading(false);
      }
    };

    if (id) void fetchFooter();
  }, [id, loadFromApi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await putApiV10FooterId(id, getSubmitData() as FooterMutate);
      toast.success("Đã cập nhật footer");
      router.push("/admin/footer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật footer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  if (!footer) {
    return (
      <Card>
        <div className="p-8 text-center text-slate-500">
          Không tìm thấy footer hoặc đã xảy ra lỗi.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold">Chỉnh sửa Footer</h1>
            <p className="mt-1 text-sm text-slate-500">
              Ngôn ngữ: <span className="font-semibold uppercase">{footer.language}</span> · Tạo lúc{" "}
              {footer.created_at ? new Date(footer.created_at).toLocaleString("vi-VN") : "—"}
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
              <Save className="mr-2 h-4 w-4" />
            )}
            Cập nhật footer
          </Button>
        </div>
      </form>
    </div>
  );
}
