import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ImgDropzoneDialog from './ImgUploadDialog';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
        <Link to="/dashboard" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add expense" />
      <ImgDropzoneDialog></ImgDropzoneDialog>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Insights" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved Expenses</ListSubheader>
        <Link
            to="/expenses"
            style={{ 'text-decoration': 'none', color: 'white' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current year" />
        </ListItem>
        <Link to="/allexpenses" style={{'text-decoration': 'none', 'color': 'white'}}>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="All time" />
        </ListItem>
        <Link to="/logout" style={{'text-decoration': 'none', color: 'white'}}>
          <ListItem button>
              <ListItemIcon>
                  <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
          </ListItem>
        </Link>
    </div>
);
