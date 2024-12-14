import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import SettingsIcon from '@mui/icons-material/Settings';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from "@mui/icons-material/Groups";

const MenuListComp = () => {
	const icons = [
		{
			iconName: <DashboardCustomizeIcon />,
			title: "Ana Sayfa",
			path: "/app/biltek",
		},
		{
			iconName: <PersonIcon />,
			title: "Hasta Kayıt",
			path: "/app/biltek/patients",
		},
		{
			iconName: <ShoppingCartCheckoutIcon />,
			title: "Hizmetler",
			path: "/app/biltek/services",
		},
		{
			iconName: <GroupsIcon />,
			title: "Randevu",
			path: "/app/biltek/reservations",
		},
	];

	const navigate = useNavigate();

	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	const listItemStyle = {
		color: "white",
		"& .MuiSvgIcon-root": { color: "white" },
		"&:hover": {
			backgroundColor: "gray",
			color: "aqua"
		},
		"&:hover .MuiSvgIcon-root": {
			backgroundColor: "gray",
			color: "aqua"
		}
	}

	return (
		<div>
			<List>
				{icons.map((icon, index) => (

					<ListItemButton
						key={index}
						disablePadding
						onClick={() => navigate(icon.path)}
						sx={listItemStyle}
					>
						<ListItemIcon >{icon.iconName}</ListItemIcon>
						<ListItemText primary={icon.title} />
					</ListItemButton>



				))}

				<ListItemButton onClick={handleClick} sx={listItemStyle}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Tanımlar" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{ ...listItemStyle, pl: 4 }}>
							<ListItemIcon>
								<MedicationIcon />
							</ListItemIcon>
							<ListItemText primary="Doktor Tanımları" />
						</ListItemButton>
						<ListItemButton sx={{ ...listItemStyle, pl: 4 }}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="Kullanıcı Tanımları" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</div>
	);
};

export default MenuListComp;
