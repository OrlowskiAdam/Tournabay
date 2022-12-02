import useTournament from "../hooks/useTournament";
import useOsuAuth from "../hooks/useOsuAuth";
import PropTypes from "prop-types";
import Forbidden from "../pages/403";

const PermissionGuard = (props) => {
  const { tournament } = useTournament();
  const { user } = useOsuAuth();
  const { children, permissionName } = props;

  if (tournament.owner.id === user.id) return children;

  const staffMember =
    user && tournament.staffMembers.find((staffMember) => staffMember.user.id === user.id);

  if (!staffMember) return <Forbidden />;

  const staffMemberRoles = staffMember.tournamentRoles;

  const permission = tournament.permissions.find(
    (permission) => permission.permissionName === permissionName
  );

  if (!permission) return <Forbidden />;

  if (
    permission.permittedRoles.some((role) =>
      staffMemberRoles.some((staffMemberRole) => staffMemberRole.id === role.id)
    )
  )
    return children;

  if (permission.permittedStaffMembers.some((s) => s.id === staffMember.id)) return children;

  return <Forbidden />;
};

PermissionGuard.propTypes = {
  children: PropTypes.node.isRequired,
  permissionName: PropTypes.string.isRequired,
};

export default PermissionGuard;
