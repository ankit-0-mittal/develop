import { useState, useEffect } from 'react';
import { ProductForm, ProductList } from 'app/components/organisms';
import { ComponentFilterHeader } from 'app/components/molecules';
import { useSelector } from 'react-redux';
import { checkCreatePermission, checkUpdatePermission } from 'utils/constants';

export function Products() {
  const [visible, setVisible] = useState(false);
  const onShow = show => setVisible(show);
  const onSearch = () => {};
  const [permissions, setPermissions] = useState<Array<string>>([]);

  const data = useSelector((state: any) => {
    return state;
  });

  const onSuccess = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (data.productReducer.permissions)
      setPermissions(data.productReducer.permissions);
  }, [data.productReducer.permissions]);

  return (
    <div>
      <ComponentFilterHeader
        search={true}
        permissions={permissions}
        onSearch={onSearch}
        title="Products"
        subtitle="Checkout all the products created"
        btnTitle="+ Create Product"
        onBtnClicked={() => onShow(true)}
      />
      <ProductList />
      {checkCreatePermission(permissions) &&
        checkUpdatePermission(permissions) && (
          <ProductForm
            onSuccess={onSuccess}
            visible={visible}
            onShow={onShow}
          />
        )}
    </div>
  );
}
