import { Delete } from "@mui/icons-material";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { IAddress } from "src/shared";

interface IAddressListItemProps {
  address: IAddress;
  onDelete: (id: string) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const AddressListItem = ({
  onDelete,
  address,
  onClick,
}: IAddressListItemProps) => {
  const { postCode, lineOne, country, town, id } = address || {};
  return (
    <ListItem
      alignItems="flex-start"
      divider
      style={{
        backgroundColor: "#f6f5ea",
        borderRadius: "0.2rem",
      }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(id)}
          id={`delete-btn-${postCode.split(" ").join("")}`}
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton role={undefined} onClick={onClick} dense>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {postCode.slice(0, 2)}
          </Avatar>
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
              >
                {town}, {country}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AddressListItem;
