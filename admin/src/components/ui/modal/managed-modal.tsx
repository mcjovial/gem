import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "./modal.context";
const TagDeleteView = dynamic(() => import("@components/tag/tag-delete-view"));
const TaxDeleteView = dynamic(() => import("@components/tax/tax-delete-view"));
const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));
const ShippingDeleteView = dynamic(
  () => import("@components/shipping/shipping-delete-view")
);
const CategoryDeleteView = dynamic(
  () => import("@components/category/category-delete-view")
);
const CouponDeleteView = dynamic(
  () => import("@components/coupon/coupon-delete-view")
);

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const AttributeDeleteView = dynamic(
  () => import("@components/attribute/attribute-delete-view")
);

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "DELETE_PRODUCT" && <ProductDeleteView />}
      {view === "DELETE_ATTRIBUTE" && <AttributeDeleteView />}
      {view === "DELETE_CATEGORY" && <CategoryDeleteView />}
      {view === "DELETE_COUPON" && <CouponDeleteView />}
      {view === "DELETE_TAX" && <TaxDeleteView />}
      {view === "DELETE_SHIPPING" && <ShippingDeleteView />}
      {view === "DELETE_TAG" && <TagDeleteView />}
      {view === "BAN_CUSTOMER" && <BanCustomerView />}
    </Modal>
  );
};

export default ManagedModal;
