import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { logOut } from "../api/auth";
import { useGenericMutation } from "../query/useGenericMutation";
import { toast } from "react-toastify";

interface Prpos {
  onClose: () => void;
}
const UserArea = ({ onClose }: Prpos) => {
  const { mutateAsync: logoutMutation } = useGenericMutation({
    mutationFn: logOut,
    mutationKey: ["me"],
  });
  const logOutClick = async () => {
    const res = await logoutMutation({});
    if (res.status >= 200 && res.status <= 300) {
      toast.success(`Logout is successfuly`);
    } else {
      toast.error(`Loggout is faild`);
    }
    onClose();
  };

  return (
    <UserAreaStyle>
      <ButtonStyle onClick={logOutClick}>log out</ButtonStyle>
    </UserAreaStyle>
  );
};

export default UserArea;

const UserAreaStyle = styled.div`
  height: 10rem;
  width: 10rem;
`;

const ButtonStyle = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  color: `${theme.palette.primary.main}`,
}));
