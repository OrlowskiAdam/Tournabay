import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import TournamentGuard from "../../../../guards/TournamentGuard";
import Permission from "../../../../components/dashboard/tournament/permissions/permission";
import { useEffect, useState } from "react";
import { permissionsApi } from "../../../../api/permissionsApi";
import { updatePermissions } from "../../../../slices/tournament";
import toast from "react-hot-toast";
import { notifyOnError } from "../../../../utils/error-response";
import { useDispatch } from "../../../../store";

const TournamentAccess = () => {
  const { tournament } = useTournament();
  const [permissions, setPermissions] = useState(tournament.permissions);
  const [currentTab, setCurrentTab] = useState(permissions[0]?.permissionName || "Roles");
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setPermissions(tournament.permissions);
    };
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handlePermissionRoleChange = (event, value, permissionValue) => {
    setPermissions((prevState) => {
      let permission = { ...prevState.find((p) => p.permissionName === permissionValue) };
      permission.permittedRoles = value;
      return [...prevState.filter((p) => p.permissionName !== permissionValue), permission];
    });
  };

  const handlePermissionStaffChange = (event, value, permissionValue) => {
    setPermissions((prevState) => {
      let permission = { ...prevState.find((p) => p.permissionName === permissionValue) };
      permission.permittedStaffMembers = value;
      return [...prevState.filter((p) => p.permissionName !== permissionValue), permission];
    });
  };

  const handleSavePermissions = () => {
    setIsRequestLoading(true);
    const toastLoadingId = toast.loading("Updating permissions");
    const body = {
      permissionDtos: permissions.map((permission) => {
        return {
          id: permission.id,
          permittedRolesId: permission.permittedRoles?.map((role) => role.id) || [],
          permittedStaffMembersId: permission.permittedStaffMembers?.map((staff) => staff.id) || [],
        };
      }),
    };
    permissionsApi
      .updatePermissions(tournament.id, body)
      .then((response) => {
        dispatch(updatePermissions(response.data));
        toast.success(`Permissions updated!`);
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setIsRequestLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  return (
    <>
      <Head>
        <title>Permissions | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 4,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h1>Permissions</h1>
            <Button variant="contained" onClick={handleSavePermissions} disabled={isRequestLoading}>
              Save permissions
            </Button>
          </Box>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {permissions.map((permission) => (
              <Tab
                key={permission.id}
                label={permission.permissionName}
                value={permission.permissionName}
              />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          <Permission
            permission={permissions.find((p) => p.permissionName === currentTab)}
            permissionValue={currentTab}
            onRolePermissionChange={handlePermissionRoleChange}
            onStaffPermissionChange={handlePermissionStaffChange}
          />
          <Alert severity="warning">
            <AlertTitle>IMPORTANT</AlertTitle>
            <p>
              Even if certain roles or staff members do not have access to a certain page,{" "}
              <strong>they still can access or modify them!</strong>
            </p>
            <p>
              If you don&apos;t want to let them access the page, you should remove these roles and
              staff members from the permission.
            </p>
            <p>
              If there&apos;s only a permission with &quot;page access&quot; permissions, then you
              can be sure they cannot access nor modify any records regarding that page.
            </p>
          </Alert>
        </Container>
      </Box>
    </>
  );
};

TournamentAccess.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentAccess;
