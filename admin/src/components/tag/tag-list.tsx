import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { getIcon } from "@utils/get-icon";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";

export type IProps = {
  tags: any | undefined | null;
  onPagination: (key: number) => void;
};

const TagList = ({ tags }: IProps) => {
  const { t } = useTranslation();
  const { data } = tags! ?? {};
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
      align: "center",
      width: 80,
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: t("table:table-item-icon"),
      dataIndex: "icon",
      key: "icon",
      align: "center",
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({
              iconList: categoriesIcon,
              iconName: icon,
              className: "w-5 h-5 max-h-full max-w-full",
            })}
          </span>
        );
      },
    },
    {
      title: t("table:table-item-slug"),
      dataIndex: "slug",
      key: "slug",
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "_id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.TAGS}/${id}/edit`}
          deleteModalView="DELETE_TAG"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          //@ts-ignore
          data={data}
          rowKey="_id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>
    </>
  );
};

export default TagList;
