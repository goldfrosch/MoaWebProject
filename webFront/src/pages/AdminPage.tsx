import { useEffect } from "react";

import { Route, Switch } from "react-router";

import { useSelector } from "react-redux";
import { IRootState } from "modules";

import AdminTemplate from "components/base/AdminTemplate";

import history from "utils/HistoryUtils";

import AdminHome from "components/main/admin/home/Home";

interface IAdminPageProps {}
const AdminPage: React.FC<IAdminPageProps> = () => {
  const profile = useSelector((state: IRootState) => state.auth.profile);

  useEffect(() => {
    if (profile.rank < 5) {
      history.push("/forbidden");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminTemplate>
      <Switch>
        <Route exact path="/" component={AdminHome} />
      </Switch>
    </AdminTemplate>
  );
};

export default AdminPage;
