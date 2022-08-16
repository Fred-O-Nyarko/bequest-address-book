import { Delete } from "@mui/icons-material";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { IAddress } from "../shared/types";

interface IAddressListItemProps {
    address: IAddress;
    onDelete: (address: IAddress) => void;
}
const AddressListItem = ({ onDelete, address }: IAddressListItemProps) => {
    const {postCode} = address || {};
  return (
    <ListItem
      alignItems="flex-start"
      divider
      style={{
        backgroundColor: "#f6f5ea",
        borderRadius: "0.2rem"
      }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(address)}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>{postCode.slice(-2)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Brunch this weekend?"
        primaryTypographyProps={{
            fontWeight: 600,
        }}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
              fontWeight={600}
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </>
        }
      />
    </ListItem>
  );
};

export default AddressListItem;
