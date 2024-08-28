import { faBox, faUser } from '@fortawesome/free-solid-svg-icons';

export const menuOpciones = [
  {
    index: 0,
    icon: faBox,
    text: 'Inventory',
    subMenu: [
      { link: '/supplies', text: 'Supplies' },
      { link: '/brands', text: 'Brands' },
      { link: '/categories', text: 'Categories' },
      { link: '/suppliers', text: 'Supplier' },
    ],
  },
  {
    index: 2,
    icon: faBox,
    text: 'Order Request',
    subMenu: [
      { link: '/consolidate-request', text: 'Consolidate Request' },
      { link: '/authorize-request', text: 'Authorize Request' },
      { link: '/consolidate-purchase', text: 'Consolidate Purchase' },
    ],
  },
  {
    index: 3,
    icon: faBox,
    text: 'Order Delivery',
    subMenu: [
      { link: '/consolidate-delivery', text: 'Consolidate Delivery' },
      { link: '/create-pallet', text: 'Create Pallet' },
      { link: '/conduct-survey', text: 'Conduct Survey' },
      { link: '/create-delivery-note', text: 'Create Delivery Note' },
    ],
  },
  {
    index: 1,
    icon: faUser,
    text: 'Account',
    subMenu: [
      { link: '/profile', text: 'Profile Settings' },
      { link: '/change-password', text: 'Change Password' },
      { link: '/notifications', text: 'Notifications' },
    ],
  },
];