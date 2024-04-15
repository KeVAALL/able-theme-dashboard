// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart } from 'iconsax-react';

// icons
const icons = {
  widgets: Story,
  data: Fatrows
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //
// const field = {
//   "menu_id": 1,
//   "application_id": 1,
//   "menu_name": "Dash Board",
//   "menu_level": 0,
//   "parent_menu_id": 0,
//   menu_icon: "ZGFzaGJvYXJkSWNvbg==",
//   menu_url: "dash_board",
//   display_order_no: 1,
//   is_active: 1,
//   is_deleted: 0,
//   child_menu: null
// },

const form = {
  id: 'group-form',
  title: <FormattedMessage id="form" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'form',
      title: <FormattedMessage id="Form" />,
      type: 'item',
      url: '/form/basic',
      icon: icons.data
    }
  ]
};

export default form;
