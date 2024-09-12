import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const MenuListComp = () => {
	const icons = [
		{
			iconName: <DashboardCustomizeIcon />,
			title: "Ana Sayfa",
			path: "/app/biltek",
		},
		{
			iconName: <PersonIcon />,
			title: "Müşteriler",
			path: "/app/biltek/clients",
		},
		{
			iconName: <ShoppingCartCheckoutIcon />,
			title: "Ürün ve Hizmetler",
			path: "/app/biltek/products",
		},
		{
			iconName: <GroupsIcon />,
			title: "Randevu",
			path: "/app/biltek/reservations",
		},

	];

	const navigate = useNavigate();

	return (
		<div>
			<List>
				{icons.map((icon, index) => (
					<ListItem
						key={index}
						disablePadding
						onClick={() => navigate(icon.path)}
                  sx={{
                     color:"white",
                     "& .MuiSvgIcon-root": {color:"white"},
                     "&:hover": {
                        backgroundColor: "gray",
                        color:"aqua"
                      },
							 "&:hover .MuiSvgIcon-root": {
                        backgroundColor: "gray",
                        color:"aqua"
                      }
                  }}
					>
						<ListItemButton>
							<ListItemIcon>{icon.iconName}</ListItemIcon>
							<ListItemText primary={icon.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default MenuListComp;
