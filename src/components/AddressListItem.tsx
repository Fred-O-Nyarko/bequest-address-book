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
    const {postCode, lineOne, lineTwo, lineThree, country, town} = address || {};
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
        primary={lineOne}
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
            {" — ${}"}
          </>
        }
      />
    </ListItem>
  );
};

export default AddressListItem;
