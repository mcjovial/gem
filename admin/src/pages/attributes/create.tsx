import CreateOrUpdateAttributeForm from "@components/attribute/attribute-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";

export default function CreateAttributePage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:create-new-attribute")}
        </h1>
      </div>
      <CreateOrUpdateAttributeForm />
    </>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});

CreateAttributePage.Layout = Layout;
